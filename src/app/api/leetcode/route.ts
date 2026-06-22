import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getRelativeTime(timestampSec: string): string {
  const date = new Date(parseInt(timestampSec) * 1000);
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
  const username = process.env.LEETCODE_USERNAME || "algo_expert";

  // Fallback Mock Data
  const mockData = {
    username,
    ranking: 15402,
    rating: 2185,
    solved: {
      total: 843,
      easy: 245,
      medium: 450,
      hard: 148,
      allTotal: 3300
    },
    recentSubmissions: [
      { title: "Edit Distance", status: "Accepted", lang: "Rust", time: "4 hours ago" },
      { title: "Sliding Window Maximum", status: "Accepted", lang: "C++", time: "1 day ago" },
      { title: "Binary Tree Maximum Path Sum", status: "Accepted", lang: "Go", time: "2 days ago" }
    ]
  };

  try {
    const query = `
      query userFullStats($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
        }
        recentSubmissionList(username: $username, limit: 5) {
          title
          status
          lang
          timestamp
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Portfolio-App"
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error("Failed to fetch LeetCode data");
    const json = await res.json();
    
    if (json.errors || !json.data?.matchedUser) {
      console.warn("LeetCode GraphQL errors or user not found:", json.errors);
      return NextResponse.json(mockData, { headers: { "Cache-Control": "no-store" } });
    }

    const { matchedUser, allQuestionsCount, userContestRanking, recentSubmissionList } = json.data;

    // Solved counts
    const solvedStats = matchedUser.submitStats?.acSubmissionNum || [];
    const getSolvedCount = (diff: string) => solvedStats.find((s: { difficulty: string; count: number }) => s.difficulty === diff)?.count || 0;
    
    // Total questions counts
    const getQuestionsCount = (diff: string) => allQuestionsCount?.find((q: { difficulty: string; count: number }) => q.difficulty === diff)?.count || 0;

    // Formatting recent submissions
    const recentSubmissions = (recentSubmissionList || []).map((sub: { title: string; status: number; lang: string; timestamp: string }) => ({
      title: sub.title,
      status: sub.status === 10 ? "Accepted" : "Failed",
      lang: sub.lang.charAt(0).toUpperCase() + sub.lang.slice(1),
      time: getRelativeTime(sub.timestamp)
    }));

    return NextResponse.json({
      username,
      ranking: matchedUser.profile?.ranking || 0,
      rating: Math.floor(userContestRanking?.rating || 0),
      solved: {
        total: getSolvedCount("All"),
        easy: getSolvedCount("Easy"),
        medium: getSolvedCount("Medium"),
        hard: getSolvedCount("Hard"),
        allTotal: getQuestionsCount("All")
      },
      recentSubmissions: recentSubmissions.length > 0 ? recentSubmissions : mockData.recentSubmissions
    }, { headers: { "Cache-Control": "no-store" } });

  } catch (error) {
    console.error("Error fetching live LeetCode details:", error);
    return NextResponse.json(mockData, { headers: { "Cache-Control": "no-store" } });
  }
}
