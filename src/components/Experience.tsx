"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Milestone {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  logo: string;
}

function TimelineItem({ item, index }: { item: Milestone; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`flex flex-col md:flex-row items-center w-full md:justify-between relative mb-12 md:mb-16 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Connector Dot */}
      <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-obsidian z-20 transform -translate-x-1.5 md:-translate-x-2 shadow-sm" />

      {/* Left side card (for even indexes on desktop) */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? "md:order-1" : "md:order-3 md:opacity-0 pointer-events-none hidden md:block"}`}>
        {isEven && (
          <div className="bg-elevated border border-border-subtle p-6 hover:border-primary/20 transition-colors shadow-sm relative flex gap-4 items-start text-left">
            <div className="w-12 h-12 rounded bg-white overflow-hidden shrink-0 flex items-center justify-center p-1 shadow border border-border-subtle/50">
              <Image src={item.logo} alt={`${item.company} logo`} width={48} height={48} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1">
              <span className="font-mono text-[10px] text-secondary font-bold block mb-1">{item.period}</span>
              <h3 className="font-display text-lg font-bold text-cream mb-0.5 leading-snug">{item.role}</h3>
              <h4 className="font-mono text-xs text-primary font-semibold uppercase mb-3">{item.company}</h4>
              <ul className="text-xs text-on-surface-variant space-y-2 list-disc pl-4">
                {item.bullets.map((b, i) => (
                  <li key={i} className="leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Center gap (md only) */}
      <div className="hidden md:block w-[10%] order-2" />

      {/* Right side card (for odd indexes on desktop) */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${!isEven ? "md:order-3" : "md:order-1 md:opacity-0 pointer-events-none hidden md:block"}`}>
        {!isEven && (
          <div className="bg-elevated border border-border-subtle p-6 hover:border-primary/20 transition-colors shadow-sm relative flex gap-4 items-start text-left">
            <div className="w-12 h-12 rounded bg-white overflow-hidden shrink-0 flex items-center justify-center p-1 shadow border border-border-subtle/50">
              <Image src={item.logo} alt={`${item.company} logo`} width={48} height={48} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1">
              <span className="font-mono text-[10px] text-secondary font-bold block mb-1">{item.period}</span>
              <h3 className="font-display text-lg font-bold text-cream mb-0.5 leading-snug">{item.role}</h3>
              <h4 className="font-mono text-xs text-primary font-semibold uppercase mb-3">{item.company}</h4>
              <ul className="text-xs text-on-surface-variant space-y-2 list-disc pl-4">
                {item.bullets.map((b, i) => (
                  <li key={i} className="leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const history: Milestone[] = [
    {
      role: "Software & Business Development Intern",
      company: "Butter Search",
      period: "2026 - PRESENT",
      bullets: [
        "Developed AI-powered lead generation workflows by integrating automation pipelines, third-party APIs, and AI models to identify and qualify high-quality prospects.",
        "Built automated outreach and campaign management systems, streamlining lead engagement while reducing manual effort.",
        "Designed analytics and reporting dashboards to monitor campaign performance, lead conversion metrics, and business growth."
      ],
      logo: "/butter.png"
    },
    {
      role: "SOFTWARE DEVELOPMENT ENGINEER INTERN",
      company: "ISOEH",
      period: "2026 - PRESENT",
      bullets: [
        "Developing frontend features and integrating APIs for real-world applications while gaining practical experience in AWS EC2, Nginx, and deployment workflows.",
        "Exploring React Native development, image processing techniques, and UI/UX design principles through hands-on industry projects."
      ],
      logo: "/isoeh.png"
    },
    {
      role: "Web-Development Domain Member",
      company: "10X Coding Ninja SRM",
      period: "2024 - PRESENT",
      bullets: [
        "Architecting web applications and database integrations within the student technical domain.",
        "Collaborating with peers on competitive coding tracks and building dynamic portal frontends.",
        "Participating in regular hackathons and software build competitions organized by SRM."
      ],
      logo: "/coding_ninjas.png"
    },
    {
      role: "B.Tech in Computer Science & Engineering",
      company: "SRM Institute of Science & Technology",
      period: "2024 - PRESENT",
      bullets: [
        "Pursuing Bachelor of Technology with focus on core Computer Science disciplines, Object-Oriented Programming, and Web Architectures.",
        "Maintaining a strong academic standing and actively contributing to technical clubs, web development labs, and university projects."
      ],
      logo: "/srm.png"
    }
  ];

  return (
    <section
      id="experience"
      className="py-24 border-b border-border-subtle bg-obsidian relative overflow-hidden"
    >
      {/* Background timeline glow */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_40%,transparent_100%)] opacity-[0.025] animate-grid-pan" />
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[150px] h-[300px] bg-primary/4 blur-[60px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] animate-float-slow" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            04 / TIMELINE
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream">
            ENGINEERING_LOGS
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        {/* Timeline container */}
        <div className="relative w-full max-w-4xl mx-auto py-8">
          {/* Vertical central bar */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border-subtle transform -translate-x-[0.5px]" />

          {history.map((item, idx) => (
            <TimelineItem key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
