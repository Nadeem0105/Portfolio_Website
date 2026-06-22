"use client";

import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      ox: number; // original velocity x
      oy: number; // original velocity y
      radius: number;
    }> = [];
    
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(80, Math.floor((width * height) / 15000)); // Dynamic count based on size
      for (let i = 0; i < count; i++) {
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          ox: vx,
          oy: vy,
          radius: 1.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and Draw Particles
      particles.forEach((p) => {
        // Mouse interaction (Repulsion)
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 100;

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          // Calculate repel vector
          const rx = dx / dist;
          const ry = dy / dist;
          
          // Gently push particle away from cursor
          p.x += rx * force * 1.5;
          p.y += ry * force * 1.5;
          
          // Dampen velocity to prevent flying off
          p.vx += rx * force * 0.05;
          p.vy += ry * force * 0.05;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.5) {
            p.vx = (p.vx / speed) * 1.5;
            p.vy = (p.vy / speed) * 1.5;
          }
        } else {
          // Return velocity to original slowly
          p.vx += (p.ox - p.vx) * 0.02;
          p.vy += (p.oy - p.vy) * 0.02;
        }

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
          p.ox *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
          p.ox *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
          p.oy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
          p.oy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 150, 26, 0.35)"; // Gold particle
        ctx.fill();
      });

      // Draw Connection Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const limit = 120;

          if (dist < limit) {
            const alpha = 0.08 * (1 - dist / limit);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 150, 26, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
      canvas?.removeEventListener("mousemove", onMouseMove);
      canvas?.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 opacity-50 pointer-events-none"
    />
  );
}
