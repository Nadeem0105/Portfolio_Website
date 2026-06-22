"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Terminal as TerminalIcon } from "lucide-react";

interface HeroProps {
  onOpenTerminal: () => void;
}

const name = "Mohammad Nadeem";
const subtitles = [
  "Full Stack Development",
  "Software Engineering",
  "Problem Solving",
  "Building Products",
  "Lifelong Learner",
  "Always curious about new Tech"
];

export default function Hero({ onOpenTerminal }: HeroProps) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [bashLine, setBashLine] = useState("");

  
  // Glitch effect trigger
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 350);
    };

    const interval = setInterval(triggerGlitch, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let subIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    let activeText = subtitles[0];

    const type = () => {
      activeText = subtitles[subIdx];

      if (isDeleting) {
        setTypewriterText(activeText.substring(0, charIdx - 1));
        charIdx--;
        typingSpeed = 40;
      } else {
        setTypewriterText(activeText.substring(0, charIdx + 1));
        charIdx++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIdx === activeText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of word
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        subIdx = (subIdx + 1) % subtitles.length;
        typingSpeed = 500; // Pause before starting new word
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mini-Bash Card prompt simulation
  useEffect(() => {
    const textToType = "cat core_philosophies.md";
    let index = 0;
    
    const typePrompt = () => {
      if (index < textToType.length) {
        setBashLine(textToType.substring(0, index + 1));
        index++;
        setTimeout(typePrompt, 120);
      }
    };

    const timer = setTimeout(typePrompt, 2000);
    return () => clearTimeout(timer);
  }, []);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 border-b border-border-subtle bg-obsidian"
    >
      {/* Background Image with Blending & Gradient Masks */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.35] mix-blend-screen"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        {/* Radial gradient to focus the image in the center and fade to obsidian near edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0A0A0B_95%)]" />
        {/* Linear gradient fade out at the bottom to transition smoothly to the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
      </div>

      {/* Background Interactive Particles */}
      <ParticleCanvas />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.07] pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="max-w-container-max mx-auto px-gutter w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Introduction details */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5 px-3 py-1 rounded"
          >
            DEVELOPER • ENGINEER • BUILDER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl font-extrabold text-cream leading-tight"
          >
            I am{" "}
            <span
              className={`glitch-text text-primary select-none ${
                glitchActive ? "glitch-active" : ""
              }`}
              data-text={name}
            >
              {name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-mono text-lg md:text-2xl text-on-surface-variant flex items-center min-h-[36px]"
          >
            <span className="text-secondary mr-2">&gt;</span>
            <span>{typewriterText}</span>
            <span className="blinking-cursor text-secondary">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="font-sans text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed"
          >
            I am a Computer Science undergraduate at SRM Institute of Science and Technology with a passion for building scalable web applications, solving real-world problems, and creating impactful software products. My interests span full-stack development, system design, problem solving, and innovative project development.
          </motion.p>

          {/* Socials & CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 pt-4 w-full"
          >
            <button
              onClick={() => smoothScrollTo("projects")}
              className="font-mono text-xs font-bold bg-primary text-obsidian border border-primary px-button-padding-x py-button-padding-y rounded hover:bg-transparent hover:text-primary transition-colors hover-trigger flex items-center gap-2 active:scale-95 shadow-md"
            >
              EXPLORE_PROJECTS
            </button>
            <button
              onClick={onOpenTerminal}
              className="font-mono text-xs font-bold border border-border-subtle bg-elevated text-primary px-button-padding-x py-button-padding-y rounded hover:border-primary hover:bg-surface-variant transition-colors hover-trigger flex items-center gap-2 active:scale-95 shadow-sm"
            >
              <TerminalIcon size={14} />
              INIT_TERMINAL
            </button>

            {/* Social icons */}
            <div className="flex items-center gap-4 pl-0 sm:pl-4 mt-2 sm:mt-0">
              <a
                href="https://github.com/Nadeem0105"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors hover-trigger"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mdnadeem0108"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors hover-trigger"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://x.com/Nadeem_0105"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors hover-trigger"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Mock Bash Card Widget */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-md bg-[#0D1117] rounded-lg border border-border-subtle shadow-2xl flex flex-col overflow-hidden relative scanline font-mono text-xs text-tertiary select-none"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            {/* Header bar */}
            <div className="bg-[#1A1A1E] px-4 py-2 flex items-center border-b border-border-subtle">
              <div className="flex gap-1.5 mr-3">
                <span className="w-2.5 h-2.5 rounded-full bg-error-red" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
              </div>
              <span className="text-[10px] text-outline">root@portfolio_node_1: ~</span>
            </div>

            {/* Prompt list */}
            <div className="p-4 space-y-3 min-h-[200px] leading-relaxed">
              <div>
                <span className="text-[#8A8A96]">[system_kernel] login: </span>
                <span className="text-cream">guest_user</span>
              </div>
              <div>
                <span className="text-secondary">guest@coreOS:~$ </span>
                <span>{bashLine}</span>
                <span className="blinking-cursor text-secondary">_</span>
              </div>
              {bashLine.length >= 24 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5 text-[#A5D6FF] border-l-2 border-primary/30 pl-2 ml-1"
                >
                  <p className="text-cream font-bold"># Core Philosophies</p>
                  <p>1. Build First, Refine Always</p>
                  <p>2. Security is Not an Afterthought</p>
                  <p>3. Hardware Speaks, Software Listens</p>
                  <p>4. Clean UI is Honest Engineering</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
