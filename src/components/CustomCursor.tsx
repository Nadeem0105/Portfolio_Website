"use client";

import { useRef, useEffect, useState, HTMLAttributes } from "react";

interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
}

interface ComponentProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

export default function CustomCursor({
  config = {},
  className,
  ...rest
}: ComponentProps) {
  const [isMobile, setIsMobile] = useState(true);

  // Default configuration optimized for the website's dark amber/gold styling
  const spotlightConfig = {
    radius: 200,
    brightness: 0.15,
    color: "#D4961A", // Brand primary gold color
    smoothing: 0.1,
    ...config,
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
      
      // Ensure the default system cursor is visible for precise interaction
      document.body.style.cursor = "auto";
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;

    let currentRadius = spotlightConfig.radius;
    let currentBrightness = spotlightConfig.brightness;
    let targetRadius = spotlightConfig.radius;
    let targetBrightness = spotlightConfig.brightness;

    let isLoopRunning = false;

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      startLoop();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      startLoop();
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      startLoop();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect if hovering over interactive elements to expand/intensify spotlight
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest(".hover-trigger");

      if (isInteractive) {
        targetRadius = spotlightConfig.radius * 1.5;
        targetBrightness = spotlightConfig.brightness * 1.8;
      } else {
        targetRadius = spotlightConfig.radius;
        targetBrightness = spotlightConfig.brightness;
      }
      startLoop();
    };

    const hexToRgb = (hex: string) => {
      let cleanHex = hex.replace("#", "");
      if (cleanHex.length === 3) {
        cleanHex = cleanHex.split("").map((char) => char + char).join("");
      }
      const bigint = parseInt(cleanHex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let needsMoreFrames = false;

      if (mouseX !== -1000 && mouseY !== -1000) {
        // Interpolate values for smooth transitions
        const deltaRadius = targetRadius - currentRadius;
        const deltaBrightness = targetBrightness - currentBrightness;

        currentRadius += deltaRadius * spotlightConfig.smoothing;
        currentBrightness += deltaBrightness * spotlightConfig.smoothing;

        if (Math.abs(deltaRadius) > 0.1 || Math.abs(deltaBrightness) > 0.001) {
          needsMoreFrames = true;
        }

        if (mouseX !== lastMouseX || mouseY !== lastMouseY) {
          needsMoreFrames = true;
          lastMouseX = mouseX;
          lastMouseY = mouseY;
        }

        const gradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          currentRadius
        );
        const rgbColor = hexToRgb(spotlightConfig.color);
        gradient.addColorStop(0, `rgba(${rgbColor}, ${currentBrightness})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (lastMouseX !== -1000 || lastMouseY !== -1000) {
          needsMoreFrames = false;
          lastMouseX = -1000;
          lastMouseY = -1000;
        }
      }

      if (needsMoreFrames) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        isLoopRunning = false;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, spotlightConfig.radius, spotlightConfig.brightness, spotlightConfig.color, spotlightConfig.smoothing]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className || ""}`}
      {...rest}
    />
  );
}
