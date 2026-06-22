"use client";

import { useEffect, useState, useRef } from "react";
import { Award, Trophy, Star, BookOpen } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
}

function Counter({ end, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const updateCount = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * end);
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [started, end]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  const accomplishments = [
    {
      title: "LeetCode Contest Rating 2185+",
      desc: "Ranked in the top 1.05% globally. Solved over 800 algorithmic challenges with consistent performance in weekly contests.",
      icon: <Trophy className="text-primary" size={24} />
    },
    {
      title: "GitHub Arctic Code Vault",
      desc: "Open source contributions archived in the GitHub Arctic Code Vault, preserving engineering builds for future generations.",
      icon: <Star className="text-primary" size={24} />
    },
    {
      title: "3x Hackathon Champion",
      desc: "Led teams of developers to secure 1st place finishes in regional and national hackathons, building prototype analytics pipelines.",
      icon: <Award className="text-primary" size={24} />
    },
    {
      title: "Technical Writer & Author",
      desc: "Published 12+ deep-dives on systems architecture, microservices synchronization, and low-latency programming guides.",
      icon: <BookOpen className="text-primary" size={24} />
    }
  ];

  return (
    <section
      id="achievements"
      className="py-24 border-b border-border-subtle bg-surface relative overflow-hidden"
    >
      {/* Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03] animate-grid-pan" />
        <div className="absolute -top-[10%] left-[60%] w-[350px] h-[350px] rounded-full bg-primary/6 blur-[100px] animate-float-slow" />
        <div className="absolute -bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-secondary/6 blur-[100px] animate-float-reverse" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            05 / PERFORMANCE
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream">
            METRICS_ACHIEVED
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        {/* Dynamic Metric Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-elevated border border-border-subtle/40 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
              <Counter end={2185} suffix="+" />
            </div>
            <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
              LEETCODE_RATING
            </p>
          </div>

          <div className="bg-elevated border border-border-subtle/40 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
              <Counter end={1420} suffix="+" />
            </div>
            <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
              ANNUAL_COMMITS
            </p>
          </div>

          <div className="bg-elevated border border-border-subtle/40 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
              <Counter end={184} suffix="" />
            </div>
            <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
              GITHUB_STARS
            </p>
          </div>

          <div className="bg-elevated border border-border-subtle/40 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
              <Counter end={3} suffix="x" />
            </div>
            <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
              HACKATHON_WINS
            </p>
          </div>
        </div>

        {/* Accomplishment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {accomplishments.map((item, idx) => (
            <div
              key={idx}
              className="bg-elevated border border-border-subtle p-6 hover:border-primary/25 transition-colors flex gap-5 relative group"
            >
              {/* Corner plusses hover */}
              <div className="absolute top-0 right-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
              
              <div className="shrink-0 w-12 h-12 bg-surface border border-border-subtle rounded flex items-center justify-center group-hover:border-primary/35 transition-colors">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-base font-bold text-cream group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
