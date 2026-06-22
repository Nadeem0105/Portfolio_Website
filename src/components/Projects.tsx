"use client";

import React, { useRef } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  name: string;
  desc: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
}

// 3D Card Tilt + Spotlight component wrapper
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Direct DOM manipulation of CSS variables
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Calculate rotation angles
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / (rect.height / 12); // max 12 deg tilt
    const rotateY = (x - centerX) / (rect.width / 12);

    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.05s linear, border-color 0.3s ease";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`,
        transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease",
      }}
      className="bg-surface border border-border-subtle p-8 flex flex-col justify-between h-full hover:border-primary/40 relative overflow-hidden group select-none shadow-sm cursor-default"
    >
      {/* Spotlight highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 150, 26, 0.08), transparent 80%)`,
        }}
      />

      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="font-mono text-[10px] uppercase font-bold text-secondary tracking-widest">
            {project.category}
          </span>
          <div className="flex gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors hover-trigger z-10"
              aria-label="GitHub Repository"
            >
              <FaGithub size={16} />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors hover-trigger z-10"
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt size={14} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-display text-xl font-bold text-cream group-hover:text-primary transition-colors mb-3">
          {project.name}
        </h3>
        <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
          {project.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-subtle/30">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[9px] uppercase font-bold text-[#8A8A96] bg-elevated px-2 py-1 border border-border-subtle/50"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const featuredProject = {
    name: "IntelliMail-AI",
    desc: "A hybrid email intelligence platform that combines Machine Learning and Large Language Models to classify spam, prioritize incoming messages, and generate human-readable explanations for every decision.Built with FastAPI, Scikit-learn, and Google Gemini, IntelliMail AI delivers accurate email analysis through a multi-stage AI pipeline that balances speed, contextual understanding, and explainability.",
    tech: ["FastAPI", "Scikit-learn", "Gemini-API", "TF-IDF", "NAIVE BAYES", "JAVASCRIPT", "HTML/CSS"],
    githubUrl: "https://github.com/Nadeem0105/IntelliMail_AI",
    liveUrl: "https://intelli-mail-ai.vercel.app",
    category: "FEATURED_ENGINE"
  };

  const secondaryProjects: Project[] = [
    {
      name: "Aura Ledger",
      desc: "Decentralized log verification engine implemented in Rust and compiled to WebAssembly. Enables instant validation of application logging files with cryptography proofs, avoiding ledger bloating and databases indexing bottlenecks.",
      tech: ["Rust", "Wasm", "SHA-256", "SQLite"],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
      category: "CRYPTO_STORAGE"
    },
    {
      name: "WeatherSphere",
      desc: "High-fidelity atmospheric intelligence system providing real-time forecasts, pinned location monitoring, travel weather logging, and dynamic environmental visualizations through an immersive modern interface.",
      tech: ["Next.js", "OpenWeather API", "TypeScript", "Dashboard","CRUD","Visual Analytics"],
      githubUrl: "https://github.com/Nadeem0105/WeatherSphere",
      liveUrl: "https://weather-web-app-sable.vercel.app/",
      category: "WEATHER_INTELLIGENCE"
    },
    {
      name: "Core Financial Processor",
      desc: "A low-latency transactional ledger built in C++ featuring multi-threaded RingBuffers for message exchanges. Connects directly to memory-mapped files to guarantee persistent data logging with sub-millisecond execution times.",
      tech: ["C++", "POSIX Threads", "Redis", "Valgrind"],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
      category: "SYSTEMS_ENG"
    }
  ];

  return (
    <section
      id="projects"
      className="py-24 border-b border-border-subtle bg-surface relative overflow-hidden"
    >
      {/* Animated cyber background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.035] animate-grid-pan" />
        <div className="absolute top-[30%] left-[70%] w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-primary/6 blur-[100px] animate-float-reverse" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            03 / SYSTEM_BUILDS
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream">
            PRODUCTION_SHIPPED
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        {/* Featured Project */}
        <div className="mb-12 w-full">
          <div className="bg-elevated border border-primary/20 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative plus-corner-tr plus-corner-bl hover:border-primary/45 transition-colors group">
            
            {/* Project Content */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-bold text-primary tracking-widest bg-primary/5 border border-primary/25 px-2.5 py-1">
                    FEATURED_SYSTEM
                  </span>
                  <span className="font-mono text-[10px] text-outline uppercase font-semibold">
                    Go / Event-Bus
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-black text-cream group-hover:text-primary transition-colors">
                  {featuredProject.name}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed mt-4 max-w-2xl">
                  {featuredProject.desc}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-4">
                {featuredProject.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] uppercase font-semibold text-cream bg-surface border border-border-subtle px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Stats & Links */}
            <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-border-subtle/50 pt-6 lg:pt-0 lg:pl-8 space-y-6 lg:space-y-0">
              <div className="space-y-4 font-mono text-xs w-full lg:text-right">
                <div>
                  <p className="text-outline uppercase text-[10px]">TYPE</p>
                  <p className="text-primary font-bold text-lg">AI APPLICATION</p>
                </div>
                <div>
                  <p className="text-outline uppercase text-[10px]">ARCHITECTURE</p>
                  <p className="text-cream font-bold">HYBRID AI SYSTEM</p>
                </div>
                <div>
                  <p className="text-outline uppercase text-[10px]">STATUS</p>
                  <p className="text-[#39D353] font-bold">DEPLOYED &lt; ACTIVE</p>
                </div>
              </div>

              <div className="flex gap-4 w-full justify-start lg:justify-end relative z-20">
                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold border border-border-subtle bg-surface text-primary hover:border-primary hover:bg-primary/5 transition-colors hover-trigger px-4 py-2.5 rounded flex items-center gap-2 relative z-20"
                >
                  <FaGithub size={14} />
                  <span>ACCESS_REPO</span>
                </a>
                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold border border-primary bg-primary text-obsidian hover:bg-transparent hover:text-primary transition-colors hover-trigger px-4 py-2.5 rounded flex items-center gap-2 relative z-20"
                  >
                    <FaExternalLinkAlt size={12} />
                    <span>LAUNCH_SYSTEM</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {secondaryProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
