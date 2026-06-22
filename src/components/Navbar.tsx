"use client";

import { useEffect, useState } from "react";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    // 1. Passive scroll listener for header styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. IntersectionObserver for active section tracking (no layout thrashing)
    const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];
    
    const observerOptions = {
      rootMargin: "-120px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setIsDrawerOpen(false);
      const navHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-obsidian/85 backdrop-blur-xl border-b border-border-subtle py-3 shadow-md"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center w-full">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("home");
          }}
          className="font-display font-semibold text-xl tracking-tight text-primary flex items-center hover-trigger group"
        >
          <span>Mohammad Nadeem</span>
          <span className="blinking-cursor text-primary ml-0.5">_</span>
        </a>

        {/* Desktop Navigation Link row */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(link.id);
              }}
              className={`font-mono text-xs font-medium uppercase tracking-wider transition-colors duration-200 hover-trigger relative py-1 ${
                activeSection === link.id ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300" />
              )}
            </a>
          ))}
        </div>

        {/* Terminal Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenTerminal}
            className="font-mono text-xs font-semibold text-primary border border-border-subtle bg-elevated px-4 py-2.5 rounded hover:border-primary hover:bg-surface-variant transition-colors hover-trigger flex items-center gap-2 active:scale-95"
          >
            <TerminalIcon size={14} />
            <span>&gt;_ TERMINAL</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="p-2 border border-border-subtle bg-elevated rounded hover:border-primary text-primary transition-colors flex items-center justify-center"
            aria-label="Toggle Terminal"
          >
            <TerminalIcon size={16} />
          </button>
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="text-cream p-1.5 focus:outline-none flex items-center justify-center border border-border-subtle bg-elevated rounded hover:border-primary transition-colors"
            aria-label="Toggle Menu"
          >
            {isDrawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-in drawer */}
      <div
        className={`fixed top-[62px] right-0 bottom-0 w-64 z-40 bg-surface border-l border-border-subtle p-6 flex flex-col gap-6 shadow-2xl transition-transform duration-300 md:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-5 mt-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(link.id);
              }}
              className={`font-mono text-sm font-semibold uppercase tracking-wider py-1 ${
                activeSection === link.id ? "text-primary border-b border-primary w-fit" : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              onOpenTerminal();
            }}
            className="font-mono text-xs font-semibold text-primary border border-primary bg-elevated px-4 py-3 rounded mt-4 text-center hover:bg-primary/10 transition-colors w-full flex items-center justify-center gap-2"
          >
            <TerminalIcon size={14} />
            <span>&gt;_ TERMINAL</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
