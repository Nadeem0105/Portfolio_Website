"use client";

import { useEffect, useRef, useState } from "react";

// Command database
const skillsData = {
  frontend: ["Next.js", "React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express.js", "REST APIs", "Authentication & Authorization", "API Integration", "Spring Boot (Learning)"],
  databases: ["MongoDB", "MySQL", "Firebase"],
  cloud_and_deployment: ["AWS EC2", "Nginx", "Vercel", "Linux Basics", "Deployment & Hosting"],
  tools: ["Git", "GitHub", "Postman", "VS Code", "Android Studio", "Figma", "npm"]
};

const projectsData = [
  { name: "intellimail-ai", desc: "Hybrid email intelligence platform combining ML and LLMs to classify spam and explain decisions", tech: ["FastAPI", "Scikit-learn", "Gemini-API", "TF-IDF"], url: "https://github.com/Nadeem0105/IntelliMail_AI" },
  { name: "weathersphere", desc: "High-fidelity atmospheric intelligence system providing real-time forecasts and analytics", tech: ["Next.js", "OpenWeather API", "TypeScript"], url: "https://github.com/Nadeem0105/WeatherSphere" },
  { name: "aura-ledger", desc: "Decentralized logging system in Rust and compiled to WebAssembly", tech: ["Rust", "WASM", "SHA-256", "SQLite"], url: "https://github.com" },
  { name: "core-financial-processor", desc: "Low-latency financial processing engine in C++ featuring multi-threaded RingBuffers", tech: ["C++", "POSIX Threads", "Redis", "Valgrind"], url: "https://github.com" }
];

const welcomeBanner = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 

  Welcome to NADEEM_OS Terminal v2.0.0
  Type 'help' to see available commands. Type 'clear' to reset.
  ─────────────────────────────────────────────────────────────────────────`;

const availableCommands = [
  "help", "clear", "home", "about", "skills", "projects", "experience", 
  "achievements", "profiles", "resume", "contact", "whoami", "ls", 
  "cat about.txt", "cat skills.json", "cat Resume_MohammadNadeem.pdf", "ls projects/", "cat projects/", 
  "ls achievements/", "pwd", "date", "uname -a", "history", "sudo", 
  "coffee", "skills --verbose", "github", "linkedin", "matrix", "banner", 
  "echo", "theme", "exit", "quit"
];

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalOverlay({ isOpen, onClose }: TerminalOverlayProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [output, setOutput] = useState<Array<{ type: "input" | "output" | "error" | "info"; text: string }>>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      // Initialize with welcome message if empty
      if (output.length === 0) {
        setOutput([{ type: "info", text: welcomeBanner }]);
      }
    }
  }, [isOpen, output.length]);

  // Handle Ctrl + ` and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && e.ctrlKey) {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, isMatrixActive]);

  // Matrix falling rain easter egg
  useEffect(() => {
    if (!isMatrixActive) return;
    
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.offsetWidth || 800;
    canvas.height = canvas.parentElement?.offsetHeight || 400;

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(13, 17, 23, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#39D353"; // green
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);
    
    const timer = setTimeout(() => {
      setIsMatrixActive(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isMatrixActive]);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      onClose();
      setTimeout(() => {
        const navHeight = 72;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
        
        // Highlight header animation flash
        const header = el.querySelector("h2");
        if (header) {
          header.classList.add("matrix-active");
          setTimeout(() => header.classList.remove("matrix-active"), 600);
        }
      }, 200);
    }
  };

  // Command Execution Parser
  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Save history
    const newHistory = [...history, trimmed].slice(-50);
    setHistory(newHistory);
    setHistoryIdx(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    const response: Array<{ type: "input" | "output" | "error" | "info"; text: string }> = [
      { type: "input", text: `[user@portfolio ~]$ ${trimmed}` }
    ];

    switch (cmd) {
      case "help":
        response.push({
          type: "output",
          text: `
Available commands:
  home | about | skills | projects | experience   => Navigate to site sections
  achievements | profiles | resume | contact     => Navigate to site sections
  whoami                                          => Display profile highlights
  ls [path]                                       => List directories/files
  cat [file]                                      => View file content
  pwd                                             => Show working directory
  date                                            => Current date & time
  uname -a                                        => System kernel info
  history                                         => Show command history
  coffee                                          => Feed the developer
  skills --verbose                                => High-resolution skill matrix
  github | linkedin                               => Open external links
  matrix                                          => Falling character stream
  banner                                          => Reprint welcome banner
  theme [light|dark]                              => Toggle terminal theme
  clear                                           => Clear terminal output
  exit | quit                                     => Close terminal overlay`
        });
        break;
      case "clear":
        setOutput([]);
        setInputVal("");
        return;
      case "exit":
      case "quit":
        onClose();
        setInputVal("");
        return;
      case "home":
        response.push({ type: "output", text: "Scrolling to Home..." });
        smoothScrollTo("home");
        break;
      case "about":
        response.push({ type: "output", text: "Scrolling to About..." });
        smoothScrollTo("about");
        break;
      case "skills":
        response.push({ type: "output", text: "Scrolling to Skills..." });
        smoothScrollTo("skills");
        break;
      case "projects":
        response.push({ type: "output", text: "Scrolling to Projects..." });
        smoothScrollTo("projects");
        break;
      case "experience":
        response.push({ type: "output", text: "Scrolling to Experience..." });
        smoothScrollTo("experience");
        break;
      case "achievements":
        response.push({ type: "output", text: "Scrolling to Achievements..." });
        smoothScrollTo("achievements");
        break;
      case "profiles":
        response.push({ type: "output", text: "Scrolling to Coding Profiles..." });
        smoothScrollTo("profiles");
        break;
      case "resume":
        if (arg === "download" || arg === "-d" || arg === "--download") {
          response.push({ type: "output", text: "Downloading resume PDF..." });
          const link = document.createElement("a");
          link.href = "/Resume_MohammadNadeem.pdf";
          link.download = "Resume_MohammadNadeem.pdf";
          link.click();
        } else {
          response.push({ type: "output", text: "Scrolling to Credentials/Resume section..." });
          smoothScrollTo("resume");
        }
        break;
      case "contact":
        response.push({ type: "output", text: "Scrolling to Contact..." });
        smoothScrollTo("contact");
        break;
      case "whoami":
        response.push({
          type: "output",
          text: `
Name:        Mohammad Nadeem
Focus:       Full-Stack Web Development, IoT & Embedded Systems, Cybersecurity
Experience:  Full-Stack Developer Intern @ ISOEH
Degree:      B.Tech Computer Science & Engineering (4th Sem)
Base:        Kolkata, WB, India`
        });
        break;
      case "pwd":
        response.push({ type: "output", text: "/home/portfolio/mohammad_nadeem" });
        break;
      case "date":
        response.push({ type: "output", text: new Date().toString() });
        break;
      case "uname":
        if (arg === "-a") {
          response.push({ type: "output", text: "PortfolioOS 2.0.0 x86_64-kernel (React-Core)" });
        } else {
          response.push({ type: "output", text: "PortfolioOS" });
        }
        break;
      case "history":
        response.push({ type: "output", text: newHistory.map((h, i) => ` ${i + 1}  ${h}`).join("\n") });
        break;
      case "sudo":
        if (arg.startsWith("rm")) {
          response.push({ type: "error", text: "Nice try. Permission denied. Also, please don't." });
        } else {
          response.push({ type: "error", text: "Sudo privileges not configured on this host." });
        }
        break;
      case "coffee":
        response.push({
          type: "output",
          text: `
      (  )   (   )
     ) (   ) (
     ___________
    |           | )
    |   ☕      |/
    |           |
    \\___________/
  Fueled by coffee and late nights.`
        });
        break;
      case "ls":
        if (!arg) {
          response.push({
            type: "output",
            text: "about.txt    skills.json    projects/    achievements/    Resume_MohammadNadeem.pdf"
          });
        } else if (arg === "projects" || arg === "projects/") {
          response.push({
            type: "output",
            text: projectsData.map(p => `${p.name}/`).join("    ")
          });
        } else if (arg === "achievements" || arg === "achievements/") {
          response.push({
            type: "output",
            text: "leetcode_top_1.txt    arctic_vault.txt    hackathons.txt"
          });
        } else {
          response.push({ type: "error", text: `ls: cannot access '${arg}': No such file or directory` });
        }
        break;
      case "cat":
        if (!arg) {
          response.push({ type: "error", text: "cat: missing file operand" });
        } else if (arg === "about.txt") {
          response.push({
            type: "output",
            text: "I am a Full-Stack developer and cybersecurity enthusiast focusing on dynamic React/Next.js builds, IoT architectures, and secure API gateways. Currently pursuing my B.Tech in Computer Science and Engineering."
          });
        } else if (arg === "skills.json") {
          response.push({
            type: "output",
            text: JSON.stringify(skillsData, null, 2)
          });
        } else if (arg === "Resume_MohammadNadeem.pdf" || arg === "resume.pdf") {
          response.push({ type: "output", text: "Triggering download of Resume_MohammadNadeem.pdf..." });
          const link = document.createElement("a");
          link.href = "/Resume_MohammadNadeem.pdf";
          link.download = "Resume_MohammadNadeem.pdf";
          link.click();
        } else if (arg.startsWith("projects/")) {
          const projName = arg.replace("projects/", "").replace("/", "");
          const match = projectsData.find(p => p.name === projName);
          if (match) {
            response.push({
              type: "output",
              text: `
Name:        ${match.name}
Description: ${match.desc}
Tech Stack:  ${match.tech.join(", ")}
URL:         ${match.url}`
            });
          } else {
            response.push({ type: "error", text: `cat: ${arg}: No such project found. Type 'ls projects/' to list.` });
          }
        } else if (arg.startsWith("achievements/")) {
          const achName = arg.replace("achievements/", "");
          if (achName === "leetcode_top_1.txt") {
            response.push({ type: "output", text: "LeetCode: Top 1% Global. Achieved high ranking in competitive programming contests." });
          } else if (achName === "arctic_vault.txt") {
            response.push({ type: "output", text: "GitHub Archive: Contributions preserved in the Arctic Code Vault." });
          } else if (achName === "hackathons.txt") {
            response.push({ type: "output", text: "Won 3+ National Level Hackathons for prototyping scalable solutions." });
          } else {
            response.push({ type: "error", text: `cat: ${arg}: No such achievement file.` });
          }
        } else {
          response.push({ type: "error", text: `cat: ${arg}: No such file or directory` });
        }
        break;
      case "skills":
        if (arg === "--verbose") {
          response.push({
            type: "output",
            text: `
Languages & Frontend:
  Next.js / React.js [██████████████████░░] 90%
  TypeScript / JS    [██████████████████░░] 90%
  HTML5 / CSS3       [████████████████████] 100%
  Tailwind / Framer  [██████████████████░░] 90%

Backend & Databases:
  Node.js / Express  [█████████████████░░░] 85%
  REST APIs / Auth   [██████████████████░░] 90%
  MongoDB / MySQL    [████████████████░░░░] 80%
  Spring Boot (Learn)[████████░░░░░░░░░░░░] 40%

Cloud, Deployment & Tools:
  Vercel / Hosting   [██████████████████░░] 90%
  AWS EC2 / Nginx    [██████████████░░░░░░] 70%
  Git / GitHub       [██████████████████░░] 90%
  Postman / Figma    [████████████████░░░░] 80%`
          });
        } else {
          response.push({ type: "output", text: "Try running: skills --verbose" });
        }
        break;
      case "github":
        response.push({ type: "output", text: "Opening GitHub Profile..." });
        window.open("https://github.com/Nadeem0105", "_blank");
        break;
      case "linkedin":
        response.push({ type: "output", text: "Opening LinkedIn Profile..." });
        window.open("https://www.linkedin.com/in/mdnadeem0108/", "_blank");
        break;
      case "matrix":
        response.push({ type: "output", text: "Initializing digital rain stream..." });
        setIsMatrixActive(true);
        break;
      case "banner":
        response.push({ type: "info", text: welcomeBanner });
        break;
      case "echo":
        response.push({ type: "output", text: arg });
        break;
      case "theme":
        if (arg === "light") {
          setIsLightTheme(true);
          response.push({ type: "output", text: "Terminal theme: light mode" });
        } else if (arg === "dark") {
          setIsLightTheme(false);
          response.push({ type: "output", text: "Terminal theme: dark mode" });
        } else {
          response.push({ type: "output", text: "Usage: theme [light|dark]" });
        }
        break;
      default:
        response.push({
          type: "error",
          text: `bash: ${cmd}: command not found. Type 'help' for available commands.`
        });
    }

    setOutput((prev) => [...prev, ...response]);
    setInputVal("");
  };

  // Keyboard shortcut handlers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocomplete
      const matches = availableCommands.filter((c) => c.startsWith(inputVal.toLowerCase()));
      if (matches.length === 1) {
        setInputVal(matches[0]);
      } else if (matches.length > 1) {
        setOutput((prev) => [
          ...prev,
          { type: "input", text: `[user@portfolio ~]$ ${inputVal}` },
          { type: "output", text: matches.join("    ") }
        ]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      if (historyIdx === history.length - 1) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 hover-trigger"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-4xl h-[65vh] rounded-lg border border-border-subtle shadow-2xl flex flex-col overflow-hidden relative ${
          isLightTheme ? "bg-cream text-obsidian" : "bg-[#0D1117] text-tertiary"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
      >
        {/* Matrix Canvas Overlay */}
        {isMatrixActive && (
          <div className="absolute inset-0 z-30 pointer-events-none bg-obsidian">
            <canvas ref={matrixCanvasRef} className="w-full h-full" />
          </div>
        )}

        {/* Header Bar */}
        <div className="bg-[#1A1A1E] px-4 py-2.5 flex items-center border-b border-border-subtle select-none">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-error-red flex items-center justify-center text-[8px] text-black hover:opacity-85 font-bold"
            >
              ×
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-primary" />
            <div className="w-3.5 h-3.5 rounded-full bg-tertiary" />
          </div>
          <span className="text-xs text-[#8A8A96] mx-auto font-mono font-medium">
            user@portfolioOS: ~
          </span>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className={`flex-1 p-5 overflow-y-auto font-mono text-sm leading-relaxed space-y-2 select-text ${
            isLightTheme ? "bg-cream text-obsidian" : "bg-[#0D1117] text-tertiary"
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {output.map((line, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap ${
                line.type === "error"
                  ? "text-error-red"
                  : line.type === "input"
                  ? "text-primary"
                  : line.type === "info"
                  ? "text-cream opacity-80"
                  : ""
              }`}
            >
              {line.text}
            </div>
          ))}

          {/* Active Command Prompt */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-tertiary shrink-0">[user@portfolio ~]$</span>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none caret-primary text-primary focus:ring-0 focus:outline-none p-0 font-mono text-sm"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
