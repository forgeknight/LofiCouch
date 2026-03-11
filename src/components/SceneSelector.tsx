import { useState, useRef, useEffect } from 'react';
import type { VibeId } from '../lofiEngine';
import { TRACK_CONFIGS } from '../lofiEngine';

interface SceneSelectorProps {
  currentScene: VibeId;
  onSceneChange: (scene: VibeId) => void;
}

const scenes: { id: VibeId; emoji: string; label: string }[] = [
  { id: 'midnight', emoji: '🌃', label: 'Midnight City' },
  { id: 'sunset', emoji: '🌅', label: 'Golden Hour' },
  { id: 'forest', emoji: '🌲', label: 'Enchanted Forest' },
  { id: 'ocean', emoji: '🌊', label: 'Deep Ocean' },
  { id: 'cafe', emoji: '☕', label: 'Cozy Café' },
  { id: 'rain', emoji: '🌧️', label: 'Rainy Window' },
  { id: 'space', emoji: '🌌', label: 'Cosmic Drift' },
  { id: 'sakura', emoji: '🌸', label: 'Cherry Blossom' },
  { id: 'nostalgic', emoji: '📼', label: 'Faded Memories' },
  { id: 'nineties', emoji: '📻', label: '90\'s Boom Bap' },
  { id: 'ghibli', emoji: '🏯', label: 'Spirit Garden' },
  { id: 'library', emoji: '📚', label: 'Quiet Library' },
  { id: 'train', emoji: '🚂', label: 'Starlit Express' },
];

const ambienceIcons: Record<string, string> = {
  rain: '🌧', heavyrain: '⛈', lightrain: '🌦', thunder: '⚡',
  wind: '💨', fire: '🔥', birds: '🐦', waves: '🌊',
  cafechatter: '👥', trainrumble: '🚃', vhsstatic: '📺',
  crickets: '🦗', chimes: '🔔', stream: '💧', nightbugs: '🪲',
};

export function SceneSelector({ currentScene, onSceneChange }: SceneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentConfig = TRACK_CONFIGS[currentScene];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] 
          rounded-2xl px-4 py-2.5 hover:bg-white/[0.08] transition-all duration-500 group"
      >
        <span className="text-lg">{scenes.find(s => s.id === currentScene)?.emoji}</span>
        <span className="text-white/40 text-xs font-medium tracking-wider hidden sm:block"
          style={{ fontFamily: 'Nunito, sans-serif' }}>
          {scenes.find(s => s.id === currentScene)?.label}
        </span>
        <svg className={`w-3 h-3 text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`absolute bottom-14 left-0 sm:left-auto sm:right-0 w-[340px] backdrop-blur-2xl bg-black/70 
        border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden
        transition-all duration-500 origin-bottom
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}>
        
        <div className="p-4 max-h-[420px] overflow-y-auto custom-scrollbar">
          <p className="text-white/30 text-[10px] mb-3 tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: 'Nunito, sans-serif' }}>
            Choose your vibe — {scenes.length} scenes
          </p>
          
          <div className="grid grid-cols-2 gap-1.5">
            {scenes.map(scene => {
              const config = TRACK_CONFIGS[scene.id];
              const isActive = currentScene === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    onSceneChange(scene.id);
                    setIsOpen(false);
                  }}
                  className={`relative flex items-start gap-2.5 p-2.5 rounded-xl transition-all duration-500 text-left group/item overflow-hidden
                    ${isActive
                      ? 'bg-white/[0.08] ring-1 ring-white/10'
                      : 'hover:bg-white/[0.04]'
                    }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 opacity-20 rounded-xl"
                      style={{ background: `radial-gradient(circle at 30% 50%, ${config.color}40, transparent 70%)` }} />
                  )}
                  
                  <span className="text-lg relative z-10 mt-0.5">{scene.emoji}</span>
                  <div className="relative z-10 min-w-0 flex-1">
                    <p className={`text-[11px] font-semibold truncate transition-colors duration-300
                      ${isActive ? 'text-white/90' : 'text-white/50 group-hover/item:text-white/70'}`}
                      style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {scene.label}
                    </p>
                    <p className={`text-[9px] mt-0.5 truncate transition-colors duration-300
                      ${isActive ? 'text-white/40' : 'text-white/20'}`}
                      style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {config.name} • {config.bpm}bpm
                    </p>
                    {/* Ambience icons */}
                    <div className="flex gap-0.5 mt-1">
                      {config.ambience.map((a, i) => (
                        <span key={i} className="text-[8px] opacity-50" title={a.type}>
                          {ambienceIcons[a.type] || '🔊'}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: config.color }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current track info */}
        <div className="px-4 pb-3 pt-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: currentConfig.color }} />
            <p className="text-white/25 text-[10px] tracking-wider" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Now: <span className="text-white/40">{currentConfig.name}</span>
              <span className="text-white/15 ml-1">• {currentConfig.bpm}bpm</span>
              <span className="text-white/15 ml-1">
                • {currentConfig.ambience.map(a => ambienceIcons[a.type]).join('')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
