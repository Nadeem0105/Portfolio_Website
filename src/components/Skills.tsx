"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "databases" | "tools" | "cloud";
  percentage: number;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "databases" | "tools" | "cloud">("all");
  const [animateBars, setAnimateBars] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills: SkillItem[] = [
    // Frontend
    { name: "Next.js", category: "frontend", percentage: 90 },
    { name: "React.js", category: "frontend", percentage: 85 },
    { name: "TypeScript", category: "frontend", percentage: 85 },
    { name: "JavaScript", category: "frontend", percentage: 90 },
    { name: "HTML5", category: "frontend", percentage: 95 },
    { name: "CSS3", category: "frontend", percentage: 90 },
    { name: "Tailwind CSS", category: "frontend", percentage: 95 },
    { name: "Framer Motion", category: "frontend", percentage: 65 },

    // Backend
    { name: "Node.js", category: "backend", percentage: 90 },
    { name: "Express.js", category: "backend", percentage: 90 },
    { name: "REST APIs", category: "backend", percentage: 95 },
    { name: "Authentication & Authorization", category: "backend", percentage: 80 },
    { name: "API Integration", category: "backend", percentage: 90 },
    { name: "Spring Boot (Learning)", category: "backend", percentage: 65 },

    // Database
    { name: "MongoDB", category: "databases", percentage: 85 },
    { name: "MySQL", category: "databases", percentage: 90 },
    { name: "Firebase", category: "databases", percentage: 90 },

    // Cloud and Deployment
    { name: "AWS EC2", category: "cloud", percentage: 75 },
    { name: "Nginx", category: "cloud", percentage: 70 },
    { name: "Vercel", category: "cloud", percentage: 90 },
    { name: "Linux Basics", category: "cloud", percentage: 75 },
    { name: "Deployment & Hosting", category: "cloud", percentage: 80 },

    // Tools
    { name: "Git", category: "tools", percentage: 90 },
    { name: "GitHub", category: "tools", percentage: 95 },
    { name: "Postman", category: "tools", percentage: 90 },
    { name: "VS Code", category: "tools", percentage: 95 },
    { name: "Android Studio", category: "tools", percentage: 75 },
    { name: "Figma", category: "tools", percentage: 75 },
    { name: "npm", category: "tools", percentage: 90 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
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
    setIsExpanded(false);
  }, [activeTab]);

  const filteredSkills = skills.filter(
    (skill) => activeTab === "all" || skill.category === activeTab
  );

  const displayedSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, 8);

  const tabOptions: Array<{ id: "all" | "frontend" | "backend" | "databases" | "tools" | "cloud"; label: string }> = [
    { id: "all", label: "ALL" },
    { id: "frontend", label: "FRONTEND" },
    { id: "backend", label: "BACKEND" },
    { id: "databases", label: "DATABASES" },
    { id: "tools", label: "TOOLS" },
    { id: "cloud", label: "CLOUD & DEPLOYMENT" }
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 border-b border-border-subtle bg-obsidian relative overflow-hidden"
    >
      {/* Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_30%,transparent_100%)] opacity-[0.025] animate-grid-pan" />
        <div className="absolute top-[40%] left-[80%] w-[250px] h-[250px] rounded-full bg-primary/6 blur-[80px] animate-float-slow" />
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-tertiary/6 blur-[90px] animate-float-reverse" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            02 / TECH_STACK
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream">
            SYSTEM_CAPABILITIES
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-border-subtle/40 pb-6 w-full">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-mono text-xs font-bold px-4 py-2 border transition-all duration-200 hover-trigger ${
                activeTab === tab.id
                  ? "bg-primary text-obsidian border-primary"
                  : "bg-elevated border-border-subtle text-on-surface-variant hover:text-primary hover:border-primary/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skill cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-surface border border-border-subtle p-6 flex flex-col justify-between hover:border-primary/30 transition-colors shadow-sm relative group"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans font-semibold text-sm text-cream group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-secondary font-bold">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress bar container */}
                <div className="w-full h-1.5 bg-elevated rounded-full overflow-hidden border border-border-subtle/30">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{
                      width: animateBars ? `${skill.percentage}%` : "0%",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Read More / Toggle Button */}
        {filteredSkills.length > 8 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-xs font-bold px-6 py-3 border border-primary bg-primary/5 text-primary hover:bg-primary hover:text-obsidian transition-all duration-300 hover-trigger flex items-center gap-2 relative z-20"
            >
              {isExpanded ? "COLLAPSE_VIEW" : "VIEW_ALL_SKILLS"}
              <span>{isExpanded ? "[-]" : "[+]"}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
