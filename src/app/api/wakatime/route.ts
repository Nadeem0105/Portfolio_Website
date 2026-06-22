import { NextResponse } from "next/server";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
};

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    // Return mock WakaTime statistics in development
    return NextResponse.json({
      totalHours: 1240,
      dailyAverage: "5h 12m",
      languages: [
        { name: "TypeScript", percentage: 42.5, color: "#3178c6" },
        { name: "Go", percentage: 28.3, color: "#00add8" },
        { name: "Rust", percentage: 14.2, color: "#dea584" },
        { name: "C++", percentage: 8.5, color: "#f34b7d" },
        { name: "Others", percentage: 6.5, color: "#8b949e" }
      ],
      categories: [
        { name: "Coding", percentage: 92 },
        { name: "Debugging", percentage: 5 },
        { name: "Code Review", percentage: 3 }
      ]
    });
  }

  try {
    const authHeader = `Basic ${Buffer.from(apiKey).toString("base64")}`;

    // Get date range (last 7 days including today)
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const startStr = formatDate(start);
    const endStr = formatDate(end);

    const res = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${startStr}&end=${endStr}`,
      {
        headers: {
          Authorization: authHeader,
        },
        next: { revalidate: 900 }, // Cache summaries for 15 minutes to stay real-time
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("WakaTime API error response:", errorText);
      throw new Error(`WakaTime API returned status ${res.status}`);
    }

    const json = await res.json();
    const data = json.data || [];

    // Aggregators
    const langMap: Record<string, number> = {};
    const catMap: Record<string, number> = {};
    let totalLangSeconds = 0;
    let totalCatSeconds = 0;

    interface WakaTimeSummaryItem {
      languages?: Array<{ name: string; total_seconds: number }>;
      categories?: Array<{ name: string; total_seconds: number }>;
    }

    data.forEach((day: WakaTimeSummaryItem) => {
      // Languages
      (day.languages || []).forEach((lang) => {
        langMap[lang.name] = (langMap[lang.name] || 0) + lang.total_seconds;
        totalLangSeconds += lang.total_seconds;
      });

      // Categories
      (day.categories || []).forEach((cat) => {
        catMap[cat.name] = (catMap[cat.name] || 0) + cat.total_seconds;
        totalCatSeconds += cat.total_seconds;
      });
    });

    // Map languages to UI-friendly structure
    const languages = Object.entries(langMap)
      .map(([name, seconds]) => ({
        name,
        total_seconds: seconds,
        percentage: totalLangSeconds > 0 ? Math.round((seconds / totalLangSeconds) * 1000) / 10 : 0,
        color: languageColors[name] || "#8b949e",
      }))
      .sort((a, b) => b.total_seconds - a.total_seconds)
      .slice(0, 5);

    // Add "Others" slice if there are more than 5 languages
    const top5Percent = languages.reduce((acc: number, curr: { percentage: number }) => acc + curr.percentage, 0);
    const allLangs = Object.entries(langMap);
    if (allLangs.length > 5 && top5Percent < 98) {
      languages.push({
        name: "Others",
        total_seconds: 0,
        percentage: Math.round((100 - top5Percent) * 10) / 10,
        color: "#8b949e",
      });
    }

    // Map categories
    const categories = Object.entries(catMap)
      .map(([name, seconds]) => ({
        name,
        percentage: totalCatSeconds > 0 ? Math.round((seconds / totalCatSeconds) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    const cumulative = json.cumulative_total || {};
    const dailyAverage = json.daily_average || {};

    const totalHours = cumulative.decimal ? parseFloat(cumulative.decimal) : 0;
    const dailyAverageText = dailyAverage.text_including_other_language || dailyAverage.text || "0h 0m";
    const humanReadableTotal = cumulative.text || "0 mins";

    return NextResponse.json({
      totalHours,
      dailyAverage: dailyAverageText,
      humanReadableTotal,
      languages,
      categories,
    });
  } catch (error: unknown) {
    console.error("Error fetching WakaTime stats:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch WakaTime stats";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
