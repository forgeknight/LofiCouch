import { useState, useRef, useEffect } from 'react';
import { X, Palette } from 'lucide-react';
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
          rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/[0.08] transition-all duration-500 group"
      >
        <span className="text-base sm:text-lg">{scenes.find(s => s.id === currentScene)?.emoji}</span>
        <span className="text-white/40 text-xs font-medium tracking-wider hidden md:block"
          style={{ fontFamily: 'Nunito, sans-serif' }}>
          {scenes.find(s => s.id === currentScene)?.label}
        </span>
        <svg className={`w-3 h-3 text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mobile: Full screen modal, Desktop/Tablet: Popup */}
      <div className={`
        fixed sm:absolute inset-0 sm:inset-auto sm:bottom-14 sm:left-0 md:left-auto md:right-0
        w-full sm:w-[340px] md:w-[380px]
        h-full sm:h-auto
        backdrop-blur-2xl bg-black/90 sm:bg-black/70 
        sm:border sm:border-white/[0.08] sm:rounded-2xl 
        shadow-2xl z-50 overflow-hidden
        flex flex-col
        transition-all duration-500 origin-bottom
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}
      `}>
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 sm:hidden border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-white/40" />
            <span className="text-white/50 text-sm font-medium tracking-wider">Choose Vibe</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 p-4 sm:p-4 overflow-y-auto custom-scrollbar">
          <p className="text-white/30 text-[11px] sm:text-[10px] mb-4 sm:mb-3 tracking-[0.25em] uppercase font-semibold hidden sm:block"
            style={{ fontFamily: 'Nunito, sans-serif' }}>
            Choose your vibe — {scenes.length} scenes
          </p>
          
          {/* Mobile: Single column, Tablet/Desktop: Two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-1.5">
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
                  className={`relative flex items-center sm:items-start gap-4 sm:gap-2.5 p-4 sm:p-3 rounded-xl sm:rounded-lg transition-all duration-500 text-left group/item overflow-hidden active:scale-[0.98]
                    ${isActive
                      ? 'bg-white/[0.1] sm:bg-white/[0.08] ring-1 ring-white/15 sm:ring-white/10'
                      : 'bg-white/[0.03] sm:bg-transparent hover:bg-white/[0.06] sm:hover:bg-white/[0.04]'
                    }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 opacity-25 sm:opacity-20 rounded-xl sm:rounded-lg"
                      style={{ background: `radial-gradient(circle at 30% 50%, ${config.color}40, transparent 70%)` }} />
                  )}
                  
                  <span className="text-2xl sm:text-lg relative z-10 sm:mt-0.5">{scene.emoji}</span>
                  <div className="relative z-10 min-w-0 flex-1">
                    <p className={`text-sm sm:text-[11px] font-semibold truncate transition-colors duration-300
                      ${isActive ? 'text-white/90' : 'text-white/60 sm:text-white/50 group-hover/item:text-white/70'}`}
                      style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {scene.label}
                    </p>
                    <p className={`text-xs sm:text-[9px] mt-0.5 truncate transition-colors duration-300
                      ${isActive ? 'text-white/50 sm:text-white/40' : 'text-white/30 sm:text-white/20'}`}
                      style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {config.name} • {config.bpm}bpm
                    </p>
                    {/* Ambience icons */}
                    <div className="flex gap-1 sm:gap-0.5 mt-1.5 sm:mt-1">
                      {config.ambience.map((a, i) => (
                        <span key={i} className="text-sm sm:text-[8px] opacity-60 sm:opacity-50" title={a.type}>
                          {ambienceIcons[a.type] || '🔊'}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="absolute top-3 sm:top-2 right-3 sm:right-2 w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: config.color }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current track info */}
        <div className="px-4 py-3 sm:pb-3 sm:pt-2 border-t border-white/[0.06] sm:border-white/[0.04] bg-black/20 sm:bg-transparent">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse" style={{ backgroundColor: currentConfig.color }} />
            <p className="text-white/30 sm:text-white/25 text-xs sm:text-[10px] tracking-wider" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Now: <span className="text-white/50 sm:text-white/40">{currentConfig.name}</span>
              <span className="text-white/20 sm:text-white/15 ml-1">• {currentConfig.bpm}bpm</span>
              <span className="text-white/20 sm:text-white/15 ml-1">
                • {currentConfig.ambience.map(a => ambienceIcons[a.type]).join('')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
