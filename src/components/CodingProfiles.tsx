"use client";

import { useEffect, useState, useRef } from "react";
import { FaGithub, FaCode, FaClock } from "react-icons/fa";

interface GitHubData {
  username: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  contributionsThisYear: number;
  recentCommits: Array<{ repo: string; message: string; date: string }>;
  heatmap: Array<Array<{ level: number; date: string }>>;
}

interface LeetCodeData {
  username: string;
  ranking: number;
  rating: number;
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
    allTotal: number;
  };
  recentSubmissions: Array<{ title: string; status: string; lang: string; time: string }>;
}

interface WakaTimeData {
  totalHours: number;
  dailyAverage: string;
  humanReadableTotal?: string;
  languages: Array<{ name: string; percentage: number; color: string }>;
  categories: Array<{ name: string; percentage: number }>;
}

import CodingProfilesSkeleton from "./CodingProfilesSkeleton";

export default function CodingProfiles() {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [wakatime, setWakatime] = useState<WakaTimeData | null>(null);
  const [loading, setLoading] = useState(true);

  const heatmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (github && heatmapRef.current) {
      const timer = setTimeout(() => {
        if (heatmapRef.current) {
          heatmapRef.current.scrollLeft = heatmapRef.current.scrollWidth;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [github]);

  const slideLeft = () => {
    if (heatmapRef.current) {
      heatmapRef.current.scrollBy({ left: -140, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (heatmapRef.current) {
      heatmapRef.current.scrollBy({ left: 140, behavior: "smooth" });
    }
  };

  const getMonthName = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 2) return "";
    const monthIndex = parseInt(parts[1], 10) - 1;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthIndex] || "";
  };

  const shouldShowMonthLabel = (cIdx: number, cols: Array<Array<{ date: string; level: number }>>) => {
    if (cIdx === 0) return true;
    const prevCol = cols[cIdx - 1];
    const currCol = cols[cIdx];
    if (!prevCol || !currCol || prevCol.length === 0 || currCol.length === 0) return false;
    
    const prevParts = prevCol[0].date.split("-");
    const currParts = currCol[0].date.split("-");
    if (prevParts.length < 2 || currParts.length < 2) return false;
    
    return prevParts[1] !== currParts[1];
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const [gitRes, leetRes, wakaRes] = await Promise.allSettled([
          fetch("/api/github"),
          fetch("/api/leetcode"),
          fetch("/api/wakatime")
        ]);

        if (gitRes.status === "fulfilled" && gitRes.value.ok) {
          setGithub(await gitRes.value.json());
        }
        if (leetRes.status === "fulfilled" && leetRes.value.ok) {
          setLeetcode(await leetRes.value.json());
        }
        if (wakaRes.status === "fulfilled" && wakaRes.value.ok) {
          setWakatime(await wakaRes.value.json());
        }
      } catch (err) {
        console.error("Failed to load profile details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0: return "bg-[#161b22]";
      case 1: return "bg-[#0e4429]";
      case 2: return "bg-[#006d32]";
      case 3: return "bg-[#26a641]";
      case 4: return "bg-[#39d353]";
      default: return "bg-[#161b22]";
    }
  };

  if (loading) {
    return <CodingProfilesSkeleton />;
  }

  return (
    <section
      id="profiles"
      className="py-24 border-b border-border-subtle bg-obsidian relative overflow-hidden"
    >
      {/* Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_30%,transparent_100%)] opacity-[0.025] animate-grid-pan" />
        <div className="absolute top-[20%] left-[5%] w-[250px] h-[250px] rounded-full bg-[#26a641]/4 blur-[100px] animate-float-slow" />
        <div className="absolute top-[50%] left-[45%] -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-primary/4 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] rounded-full bg-[#00add8]/4 blur-[100px] animate-float-reverse" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            06 / LIVE_WIDGETS
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream">
            DEV_PROFILES
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* GitHub Profile Card */}
          <div className="bg-surface border border-border-subtle p-6 hover:border-[#26a641]/30 transition-colors shadow-sm relative overflow-hidden group min-h-[480px] flex flex-col justify-between">
            <div>
              {/* Subtle Green Brand Radial Glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#26a641]/5 blur-[60px] pointer-events-none rounded-full" />
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#161b22] border border-border-subtle rounded flex items-center justify-center text-cream">
                    <FaGithub size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-cream">GitHub Profile</h3>
                    <p className="font-mono text-[10px] text-on-surface-variant">@{github?.username}</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase font-bold text-[#26a641] bg-[#26a641]/10 px-2 py-1 rounded">
                  LIVE_FEED
                </span>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-4 gap-2 mb-6 font-mono text-center border-y border-border-subtle/40 py-4">
                <div>
                  <p className="text-outline text-[8px] uppercase">FOLLOWERS</p>
                  <p className="text-cream text-xs font-bold">{github?.followers}</p>
                </div>
                <div>
                  <p className="text-outline text-[8px] uppercase">REPOS</p>
                  <p className="text-cream text-xs font-bold">{github?.publicRepos}</p>
                </div>
                <div>
                  <p className="text-outline text-[8px] uppercase">STARS</p>
                  <p className="text-primary text-xs font-bold">{github?.totalStars}</p>
                </div>
                <div>
                  <p className="text-outline text-[8px] uppercase">COMMITS</p>
                  <p className="text-[#39d353] text-xs font-bold">{github?.contributionsThisYear}</p>
                </div>
              </div>

              {/* Contribution Calendar Heatmap */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-mono text-[10px] text-outline uppercase">
                    CONTRIBUTIONS ({github?.heatmap ? `${github.heatmap.length} WEEKS` : "LOADING"})
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      onClick={slideLeft}
                      className="w-5 h-5 border border-border-subtle hover:border-cream/40 bg-surface-dark text-cream flex items-center justify-center rounded text-[10px] transition-colors cursor-pointer select-none font-bold active:scale-95"
                      title="Scroll left (older)"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={slideRight}
                      className="w-5 h-5 border border-border-subtle hover:border-cream/40 bg-surface-dark text-cream flex items-center justify-center rounded text-[10px] transition-colors cursor-pointer select-none font-bold active:scale-95"
                      title="Scroll right (newer)"
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className="relative border border-border-subtle/30 bg-black/25 p-3 rounded overflow-hidden">
                  <div 
                    ref={heatmapRef}
                    className="overflow-x-auto pb-1 no-scrollbar flex flex-col gap-2 scroll-smooth"
                  >
                    {github?.heatmap && (
                      <>
                         {/* Month Labels Row */}
                         <div className="flex gap-[2.5px] h-[12px] font-mono text-[8px] text-outline/65 select-none relative">
                           {github.heatmap.map((col, cIdx) => {
                             const showLabel = shouldShowMonthLabel(cIdx, github.heatmap);
                             return (
                               <div key={cIdx} className="w-[7px] shrink-0 relative">
                                 {showLabel && (
                                   <span className="absolute left-0 bottom-0 whitespace-nowrap leading-none">
                                     {getMonthName(col[0]?.date)}
                                   </span>
                                 )}
                               </div>
                             );
                           })}
                         </div>

                         {/* Heatmap Grid Row */}
                         <div className="flex gap-[2.5px]">
                           {github.heatmap.map((col, cIdx) => (
                             <div key={cIdx} className="flex flex-col gap-[2.5px] shrink-0">
                               {col.map((cell, rIdx) => (
                                 <div
                                   key={rIdx}
                                   className={`w-[7px] h-[7px] rounded-[1.2px] ${getHeatmapColor(cell.level)} transition-all duration-300 hover:scale-125 hover:z-10`}
                                   title={`${cell.date}: Level ${cell.level}`}
                                 />
                               ))}
                             </div>
                           ))}
                         </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Commits */}
            <div>
              <p className="font-mono text-[10px] text-outline uppercase mb-3">RECENT_COMMITS</p>
              <div className="space-y-2.5 font-mono text-[11px] leading-relaxed">
                {github?.recentCommits.slice(0, 3).map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-border-subtle/30 pb-2 gap-2">
                    <span className="text-[#A5D6FF] truncate max-w-[100px]">{c.repo}:</span>
                    <span className="text-on-surface-variant truncate flex-1 text-left">{c.message}</span>
                    <span className="text-outline text-[9px] shrink-0">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LeetCode Profile Card */}
          <div className="bg-surface border border-border-subtle p-6 hover:border-primary/30 transition-colors shadow-sm relative overflow-hidden group min-h-[480px] flex flex-col justify-between">
            <div>
              {/* Subtle Gold Brand Radial Glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-primary/5 blur-[60px] pointer-events-none rounded-full" />

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elevated border border-border-subtle rounded flex items-center justify-center text-primary">
                    <FaCode size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-cream">LeetCode Profile</h3>
                    <p className="font-mono text-[10px] text-on-surface-variant">@{leetcode?.username}</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  STATS
                </span>
              </div>

              {/* Ratings & Solved Ratio Split */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* LeetCode statistics */}
                <div className="space-y-4 border-r border-border-subtle/30 pr-4">
                  <div className="font-mono">
                    <p className="text-outline text-[9px] uppercase">RATING</p>
                    <p className="text-primary text-xl font-black">{leetcode?.rating}</p>
                  </div>
                  <div className="font-mono">
                    <p className="text-outline text-[9px] uppercase">RANKING</p>
                    <p className="text-cream text-sm font-bold">#{leetcode?.ranking.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progress bars for Easy, Medium, Hard */}
                <div className="space-y-2.5 font-mono text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">SOLVED</span>
                    <span className="text-cream font-bold">{leetcode?.solved.total}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-[#00B8A3]">EASY</span>
                      <span>{leetcode?.solved.easy}</span>
                    </div>
                    <div className="w-full h-1 bg-elevated rounded-full overflow-hidden">
                      <div className="h-full bg-[#00B8A3]" style={{ width: `${leetcode?.solved ? (leetcode.solved.easy / leetcode.solved.total) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-[#FFC01E]">MEDIUM</span>
                      <span>{leetcode?.solved.medium}</span>
                    </div>
                    <div className="w-full h-1 bg-elevated rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFC01E]" style={{ width: `${leetcode?.solved ? (leetcode.solved.medium / leetcode.solved.total) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-[#EF4743]">HARD</span>
                      <span>{leetcode?.solved.hard}</span>
                    </div>
                    <div className="w-full h-1 bg-elevated rounded-full overflow-hidden">
                      <div className="h-full bg-[#EF4743]" style={{ width: `${leetcode?.solved ? (leetcode.solved.hard / leetcode.solved.total) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <div>
              <p className="font-mono text-[10px] text-outline uppercase mb-3">RECENT_SUBMISSIONS</p>
              <div className="space-y-2.5 font-mono text-[11px] leading-relaxed">
                {leetcode?.recentSubmissions.slice(0, 3).map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-border-subtle/30 pb-2 gap-2">
                    <span className="text-cream truncate flex-1 text-left">{s.title}</span>
                    <span className="text-outline text-[9px] shrink-0 font-semibold">{s.lang}</span>
                    <span className="text-[#00B8A3] text-[9px] font-bold uppercase shrink-0">{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WakaTime Profile Card */}
          <div className="bg-surface border border-border-subtle p-6 hover:border-[#00add8]/30 transition-colors shadow-sm relative overflow-hidden group min-h-[480px] flex flex-col justify-between">
            <div>
              {/* Subtle Cyan Brand Glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#00add8]/5 blur-[60px] pointer-events-none rounded-full" />

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elevated border border-border-subtle rounded flex items-center justify-center text-[#00add8]">
                    <FaClock size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-cream">WakaTime Stats</h3>
                    <p className="font-mono text-[10px] text-on-surface-variant">Last 7 days activity</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase font-bold text-[#00add8] bg-[#00add8]/10 px-2 py-1 rounded">
                  METRICS
                </span>
              </div>

              {/* Time stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 border-y border-border-subtle/40 py-4 font-mono text-center">
                <div>
                  <p className="text-outline text-[9px] uppercase">TOTAL_CODING</p>
                  <p className="text-[#00add8] text-lg font-bold">{wakatime?.humanReadableTotal || `${wakatime?.totalHours || 0} hrs`}</p>
                </div>
                <div>
                  <p className="text-outline text-[9px] uppercase">DAILY_AVERAGE</p>
                  <p className="text-cream text-lg font-bold">{wakatime?.dailyAverage || "0h 0m"}</p>
                </div>
              </div>

              {/* Languages Breakdown */}
              <div className="space-y-2.5 font-mono text-[10px]">
                <p className="text-outline text-[9px] uppercase mb-1">TOP_LANGUAGES</p>
                
                {wakatime?.languages && wakatime.languages.length > 0 ? (
                  wakatime.languages.slice(0, 4).map((lang, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[9px]">
                        <span className="text-cream font-medium">{lang.name}</span>
                        <span className="text-outline">{lang.percentage}%</span>
                      </div>
                      <div className="w-full h-1 bg-elevated rounded-full overflow-hidden">
                        <div className="h-full" style={{ backgroundColor: lang.color, width: `${lang.percentage}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-outline text-center py-2">No language data found</p>
                )}
              </div>
            </div>

            {/* Categories breakdown */}
            <div className="mt-4 pt-4 border-t border-border-subtle/30">
              <p className="font-mono text-[10px] text-outline uppercase mb-2.5">ACTIVITY_BREAKDOWN</p>
              <div className="flex flex-wrap gap-2">
                {wakatime?.categories && wakatime.categories.length > 0 ? (
                  wakatime.categories.map((cat, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[9px] text-cream bg-elevated border border-border-subtle/80 px-2.5 py-1 rounded-full"
                    >
                      {cat.name}: <span className="text-[#00add8] font-bold">{cat.percentage}%</span>
                    </span>
                  ))
                ) : (
                  <span className="text-outline text-[9px]">Coding: 100%</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
