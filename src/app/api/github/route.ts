import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "octocat";
  const token = process.env.GITHUB_TOKEN;

  // Generate 104 weeks of mock data with dates
  const today = new Date();
  const startDate = new Date(today.getTime() - 104 * 7 * 24 * 60 * 60 * 1000);
  const mockHeatmap = Array.from({ length: 104 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const currentDate = new Date(startDate.getTime() + (w * 7 + d) * 24 * 60 * 60 * 1000);
      return {
        level: Math.floor(Math.random() * 5),
        date: currentDate.toISOString().split("T")[0]
      };
    })
  );

  // Fallback Mock Data
  const mockData = {
    username,
    followers: 124,
    publicRepos: 42,
    totalStars: 184,
    contributionsThisYear: 1420,
    recentCommits: [
      { repo: "nexus-pipeline", message: "optimize batch compression ratio", date: "2h ago" },
      { repo: "aura-ledger", message: "implement webassembly boundary check", date: "1d ago" },
      { repo: "infrascale", message: "release beta tag v1.2.0-rc", date: "3d ago" }
    ],
    heatmap: mockHeatmap
  };

  if (!token) {
    return NextResponse.json(mockData, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App"
    };

    // Prepare requests in parallel
    const userPromise = fetch(token ? "https://api.github.com/user" : `https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } });
    const reposPromise = fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers, next: { revalidate: 3600 } });
    const eventsPromise = fetch(`https://api.github.com/users/${username}/events`, { headers, next: { revalidate: 60 } });

    // GraphQL request for contribution calendar
    const graphqlQuery = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;
    const graphqlPromise = fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Portfolio-App"
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { login: username }
      }),
      next: { revalidate: 3600 }
    });

    const [userRes, reposRes, eventsRes, graphqlRes] = await Promise.all([
      userPromise,
      reposPromise,
      eventsPromise,
      graphqlPromise
    ]);

    // 1. Parse main profile stats
    if (!userRes.ok) throw new Error("Failed to fetch GitHub profile");
    const userData = await userRes.json();

    // 2. Parse repos for star calculation
    let totalStars = 0;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
      }
    }

    // 3. Parse recent push events
    const recentCommits: Array<{ repo: string; message: string; date: string }> = [];
    if (eventsRes.ok) {
      const events = await eventsRes.json();
      if (Array.isArray(events)) {
        const pushEvents = events.filter(e => e.type === "PushEvent");
        for (const event of pushEvents) {
          if (recentCommits.length >= 3) break;
          const repoName = event.repo.name.split("/")[1] || event.repo.name;
          const commits = event.payload.commits || [];
          for (const commit of commits) {
            if (recentCommits.length >= 3) break;
            recentCommits.push({
              repo: repoName,
              message: commit.message.split("\n")[0],
              date: getRelativeTime(event.created_at)
            });
          }
        }
      }
    }

    // 4. Parse GraphQL response for contribution calendar
    let contributionsThisYear = mockData.contributionsThisYear;
    let heatmap = mockData.heatmap;

    if (graphqlRes.ok) {
      const gqlJson = await graphqlRes.json();
      const calendar = gqlJson.data?.user?.contributionsCollection?.contributionCalendar;
      if (calendar && Array.isArray(calendar.weeks)) {
        contributionsThisYear = calendar.totalContributions;
        heatmap = calendar.weeks.map((week: { contributionDays?: { date: string; contributionLevel: string }[] }) => {
          const days = week.contributionDays || [];
          return Array.from({ length: 7 }, (_, i) => {
            const day = days[i];
            if (!day) return { level: 0, date: "" };
            let level = 0;
            switch (day.contributionLevel) {
              case "FIRST_QUARTILE": level = 1; break;
              case "SECOND_QUARTILE": level = 2; break;
              case "THIRD_QUARTILE": level = 3; break;
              case "FOURTH_QUARTILE": level = 4; break;
              default: level = 0;
            }
            return { level, date: day.date };
          });
        });
      }
    }

    return NextResponse.json({
      username,
      followers: userData.followers || 0,
      publicRepos: (userData.public_repos || 0) + (userData.total_private_repos || 0),
      totalStars,
      contributionsThisYear,
      recentCommits: recentCommits.length > 0 ? recentCommits : mockData.recentCommits,
      heatmap
    }, { headers: { "Cache-Control": "no-store" } });

  } catch (error) {
    console.error("Error fetching live GitHub details:", error);
    return NextResponse.json(mockData, { headers: { "Cache-Control": "no-store" } });
  }
}
