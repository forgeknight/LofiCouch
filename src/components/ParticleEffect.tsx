import { useEffect, useRef } from 'react';
import type { VibeId } from '../lofiEngine';

interface ParticleEffectProps {
  vibe: VibeId;
}

const vibeParticles: Record<VibeId, {
  count: number;
  colors: string[];
  speed: number;
  size: [number, number];
  glow: number;
}> = {
  midnight: {
    count: 35,
    colors: ['180,180,255', '255,200,100', '200,160,255'],
    speed: 0.3,
    size: [1, 3],
    glow: 3,
  },
  sunset: {
    count: 30,
    colors: ['255,180,60', '255,140,40', '255,220,120', '255,100,60'],
    speed: 0.2,
    size: [1.5, 4],
    glow: 4,
  },
  forest: {
    count: 45,
    colors: ['200,255,100', '150,255,80', '100,255,150', '255,255,180'],
    speed: 0.15,
    size: [1, 2.5],
    glow: 5,
  },
  ocean: {
    count: 20,
    colors: ['100,200,255', '150,220,255', '80,180,255'],
    speed: 0.1,
    size: [1, 2],
    glow: 4,
  },
  cafe: {
    count: 15,
    colors: ['255,200,100', '255,180,80', '200,150,100'],
    speed: 0.25,
    size: [1, 2],
    glow: 3,
  },
  rain: {
    count: 20,
    colors: ['180,200,220', '150,170,200', '200,210,230'],
    speed: 0.15,
    size: [1, 2],
    glow: 2,
  },
  space: {
    count: 60,
    colors: ['200,180,255', '255,200,255', '150,200,255', '255,255,200'],
    speed: 0.08,
    size: [0.5, 2.5],
    glow: 6,
  },
  sakura: {
    count: 40,
    colors: ['255,180,200', '255,200,220', '255,160,180', '255,220,230'],
    speed: 0.35,
    size: [2, 5],
    glow: 3,
  },
  nostalgic: {
    count: 25,
    colors: ['200,180,255', '255,200,180', '180,160,220', '220,200,160'],
    speed: 0.12,
    size: [1, 3],
    glow: 4,
  },
  nineties: {
    count: 20,
    colors: ['255,100,100', '255,200,50', '100,255,100', '100,150,255'],
    speed: 0.3,
    size: [1.5, 3],
    glow: 3,
  },
  ghibli: {
    count: 50,
    colors: ['180,255,200', '255,255,180', '200,240,255', '255,220,200'],
    speed: 0.15,
    size: [1, 3],
    glow: 5,
  },
  library: {
    count: 15,
    colors: ['255,220,180', '200,180,160', '180,160,140'],
    speed: 0.08,
    size: [1, 2],
    glow: 3,
  },
  train: {
    count: 30,
    colors: ['255,200,220', '255,180,200', '220,200,255', '255,230,200'],
    speed: 0.2,
    size: [1, 2.5],
    glow: 4,
  },
};

export function ParticleEffect({ vibe }: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vibeRef = useRef(vibe);

  useEffect(() => {
    vibeRef.current = vibe;
  }, [vibe]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    interface Particle {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; fadeSpeed: number;
      color: string; wobble: number;
    }

    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createParticles = () => {
      const cfg = vibeParticles[vibeRef.current];
      particles = [];
      for (let i = 0; i < cfg.count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]),
          speedX: (Math.random() - 0.5) * cfg.speed,
          speedY: -0.05 - Math.random() * cfg.speed,
          opacity: Math.random() * 0.5,
          fadeSpeed: 0.001 + Math.random() * 0.003,
          color: cfg.colors[Math.floor(Math.random() * cfg.colors.length)],
          wobble: Math.random() * Math.PI * 2,
        });
      }
    };

    createParticles();

    let lastVibe = vibeRef.current;

    const animate = () => {
      if (vibeRef.current !== lastVibe) {
        lastVibe = vibeRef.current;
        createParticles();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cfg = vibeParticles[vibeRef.current];

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * cfg.glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity * 0.15})`;
        ctx.fill();

        // Sakura petals
        if (vibeRef.current === 'sakura' && p.size > 3) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.wobble);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.opacity * 0.4})`;
          ctx.fill();
          ctx.restore();
          p.wobble += 0.02;
        }

        // Ghibli kodama-like glow
        if (vibeRef.current === 'ghibli' && p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255, ${p.opacity * 0.6})`;
          ctx.fill();
        }

        // Nostalgic film grain dust
        if (vibeRef.current === 'nostalgic' && Math.random() > 0.97) {
          ctx.beginPath();
          ctx.arc(p.x + (Math.random() - 0.5) * 20, p.y + (Math.random() - 0.5) * 20, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255, 0.15)`;
          ctx.fill();
        }

        p.x += p.speedX + Math.sin(p.wobble) * 0.1;
        p.y += p.speedY;
        p.wobble += 0.01;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.6) p.fadeSpeed = -Math.abs(p.fadeSpeed);
        if (p.opacity < 0.05) p.fadeSpeed = Math.abs(p.fadeSpeed);

        if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}
