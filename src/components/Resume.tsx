"use client";

import { useState } from "react";
import { Download, Eye, FileText } from "lucide-react";

export default function Resume() {
  const [downloading, setDownloading] = useState(false);

  const triggerDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Trigger native download
      const link = document.createElement("a");
      link.href = "/Resume_MohammadNadeem.pdf"; // PDF should be placed in public/
      link.download = "Resume_MohammadNadeem.pdf";
      link.click();
      setDownloading(false);
    }, 1200);
  };

  return (
    <section
      id="resume"
      className="py-24 border-b border-border-subtle bg-surface relative overflow-hidden"
    >
      {/* Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03] animate-grid-pan" />
        <div className="absolute -top-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-secondary/6 blur-[100px] animate-float-slow" />
        <div className="absolute -bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-primary/6 blur-[110px] animate-float-reverse" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            07 / CREDENTIALS
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream">
            SYSTEM_SPECIFICATION
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Summary description & download buttons */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display text-2xl font-bold text-cream">
              Professional Compendium
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              My detailed resume provides comprehensive specifications regarding my academic trajectory, including full technical stack exposure, embedded systems project history, cybersecurity coursework, and web development builds.
            </p>
            <div className="font-mono text-xs space-y-2.5 border-l-2 border-primary/25 pl-4 py-1 text-on-surface-variant">
              <p>FILENAME: <span className="text-cream">Resume_MohammadNadeem.pdf</span></p>
              <p>SIZE: <span className="text-cream">123.7 KB</span></p>
              <p>HASH: <span className="text-cream">SHA-256 (a3f9c21b...)</span></p>
              <p>LAST_UPDATED: <span className="text-cream">Q2 2026</span></p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={triggerDownload}
                disabled={downloading}
                className="font-mono text-xs font-bold bg-primary text-obsidian border border-primary px-6 py-3.5 rounded hover:bg-transparent hover:text-primary transition-colors hover-trigger flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Download size={14} />
                <span>{downloading ? "DOWNLOADING..." : "DOWNLOAD_PDF"}</span>
              </button>
              <a
                href="/Resume_MohammadNadeem.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold border border-border-subtle bg-elevated text-primary px-6 py-3.5 rounded hover:border-primary hover:bg-surface-variant transition-colors hover-trigger flex items-center gap-2 active:scale-95"
              >
                <Eye size={14} />
                <span>ONLINE_PREVIEW</span>
              </a>
            </div>
          </div>

          {/* Right: Resume Card Shimmer Preview */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div className="w-full max-w-md bg-elevated border border-border-subtle p-8 rounded-lg shadow-2xl relative overflow-hidden group select-none min-h-[300px] flex flex-col justify-between">
              
              {/* Shimmer animation active overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full shimmer-active pointer-events-none" />

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-border-subtle/40 pb-4">
                  <div className="flex items-center gap-2.5">
                    <FileText className="text-primary" size={20} />
                    <span className="font-mono text-[11px] font-bold tracking-wider text-cream">SPECIFICATION_SHEET</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>

                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <h4 className="font-display text-sm font-bold text-cream">SUMMARY OF COMPETENCIES</h4>
                    <p className="text-on-surface-variant mt-1.5 leading-relaxed">
                      Full-stack web development, IoT system integration, embedded sensor architectures, cybersecurity fundamentals, and responsive UI/UX engineering.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-sm font-bold text-cream">REPRESENTATIVE WORK</h4>
                    <p className="text-on-surface-variant mt-1.5 leading-relaxed">
                      Water level monitoring digital twins (Arduino/HC-SR04), Attack Surface Management dashboards, and dark-theme UI systems for cybersecurity platforms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="font-mono text-[9px] text-outline text-right uppercase pt-4 border-t border-border-subtle/30">
                SRM_INST_2025 // BUILD_VERIFIED
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
