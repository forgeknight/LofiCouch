import { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, Sparkles, Sofa } from 'lucide-react';
import { RainEffect } from './components/RainEffect';
import { ParticleEffect } from './components/ParticleEffect';
import { MusicPlayer } from './components/MusicPlayer';
import { Clock } from './components/Clock';
import { QuoteDisplay } from './components/QuoteDisplay';
import { TodoWidget } from './components/TodoWidget';
import { SceneSelector } from './components/SceneSelector';
import { ClockTimer } from './components/ClockTimer';
import { lofiEngine, TRACK_CONFIGS, type VibeId } from './lofiEngine';

// ── Scene configurations ──────────────────────────────────────────
interface SceneStyle {
  bg1: string; bg2: string; bg3: string;
  blob1: string; blob2: string; blob3: string;
  rain: boolean; rainIntensity: number; rainColor: string; rainWind: number;
  temp: string;
}

const sceneStyles: Record<VibeId, SceneStyle> = {
  midnight: {
    bg1: '#07071a', bg2: '#0f1035', bg3: '#15082e',
    blob1: 'rgba(99,102,241,0.06)', blob2: 'rgba(168,85,247,0.05)', blob3: 'rgba(59,130,246,0.04)',
    rain: true, rainIntensity: 60, rainColor: '150,170,220', rainWind: 0.8,
    temp: '14°C',
  },
  sunset: {
    bg1: '#1a0c03', bg2: '#2a1508', bg3: '#1a1005',
    blob1: 'rgba(245,158,11,0.06)', blob2: 'rgba(239,68,68,0.04)', blob3: 'rgba(251,191,36,0.05)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '26°C',
  },
  forest: {
    bg1: '#030a04', bg2: '#071a08', bg3: '#041005',
    blob1: 'rgba(16,185,129,0.05)', blob2: 'rgba(52,211,153,0.04)', blob3: 'rgba(110,231,183,0.03)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '16°C',
  },
  ocean: {
    bg1: '#020a18', bg2: '#041828', bg3: '#081020',
    blob1: 'rgba(6,182,212,0.05)', blob2: 'rgba(59,130,246,0.04)', blob3: 'rgba(14,165,233,0.04)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '20°C',
  },
  cafe: {
    bg1: '#100804', bg2: '#1c1008', bg3: '#160e06',
    blob1: 'rgba(217,119,6,0.06)', blob2: 'rgba(180,83,9,0.04)', blob3: 'rgba(245,158,11,0.04)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '22°C',
  },
  rain: {
    bg1: '#08090d', bg2: '#0e1018', bg3: '#0a0c12',
    blob1: 'rgba(100,116,139,0.05)', blob2: 'rgba(148,163,184,0.04)', blob3: 'rgba(71,85,105,0.04)',
    rain: true, rainIntensity: 80, rainColor: '160,180,210', rainWind: 1.2,
    temp: '11°C',
  },
  space: {
    bg1: '#050310', bg2: '#0a0520', bg3: '#08031a',
    blob1: 'rgba(139,92,246,0.06)', blob2: 'rgba(99,102,241,0.05)', blob3: 'rgba(192,132,252,0.04)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '-270°C',
  },
  sakura: {
    bg1: '#120810', bg2: '#1a0c18', bg3: '#0f060e',
    blob1: 'rgba(236,72,153,0.06)', blob2: 'rgba(244,114,182,0.05)', blob3: 'rgba(219,39,119,0.04)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '19°C',
  },
  nostalgic: {
    bg1: '#0d0a14', bg2: '#14101e', bg3: '#100c18',
    blob1: 'rgba(167,139,250,0.06)', blob2: 'rgba(196,181,253,0.04)', blob3: 'rgba(139,92,246,0.04)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '18°C',
  },
  nineties: {
    bg1: '#0f0808', bg2: '#1a0e0e', bg3: '#140a0a',
    blob1: 'rgba(239,68,68,0.06)', blob2: 'rgba(245,158,11,0.04)', blob3: 'rgba(234,88,12,0.04)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '24°C',
  },
  ghibli: {
    bg1: '#040e08', bg2: '#081a10', bg3: '#061408',
    blob1: 'rgba(52,211,153,0.06)', blob2: 'rgba(110,231,183,0.05)', blob3: 'rgba(167,243,208,0.04)',
    rain: false, rainIntensity: 0, rainColor: '', rainWind: 0,
    temp: '21°C',
  },
  library: {
    bg1: '#0a0908', bg2: '#12100e', bg3: '#0e0c0a',
    blob1: 'rgba(120,113,108,0.06)', blob2: 'rgba(168,162,158,0.04)', blob3: 'rgba(87,83,78,0.04)',
    rain: true, rainIntensity: 35, rainColor: '160,150,140', rainWind: 0.3,
    temp: '20°C',
  },
  train: {
    bg1: '#0a0510', bg2: '#10081a', bg3: '#0c0614',
    blob1: 'rgba(244,114,182,0.06)', blob2: 'rgba(251,146,60,0.04)', blob3: 'rgba(232,121,249,0.04)',
    rain: true, rainIntensity: 30, rainColor: '180,170,200', rainWind: 3,
    temp: '8°C',
  },
};

// ── SVG Scenes ──────────────────────────────────────────────
function SceneSVG({ vibe }: { vibe: VibeId }) {
  const baseClass = "absolute bottom-0 left-0 right-0 pointer-events-none transition-opacity duration-[3000ms]";

  if (vibe === 'midnight') {
    return (
      <div className={`${baseClass} h-48 sm:h-72 opacity-[0.18]`}>
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {[50,130,240,350,500,650,750,880,980,1080].map((x, i) => {
            const h = 100 + (i % 4) * 35;
            const w = 50 + (i % 3) * 15;
            return (
              <g key={i}>
                <rect x={x} y={300 - h} width={w} height={h} fill={`rgba(${70 + i * 5},${90 + i * 3},${150 + i * 5},0.3)`} rx="2" />
                {Array.from({ length: Math.floor(h / 25) }).map((_, j) =>
                  Array.from({ length: Math.floor(w / 18) }).map((_, k) => (
                    <rect key={`${j}-${k}`}
                      x={x + 6 + k * 16} y={300 - h + 10 + j * 22}
                      width="6" height="8"
                      fill={`rgba(255,200,100,${0.05 + (Math.sin(i + j + k) * 0.5 + 0.5) * 0.3})`} />
                  ))
                )}
              </g>
            );
          })}
          <circle cx="1050" cy="45" r="22" fill="rgba(255,240,200,0.12)" />
          <circle cx="1057" cy="40" r="19" fill="rgba(7,7,26,0.9)" />
        </svg>
      </div>
    );
  }

  if (vibe === 'sunset') {
    return (
      <div className={`${baseClass} h-56 sm:h-80 opacity-[0.22]`}>
        <svg viewBox="0 0 1200 320" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,120,30,0.2)" />
              <stop offset="100%" stopColor="rgba(255,60,20,0.05)" />
            </linearGradient>
          </defs>
          <circle cx="600" cy="120" r="55" fill="url(#sunGrad)" />
          <circle cx="600" cy="120" r="35" fill="rgba(255,180,60,0.1)" />
          <polygon points="0,320 250,130 500,320" fill="rgba(80,35,15,0.3)" />
          <polygon points="200,320 500,90 800,320" fill="rgba(100,45,20,0.25)" />
          <polygon points="550,320 800,110 1050,320" fill="rgba(90,40,18,0.28)" />
          <polygon points="850,320 1050,140 1200,320" fill="rgba(85,38,16,0.22)" />
        </svg>
      </div>
    );
  }

  if (vibe === 'forest') {
    return (
      <div className={`${baseClass} h-56 sm:h-80 opacity-[0.18]`}>
        <svg viewBox="0 0 1200 320" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {[60,160,280,400,520,640,760,880,1000,1100].map((x, i) => {
            const h = 80 + (i % 4) * 35;
            return (
              <g key={i}>
                <rect x={x - 4} y={320 - h + 50} width="8" height={h - 50} fill="rgba(35,70,35,0.3)" />
                <polygon points={`${x},${320 - h} ${x - 25 - (i % 2) * 12},${320 - h + 70} ${x + 25 + (i % 2) * 12},${320 - h + 70}`}
                  fill={`rgba(25,${65 + (i % 3) * 15},30,0.25)`} />
                <polygon points={`${x},${320 - h + 25} ${x - 20},${320 - h + 80} ${x + 20},${320 - h + 80}`}
                  fill={`rgba(20,${55 + (i % 3) * 12},25,0.2)`} />
              </g>
            );
          })}
          {[120,300,500,700,900,1050].map((cx, i) => (
            <circle key={i} cx={cx} cy={180 + (i % 3) * 30} r={1.5 + (i % 2)} fill="rgba(200,255,100,0.3)">
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>
    );
  }

  if (vibe === 'ocean') {
    return (
      <div className={`${baseClass} h-48 sm:h-72 opacity-[0.18]`}>
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <circle cx="600" cy="40" r="18" fill="rgba(180,200,255,0.1)" />
          {[0, 1, 2].map(i => (
            <path key={i}
              d={`M0,${200 + i * 25} Q${200 + i * 50},${185 + i * 20} ${400 + i * 30},${200 + i * 25} T${800 + i * 20},${200 + i * 25} T1200,${200 + i * 25} L1200,300 L0,300 Z`}
              fill={`rgba(${15 + i * 5},${50 + i * 15},${100 + i * 20},${0.15 + i * 0.05})`}>
              <animate attributeName="d"
                values={`M0,${200 + i * 25} Q${200 + i * 50},${185 + i * 20} ${400 + i * 30},${200 + i * 25} T${800 + i * 20},${200 + i * 25} T1200,${200 + i * 25} L1200,300 L0,300 Z;M0,${200 + i * 25} Q${200 + i * 50},${210 + i * 15} ${400 + i * 30},${195 + i * 20} T${800 + i * 20},${210 + i * 20} T1200,${195 + i * 25} L1200,300 L0,300 Z;M0,${200 + i * 25} Q${200 + i * 50},${185 + i * 20} ${400 + i * 30},${200 + i * 25} T${800 + i * 20},${200 + i * 25} T1200,${200 + i * 25} L1200,300 L0,300 Z`}
                dur={`${5 + i * 2}s`} repeatCount="indefinite" />
            </path>
          ))}
          {[80,200,340,480,620,760,900,1040].map((x, i) => (
            <circle key={i} cx={x} cy={15 + (i % 4) * 20} r={0.8 + (i % 2) * 0.5} fill="rgba(200,220,255,0.25)">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>
    );
  }

  if (vibe === 'cafe') {
    return (
      <div className={`${baseClass} h-48 sm:h-72 opacity-[0.18]`}>
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <rect x="250" y="40" width="700" height="260" rx="8" fill="none" stroke="rgba(180,140,80,0.12)" strokeWidth="3" />
          <line x1="600" y1="40" x2="600" y2="300" stroke="rgba(180,140,80,0.08)" strokeWidth="2" />
          <line x1="250" y1="170" x2="950" y2="170" stroke="rgba(180,140,80,0.08)" strokeWidth="2" />
          <rect x="550" y="250" width="50" height="45" rx="6" fill="rgba(180,140,80,0.12)" />
          <ellipse cx="575" cy="250" rx="28" ry="6" fill="rgba(180,140,80,0.08)" />
          <path d="M563,240 Q558,224 566,214" fill="none" stroke="rgba(200,180,150,0.08)" strokeWidth="2">
            <animate attributeName="d" values="M563,240 Q558,224 566,214;M563,240 Q568,222 560,210;M563,240 Q558,224 566,214" dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    );
  }

  if (vibe === 'rain') {
    return (
      <div className={`${baseClass} h-48 sm:h-72 opacity-[0.15]`}>
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {[200, 500, 800, 1000].map((x, i) => (
            <ellipse key={i} cx={x} cy={290} rx={40 + i * 10} ry={4} fill="rgba(120,150,200,0.08)">
              <animate attributeName="rx" values={`${38 + i * 10};${44 + i * 10};${38 + i * 10}`} dur={`${3 + i}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
          <rect x="100" y="160" width="120" height="140" rx="3" fill="rgba(60,70,90,0.2)" />
          <rect x="115" y="175" width="14" height="18" fill="rgba(255,200,100,0.1)" />
          <rect x="140" y="175" width="14" height="18" fill="rgba(255,200,100,0.15)" />
          <rect x="400" y="120" width="100" height="180" rx="3" fill="rgba(55,65,85,0.2)" />
          <rect x="700" y="140" width="90" height="160" rx="3" fill="rgba(50,60,80,0.2)" />
          <rect x="598" y="200" width="4" height="100" fill="rgba(100,100,100,0.15)" />
          <circle cx="600" cy="195" r="12" fill="rgba(255,220,150,0.06)" />
        </svg>
      </div>
    );
  }

  if (vibe === 'space') {
    return (
      <div className={`${baseClass} h-full opacity-[0.2]`}>
        <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 80 }).map((_, i) => (
            <circle key={i}
              cx={(i * 137.5 + 43) % 1200} cy={(i * 97.3 + 17) % 600}
              r={0.3 + (i % 5) * 0.25}
              fill={`rgba(${200 + (i % 55)},${200 + (i % 55)},255,${0.1 + (i % 3) * 0.1})`}>
              <animate attributeName="opacity"
                values={`${0.05 + (i % 3) * 0.05};${0.3 + (i % 3) * 0.1};${0.05 + (i % 3) * 0.05}`}
                dur={`${2 + (i % 5)}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <ellipse cx="400" cy="250" rx="200" ry="100" fill="rgba(139,92,246,0.03)" />
          <circle cx="900" cy="150" r="30" fill="rgba(139,92,246,0.08)" />
          <ellipse cx="900" cy="150" rx="50" ry="6" fill="none" stroke="rgba(192,132,252,0.06)" strokeWidth="2" transform="rotate(-15, 900, 150)" />
        </svg>
      </div>
    );
  }

  if (vibe === 'sakura') {
    return (
      <div className={`${baseClass} h-56 sm:h-80 opacity-[0.2]`}>
        <svg viewBox="0 0 1200 320" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {[150, 400, 700, 1000].map((x, i) => (
            <g key={i}>
              <rect x={x - 5} y={320 - 120 - i * 10} width="10" height={120 + i * 10} fill="rgba(100,60,50,0.2)" />
              {Array.from({ length: 3 }).map((_, j) => (
                <g key={j}>
                  <line x1={x} y1={320 - 100 - i * 10 - j * 25}
                    x2={x + (j % 2 === 0 ? 1 : -1) * (40 + j * 10)} y2={320 - 130 - i * 10 - j * 20}
                    stroke="rgba(100,60,50,0.15)" strokeWidth="3" />
                  <circle cx={x + (j % 2 === 0 ? 1 : -1) * (40 + j * 10)} cy={320 - 130 - i * 10 - j * 20}
                    r={20 + j * 5} fill="rgba(255,180,200,0.08)" />
                </g>
              ))}
              <ellipse cx={x} cy={320 - 140 - i * 10} rx={55 + i * 5} ry={35} fill="rgba(255,180,200,0.06)" />
            </g>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx={100 + i * 130} cy={80 + (i % 3) * 60} rx="4" ry="2"
              fill="rgba(255,180,200,0.15)" transform={`rotate(${i * 30}, ${100 + i * 130}, ${80 + (i % 3) * 60})`}>
              <animate attributeName="cy" values={`${80 + (i % 3) * 60};${280};${80 + (i % 3) * 60}`}
                dur={`${4 + i * 0.8}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
        </svg>
      </div>
    );
  }

  if (vibe === 'nostalgic') {
    return (
      <div className={`${baseClass} h-48 sm:h-72 opacity-[0.15]`}>
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {Array.from({ length: 40 }).map((_, i) => (
            <rect key={i} x="0" y={i * 7.5} width="1200" height="1" fill="rgba(255,255,255,0.015)" />
          ))}
          <rect x="350" y="80" width="500" height="200" rx="15" fill="rgba(80,60,100,0.1)" stroke="rgba(120,100,140,0.1)" strokeWidth="4" />
          <rect x="360" y="90" width="480" height="180" rx="6" fill="rgba(40,30,60,0.15)" />
          {[400, 450, 520, 600, 680, 750, 800].map((x, i) => (
            <circle key={i} cx={x} cy={120 + (i % 3) * 30} r={1 + (i % 2)} fill={`rgba(200,180,255,${0.1 + (i % 3) * 0.05})`}>
              <animate attributeName="opacity" values="0.05;0.2;0.05" dur={`${2 + i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <rect x="520" y="255" width="70" height="40" rx="4" fill="rgba(100,80,60,0.12)" />
          <circle cx="540" cy="275" r="8" fill="none" stroke="rgba(150,120,90,0.1)" strokeWidth="2" />
          <circle cx="570" cy="275" r="8" fill="none" stroke="rgba(150,120,90,0.1)" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (vibe === 'nineties') {
    return (
      <div className={`${baseClass} h-48 sm:h-72 opacity-[0.18]`}>
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <rect x="450" y="180" width="300" height="110" rx="10" fill="rgba(80,40,40,0.15)" />
          <circle cx="520" cy="235" r="30" fill="rgba(60,30,30,0.12)" stroke="rgba(100,50,50,0.08)" strokeWidth="3" />
          <circle cx="520" cy="235" r="15" fill="rgba(80,40,40,0.1)" />
          <circle cx="680" cy="235" r="30" fill="rgba(60,30,30,0.12)" stroke="rgba(100,50,50,0.08)" strokeWidth="3" />
          <circle cx="680" cy="235" r="15" fill="rgba(80,40,40,0.1)" />
          <rect x="560" y="205" width="80" height="25" rx="3" fill="rgba(40,20,20,0.12)" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={560 + i * 8} y={195 - (3 + (i % 4) * 4)} width="5" height={3 + (i % 4) * 4}
              fill={`rgba(255,${100 + (i % 3) * 50},${50 + (i % 2) * 50},0.1)`}>
              <animate attributeName="height" values={`${3 + (i % 4) * 4};${8 + (i % 3) * 5};${3 + (i % 4) * 4}`}
                dur={`${0.5 + i * 0.1}s`} repeatCount="indefinite" />
            </rect>
          ))}
          <circle cx="200" cy="250" r="25" fill="none" stroke="rgba(255,100,50,0.06)" strokeWidth="3" />
          <circle cx="1000" cy="230" r="20" fill="none" stroke="rgba(100,255,100,0.06)" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  if (vibe === 'ghibli') {
    return (
      <div className={`${baseClass} h-56 sm:h-80 opacity-[0.2]`}>
        <svg viewBox="0 0 1200 320" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <ellipse cx="300" cy="320" rx="400" ry="120" fill="rgba(40,100,50,0.15)" />
          <ellipse cx="800" cy="320" rx="500" ry="100" fill="rgba(35,90,45,0.12)" />
          <ellipse cx="600" cy="340" rx="700" ry="80" fill="rgba(30,80,40,0.18)" />
          <rect x="530" y="200" width="60" height="50" fill="rgba(120,80,50,0.1)" />
          <polygon points="525,200 560,170 595,200" fill="rgba(140,60,40,0.1)" />
          <rect x="550" y="220" width="12" height="15" fill="rgba(255,220,150,0.08)" />
          <rect x="575" y="175" width="8" height="20" fill="rgba(100,70,50,0.1)" />
          <circle cx="579" cy="168" r="5" fill="rgba(200,200,200,0.04)">
            <animate attributeName="cy" values="168;155;168" dur="4s" repeatCount="indefinite" />
          </circle>
          {[180, 320, 500, 750, 950, 1050].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={260 - (i % 3) * 15} r={3 + (i % 2) * 2} fill="rgba(200,255,220,0.06)">
                <animate attributeName="opacity" values="0.03;0.1;0.03" dur={`${3 + i * 0.7}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={x - 1} cy={259 - (i % 3) * 15} r="0.5" fill="rgba(255,255,255,0.08)" />
              <circle cx={x + 1} cy={259 - (i % 3) * 15} r="0.5" fill="rgba(255,255,255,0.08)" />
            </g>
          ))}
          {[150, 500, 900].map((x, i) => (
            <ellipse key={i} cx={x} cy={60 + i * 15} rx={50 + i * 10} ry={15} fill="rgba(255,255,255,0.03)">
              <animate attributeName="cx" values={`${x};${x + 20};${x}`} dur={`${15 + i * 5}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
        </svg>
      </div>
    );
  }

  if (vibe === 'library') {
    return (
      <div className={`${baseClass} h-48 sm:h-72 opacity-[0.15]`}>
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {[100, 350, 600, 850].map((x, i) => (
            <g key={i}>
              <rect x={x} y="80" width="200" height="220" fill="rgba(60,45,35,0.1)" rx="2" />
              {[130, 180, 230].map((sy, si) => (
                <g key={si}>
                  <rect x={x} y={sy} width="200" height="3" fill="rgba(90,70,50,0.1)" />
                  {Array.from({ length: 8 + (si % 3) }).map((_, bi) => {
                    const bw = 8 + (bi % 4) * 4;
                    const bx = x + 5 + bi * 22;
                    const bh = 35 + (bi % 3) * 8;
                    const colors = ['120,50,50', '50,80,120', '80,120,50', '120,100,50', '80,50,120', '50,100,80'];
                    return bx + bw < x + 200 ? (
                      <rect key={bi} x={bx} y={sy - bh} width={bw} height={bh}
                        fill={`rgba(${colors[bi % colors.length]},0.08)`} rx="1" />
                    ) : null;
                  })}
                </g>
              ))}
            </g>
          ))}
          <rect x="560" y="260" width="80" height="8" rx="2" fill="rgba(80,60,40,0.1)" />
          <rect x="597" y="230" width="6" height="30" fill="rgba(80,60,40,0.08)" />
          <ellipse cx="600" cy="228" rx="20" ry="8" fill="rgba(255,220,150,0.06)" />
          <circle cx="600" cy="260" r="60" fill="rgba(255,200,100,0.03)" />
        </svg>
      </div>
    );
  }

  if (vibe === 'train') {
    return (
      <div className={`${baseClass} h-56 sm:h-80 opacity-[0.18]`}>
        <svg viewBox="0 0 1200 320" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 97.3 + 30) % 1200} cy={(i * 43.7 + 10) % 150}
              r={0.5 + (i % 3) * 0.3} fill={`rgba(220,210,255,${0.08 + (i % 4) * 0.04})`}>
              <animate attributeName="opacity" values={`${0.04 + (i % 3) * 0.03};${0.15 + (i % 3) * 0.05};${0.04 + (i % 3) * 0.03}`}
                dur={`${2 + (i % 5)}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle cx="950" cy="60" r="25" fill="rgba(255,240,210,0.08)" />
          <circle cx="958" cy="55" r="22" fill="rgba(10,5,20,0.9)" />
          <polygon points="0,280 200,220 400,260 600,200 800,250 1000,210 1200,240 1200,320 0,320"
            fill="rgba(20,15,30,0.2)" />
          <rect x="150" y="180" width="900" height="130" rx="5" fill="rgba(40,30,50,0.1)"
            stroke="rgba(80,60,100,0.08)" strokeWidth="3" />
          <line x1="450" y1="180" x2="450" y2="310" stroke="rgba(80,60,100,0.06)" strokeWidth="3" />
          <line x1="750" y1="180" x2="750" y2="310" stroke="rgba(80,60,100,0.06)" strokeWidth="3" />
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx={180 + i * 75} cy={200 + (i % 4) * 25} r={1.5 + (i % 2)}
              fill="rgba(180,190,220,0.06)">
              <animate attributeName="cy" values={`${200 + (i % 4) * 25};${300};${200 + (i % 4) * 25}`}
                dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[300, 550, 850].map((x, i) => (
            <circle key={i} cx={x} cy={230 + i * 5} r={2} fill="rgba(255,200,100,0.08)">
              <animate attributeName="opacity" values="0.03;0.1;0.03" dur={`${4 + i * 2}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>
    );
  }

  return null;
}

// ── Breathing Circle ──────────────────────────────────────────────
function BreathingCircle({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-12 h-12 sm:w-16 sm:h-16">
        <div className="absolute inset-0 rounded-full animate-breathe"
          style={{ background: `radial-gradient(circle, ${color}15, transparent 70%)` }} />
        <div className="absolute inset-2 rounded-full animate-breathe-delay"
          style={{ background: `radial-gradient(circle, ${color}10, transparent 70%)` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white/15" />
        </div>
      </div>
      <p className="text-white/10 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: 'Nunito, sans-serif' }}>
        breathe
      </p>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────
export function App() {
  const [vibe, setVibe] = useState<VibeId>('midnight');
  const [loaded, setLoaded] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [prevBg, setPrevBg] = useState<SceneStyle>(sceneStyles.midnight);
  const [currentBg, setCurrentBg] = useState<SceneStyle>(sceneStyles.midnight);
  const [bgTransition, setBgTransition] = useState(1);
  const prevVibeRef = useRef<VibeId>('midnight');

  const config = TRACK_CONFIGS[vibe];

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    setTimeout(() => setShowGreeting(false), 3500);
  }, []);

  const handleVibeChange = useCallback((newVibe: VibeId) => {
    if (newVibe === vibe) return;

    setPrevBg(sceneStyles[vibe]);
    setCurrentBg(sceneStyles[newVibe]);
    setBgTransition(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBgTransition(1);
      });
    });

    prevVibeRef.current = vibe;
    setVibe(newVibe);

    if (lofiEngine.getIsPlaying()) {
      lofiEngine.switchVibe(newVibe);
    } else {
      lofiEngine.switchVibe(newVibe);
    }
  }, [vibe]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return { text: 'Late night vibes', emoji: '🌙' };
    if (hour < 12) return { text: 'Good morning', emoji: '☀️' };
    if (hour < 17) return { text: 'Good afternoon', emoji: '🌤️' };
    if (hour < 21) return { text: 'Good evening', emoji: '🌅' };
    return { text: 'Night owl hours', emoji: '🦉' };
  };

  const greeting = getGreeting();
  const style = sceneStyles[vibe];

  return (
    <div className="min-h-screen min-h-[100dvh] relative overflow-hidden">
      {/* Layered background with transition */}
      <div className="absolute inset-0 transition-none"
        style={{ background: `linear-gradient(135deg, ${prevBg.bg1}, ${prevBg.bg2}, ${prevBg.bg3})` }} />
      <div className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${currentBg.bg1}, ${currentBg.bg2}, ${currentBg.bg3})`,
          opacity: bgTransition,
          transition: 'opacity 3s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />

      {/* Ambient blobs - smaller on mobile */}
      <div className="absolute top-1/4 -left-16 sm:-left-32 w-64 sm:w-[500px] h-64 sm:h-[500px] rounded-full blur-[60px] sm:blur-[100px] animate-blob transition-colors duration-[3000ms]"
        style={{ backgroundColor: style.blob1 }} />
      <div className="absolute top-3/4 -right-16 sm:-right-32 w-48 sm:w-[400px] h-48 sm:h-[400px] rounded-full blur-[50px] sm:blur-[80px] animate-blob animation-delay-2000 transition-colors duration-[3000ms]"
        style={{ backgroundColor: style.blob2 }} />
      <div className="absolute top-1/2 left-1/3 w-40 sm:w-[300px] h-40 sm:h-[300px] rounded-full blur-[45px] sm:blur-[70px] animate-blob animation-delay-4000 transition-colors duration-[3000ms]"
        style={{ backgroundColor: style.blob3 }} />

      {/* Scene SVG */}
      <SceneSVG vibe={vibe} />

      {/* Effects */}
      {style.rain && (
        <RainEffect intensity={style.rainIntensity} color={style.rainColor} windAngle={style.rainWind} />
      )}
      <ParticleEffect vibe={vibe} />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* VHS overlay for nostalgic vibe */}
      {vibe === 'nostalgic' && (
        <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }} />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-20"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />

      {/* Greeting overlay */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md
        transition-all duration-[1500ms] pointer-events-none px-6
        ${showGreeting ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`text-center transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sofa className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400/50" />
          </div>
          <h1 className="text-white/80 tracking-wider text-2xl sm:text-4xl" style={{ fontFamily: 'Caveat, cursive' }}>
            {greeting.text} {greeting.emoji}
          </h1>
          <p className="text-white/25 mt-2 text-xs sm:text-sm tracking-[0.15em]" style={{ fontFamily: 'Nunito, sans-serif' }}>
            welcome to LofiCouch — sink in, zone out
          </p>
          <p className="text-white/10 mt-1 text-[9px] sm:text-[10px] tracking-[0.2em]" style={{ fontFamily: 'Space Mono, monospace' }}>
            13 vibes • ambient sounds • infinite chill
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-30 min-h-screen min-h-[100dvh] flex flex-col transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Header */}
        <header className="flex items-center justify-between p-3 sm:p-4 md:p-5 safe-top">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-xl border transition-colors duration-1000"
              style={{
                backgroundColor: `${config.color}15`,
                borderColor: `${config.color}15`,
              }}>
              <Sofa className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-1000" style={{ color: `${config.color}aa` }} />
            </div>
            <div>
              <span className="text-white/50 text-xs sm:text-sm font-bold tracking-[0.15em] block leading-none"
                style={{ fontFamily: 'Space Mono, monospace' }}>
                LofiCouch
              </span>
              <span className="text-white/15 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase hidden sm:block"
                style={{ fontFamily: 'Nunito, sans-serif' }}>
                sink in, zone out
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
              <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: config.color }} />
              <span className="text-white/25 text-[9px] sm:text-[10px] tracking-wider" style={{ fontFamily: 'Space Mono, monospace' }}>
                {style.temp}
              </span>
            </div>
          </div>
        </header>

        {/* Center content */}
        <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 gap-4 sm:gap-6 md:gap-8 py-4">
          <BreathingCircle color={config.color} />
          
          <Clock />

          <div className="w-full max-w-sm sm:max-w-md">
            <MusicPlayer currentVibe={vibe} onVibeChange={handleVibeChange} />
          </div>

          <div className="hidden sm:block">
            <QuoteDisplay />
          </div>
        </main>

        {/* Footer toolbar */}
        <footer className="p-3 sm:p-4 md:p-5 safe-bottom">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <TodoWidget />
              <ClockTimer accentColor={config.color} />
              <SceneSelector currentScene={vibe} onSceneChange={handleVibeChange} />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-white/10 text-[9px] sm:text-[10px] tracking-wider hidden sm:block" style={{ fontFamily: 'Nunito, sans-serif' }}>
                made with
              </span>
              <Heart className="w-3 h-3 text-pink-400/20" fill="rgba(244,114,182,0.2)" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
