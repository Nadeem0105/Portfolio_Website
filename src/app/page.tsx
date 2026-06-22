"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/ui/preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import CodingProfilesSkeleton from "@/components/CodingProfilesSkeleton";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const TerminalOverlay = dynamic(() => import("@/components/TerminalOverlay"), { ssr: false });
const CodingProfiles = dynamic(() => import("@/components/CodingProfiles"), {
  ssr: false,
  loading: () => <CodingProfilesSkeleton />,
});

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <main className="min-h-screen relative overflow-hidden bg-obsidian">
        {/* Dynamic Cursor system */}
        <CustomCursor />

      {/* Navigation Layer */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Sections */}
      <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <CodingProfiles />
      <Resume />
      <Contact />

      {/* Footer System */}
      <Footer />

      {/* Terminal Command Line Interface overlay */}
      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </main>
    </>
  );
}
