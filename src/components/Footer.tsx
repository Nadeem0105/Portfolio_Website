"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Music } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaCode } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface TrackInfo {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumUrl?: string;
  songUrl?: string;
}

export default function Footer() {
  const [spotifyData, setSpotifyData] = useState<TrackInfo>({
    isPlaying: false,
    title: "Not Playing",
    artist: "Spotify",
  });

  useEffect(() => {
    // Fetch now playing state from API
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const data = await res.json();
          setSpotifyData(data);
        }
      } catch (err) {
        console.error("Failed to fetch Spotify state:", err);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-obsidian border-t border-border-subtle py-12 relative">
      <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-8 w-full">
        {/* Left */}
        <div className="font-mono text-xs text-on-surface-variant uppercase tracking-wider text-center md:text-left select-none flex flex-col gap-1" suppressHydrationWarning>
          <span>root@nadeem:~$ keep_building()</span>
          <span>© {new Date().getFullYear()} MOHAMMAD_NADEEM</span>
        </div>

        {/* Center: Spotify & Built with */}
        <div className="flex flex-col items-center gap-2">
          {/* Spotify Widget */}
          <div className="flex items-center gap-3 bg-surface border border-border-subtle px-4 py-2 rounded-full shadow-sm text-xs font-mono">
            <span className="relative flex h-2 w-2">
              {spotifyData.isPlaying && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#1DB954]" />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                spotifyData.isPlaying ? "bg-[#1DB954]" : "bg-outline/40"
              }`} />
            </span>
            <Music size={14} className={spotifyData.isPlaying ? "text-[#1DB954] animate-pulse" : "text-on-surface-variant"} />
            {spotifyData.isPlaying ? (
              <a
                href={spotifyData.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors text-cream flex items-center gap-1.5"
              >
                <span className="font-semibold">{spotifyData.title}</span> — <span className="text-on-surface-variant">{spotifyData.artist}</span>
              </a>
            ) : (
              <span className="text-on-surface-variant">{spotifyData.title} — {spotifyData.artist}</span>
            )}
          </div>
          
          <div className="font-sans text-xs text-outline text-center">
            © {new Date().getFullYear()} MOHAMMAD_NADEEM
          </div>
        </div>

        {/* Right: Social links & Scroll to Top */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a
              href="https://github.com/Nadeem0105"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-1"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/mdnadeem0108/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://x.com/Nadeem_0105"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-1"
              aria-label="X (Twitter)"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://www.instagram.com/nadeem_0108"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-1"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="mailto:nadeemmd.0105@gmail.com"
              className="text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-1"
              aria-label="Gmail"
            >
              <FaEnvelope size={18} />
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-1"
              aria-label="Code"
            >
              <FaCode size={18} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-border-subtle bg-elevated rounded flex items-center justify-center text-primary hover:border-primary hover:bg-surface-variant transition-all hover-trigger active:scale-95 shadow-sm"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
