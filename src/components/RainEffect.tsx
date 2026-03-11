import { useEffect, useRef } from 'react';

interface RainEffectProps {
  intensity?: number;
  color?: string;
  windAngle?: number;
}

export function RainEffect({ intensity = 80, color = '180, 200, 220', windAngle = 0 }: RainEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const drops: { x: number; y: number; speed: number; length: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < intensity; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 3,
        length: 8 + Math.random() * 18,
        opacity: 0.03 + Math.random() * 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + windAngle, drop.y + drop.length);
        ctx.strokeStyle = `rgba(${color}, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;
        drop.x += windAngle * 0.05;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x > canvas.width) drop.x = 0;
        if (drop.x < 0) drop.x = canvas.width;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity, color, windAngle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-[2000ms]"
      style={{ opacity: 0.5 }}
    />
  );
}
