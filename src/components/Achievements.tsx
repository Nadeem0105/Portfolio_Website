"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Briefcase, Rocket, Laptop, Target } from "lucide-react";

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
      title: "Software Development Intern — ISOEH",
      desc: "Worked on frontend development, API integration, AWS EC2 deployment, Nginx configuration, React Native applications, and UI/UX improvements while contributing to production-ready software.",
      icon: <Image src="/isoeh.png" alt="ISOEH Logo" width={24} height={24} className="object-contain" />
    },
    {
      title: "Software Intern — ButterSearch",
      desc: "Built AI automation workflows for lead generation, integrated AI models and third-party APIs, and contributed to business development initiatives.",
      icon: <Image src="/butter.png" alt="ButterSearch Logo" width={24} height={24} className="object-contain" />
    },
    {
      title: "Full Stack Developer",
      desc: "Designed and developed multiple end-to-end applications including Naagrik, IntelliMail AI, Exam Alchemy, and WeatherSphere using React, Next.js, Node.js, Express, MongoDB, and FastAPI.",
      icon: <Laptop className="text-primary" size={24} />
    },
    {
      title: "Coding Ninjas SRM Member",
      desc: "Contributed to the Web Development domain and helped organize technical events including CAD 3.0, Capture the Flag 4.0, and CAD 4.0.",
      icon: <Image src="/coding_ninjas.png" alt="Coding Ninjas Logo" width={24} height={24} className="object-contain rounded-sm" />
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
            05 / CAREER_HIGHLIGHTS
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream">
            DEVELOPER_IMPACT
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        {/* Dynamic Metric Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-elevated border border-border-subtle/40 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
              <Counter end={8} suffix="+" />
            </div>
            <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
              PROJECTS_BUILT
            </p>
          </div>

          <div className="bg-elevated border border-border-subtle/40 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
              <Counter end={20} suffix="+" />
            </div>
            <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
              TECHNOLOGIES_USED
            </p>
          </div>

          <div className="bg-elevated border border-border-subtle/40 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
              <Counter end={2} suffix="" />
            </div>
            <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
              INTERNSHIPS
            </p>
          </div>

          <div className="bg-elevated border border-border-subtle/40 p-6 flex flex-col items-center justify-center text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
              <Counter end={3} suffix="" />
            </div>
            <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
              CERTIFICATIONS
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
