"use client";

import { useEffect, useRef } from "react";

interface ParticleTextProps {
  text: string;
  className?: string;
}

class Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  spring: number;
  friction: number;
  noiseSpeedX: number;
  noiseSpeedY: number;
  phaseX: number;
  phaseY: number;
  ambientAmp: number;

  constructor(x: number, y: number) {
    this.originX = x;
    this.originY = y;
    this.x = x + (Math.random() - 0.5) * 12;
    this.y = y + (Math.random() - 0.5) * 12;
    this.vx = 0;
    this.vy = 0;
    this.radius = Math.random() * 0.7 + 0.65;
    this.alpha = Number((Math.random() * 0.35 + 0.65).toFixed(2));
    this.color = `rgba(255, 255, 255, ${this.alpha})`;
    this.spring = 0.055 + Math.random() * 0.02;
    this.friction = 0.84;
    this.noiseSpeedX = 0.0012 + Math.random() * 0.001;
    this.noiseSpeedY = 0.0016 + Math.random() * 0.001;
    this.phaseX = Math.random() * Math.PI * 2;
    this.phaseY = Math.random() * Math.PI * 2;
    this.ambientAmp = 0.7 + Math.random() * 0.6;
  }

  update(
    time: number,
    mouse: { x: number; y: number; radius: number },
  ) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist < mouse.radius && dist > 0) {
      const force = Math.pow(1 - dist / mouse.radius, 2);
      const angle = Math.atan2(dy, dx);
      this.vx -= Math.cos(angle) * force * 11;
      this.vy -= Math.sin(angle) * force * 11;
    }

    this.vx += (this.originX - this.x) * this.spring;
    this.vy += (this.originY - this.y) * this.spring;
    this.vx *= this.friction;
    this.vy *= this.friction;

    const waveX =
      Math.sin(time * this.noiseSpeedX + this.phaseX) * this.ambientAmp;
    const waveY =
      Math.cos(time * this.noiseSpeedY + this.phaseY) * this.ambientAmp;

    this.x += this.vx + waveX * 0.08;
    this.y += this.vy + waveY * 0.08;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default function ParticleText({ text, className }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, radius: 68 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    let animationId: number;

    const mouse = mouseRef.current;

    function initParticles() {
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const headlineEl = canvas!.closest("h1");
      const fontSize = headlineEl
        ? parseFloat(window.getComputedStyle(headlineEl).fontSize) || 64
        : 64;
      const font = `600 ${fontSize}px "Plus Jakarta Sans", -apple-system, sans-serif`;

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;
      offCtx.font = font;
      const textWidth = Math.ceil(offCtx.measureText(text).width);
      const textHeight = Math.ceil(fontSize * 1.22);

      const paddingX = 14;
      const totalWidth = textWidth + paddingX * 2;
      const totalHeight = textHeight;

      offscreen.width = totalWidth;
      offscreen.height = totalHeight;

      offCtx.font = font;
      offCtx.fillStyle = "#ffffff";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text, paddingX, totalHeight / 2);

      canvas!.width = Math.round(totalWidth * dpr);
      canvas!.height = Math.round(totalHeight * dpr);
      canvas!.style.width = totalWidth + "px";
      canvas!.style.height = totalHeight + "px";

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      const imgData = offCtx.getImageData(0, 0, totalWidth, totalHeight).data;
      particles = [];

      const step = 2.4;

      for (let y = 0; y < totalHeight; y += step) {
        for (let x = 0; x < totalWidth; x += step) {
          const px = Math.floor(x);
          const py = Math.floor(y);
          const alpha = imgData[(py * totalWidth + px) * 4 + 3];

          if (alpha > 80) {
            const jitterX = (Math.random() - 0.5) * 0.7;
            const jitterY = (Math.random() - 0.5) * 0.7;
            particles.push(new Particle(x + jitterX, y + jitterY));
          }
        }
      }
    }

    function animate(currentTime: number) {
      const logicalWidth = canvas!.width / dpr;
      const logicalHeight = canvas!.height / dpr;
      ctx!.clearRect(0, 0, logicalWidth, logicalHeight);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(currentTime, mouse);
        particles[i].draw(ctx!);
      }

      animationId = requestAnimationFrame(animate);
    }

    function updateMouse(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    }

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0)
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchend", onTouchEnd);

    initParticles();
    animationId = requestAnimationFrame(animate);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        initParticles();
      });
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initParticles, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [text]);

  return (
    <span className={`inline-block relative cursor-crosshair align-baseline ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        className="inline-block align-[-0.12em]"
        style={{ imageRendering: "-webkit-optimize-contrast" }}
      />
    </span>
  );
}
