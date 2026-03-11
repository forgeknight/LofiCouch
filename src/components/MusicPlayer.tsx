import { useState, useCallback, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Volume1, SkipForward, SkipBack, Wind } from 'lucide-react';
import { lofiEngine, TRACK_CONFIGS, type VibeId } from '../lofiEngine';

const vibeOrder: VibeId[] = [
  'midnight', 'sunset', 'forest', 'ocean', 'cafe', 'rain',
  'space', 'sakura', 'nostalgic', 'nineties', 'ghibli', 'library', 'train'
];

const ambienceLabels: Record<string, string> = {
  rain: 'Rain', heavyrain: 'Heavy Rain', lightrain: 'Light Rain', thunder: 'Thunder',
  wind: 'Wind', fire: 'Fireplace', birds: 'Birds', waves: 'Ocean Waves',
  cafechatter: 'Café Chatter', trainrumble: 'Train', vhsstatic: 'VHS Static',
  crickets: 'Crickets', chimes: 'Chimes', stream: 'Stream', nightbugs: 'Night Bugs',
};

const ambienceEmojis: Record<string, string> = {
  rain: '🌧', heavyrain: '⛈', lightrain: '🌦', thunder: '⚡',
  wind: '💨', fire: '🔥', birds: '🐦', waves: '🌊',
  cafechatter: '👥', trainrumble: '🚃', vhsstatic: '📺',
  crickets: '🦗', chimes: '🔔', stream: '💧', nightbugs: '🪲',
};

interface MusicPlayerProps {
  currentVibe: VibeId;
  onVibeChange: (vibe: VibeId) => void;
}

export function MusicPlayer({ currentVibe, onVibeChange }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [ambienceVol, setAmbienceVol] = useState(60);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedTrack, setDisplayedTrack] = useState(currentVibe);
  const [trackFade, setTrackFade] = useState(1);
  const [showAmbienceMix, setShowAmbienceMix] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const config = TRACK_CONFIGS[displayedTrack];

  // Animate visualizer bars
  useEffect(() => {
    const animate = () => {
      if (barsRef.current && isPlaying) {
        const bars = barsRef.current.children;
        for (let i = 0; i < bars.length; i++) {
          const bar = bars[i] as HTMLElement;
          const h = 3 + Math.sin(Date.now() / (250 + i * 30) + i * 0.7) * 5 + Math.random() * 4;
          bar.style.height = `${h}px`;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying]);

  // Handle vibe changes with smooth track label transition
  useEffect(() => {
    if (currentVibe !== displayedTrack) {
      setIsTransitioning(true);
      setTrackFade(0);
      
      setTimeout(() => {
        setDisplayedTrack(currentVibe);
        setTrackFade(1);
        setTimeout(() => setIsTransitioning(false), 600);
      }, 400);
    }
  }, [currentVibe, displayedTrack]);

  const togglePlay = useCallback(async () => {
    await lofiEngine.toggle();
    setIsPlaying(lofiEngine.getIsPlaying());
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setVolume(v);
    lofiEngine.setVolume(v / 100);
  }, []);

  const handleAmbienceVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setAmbienceVol(v);
    lofiEngine.setAmbienceVolume(v / 100);
  }, []);

  const skipTrack = useCallback((direction: 1 | -1) => {
    const currentIndex = vibeOrder.indexOf(currentVibe);
    const nextIndex = (currentIndex + direction + vibeOrder.length) % vibeOrder.length;
    onVibeChange(vibeOrder[nextIndex]);
  }, [currentVibe, onVibeChange]);

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div className="relative group px-2 sm:px-0">
      {/* Glow effect */}
      <div className={`absolute -inset-3 rounded-3xl transition-all duration-[2000ms] blur-2xl
        ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: `radial-gradient(ellipse at center, ${config.color}15, transparent 70%)` }}
      />
      
      <div className="relative backdrop-blur-2xl bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 sm:p-5 shadow-2xl">
        {/* Top section: Vinyl + Track Info */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Vinyl record */}
          <div className="relative flex-shrink-0">
            <div className={`w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full shadow-xl flex items-center justify-center
              ${isPlaying ? 'animate-spin' : ''}`}
              style={{
                animationDuration: '3s',
                background: `conic-gradient(from 0deg, #111 0%, #1a1a1a 10%, #111 20%, #1a1a1a 30%, #111 40%, #1a1a1a 50%, #111 60%, #1a1a1a 70%, #111 80%, #1a1a1a 90%, #111 100%)`,
              }}
            >
              <div className="w-10 sm:w-14 rounded-full border border-white/[0.04] flex items-center justify-center h-10 sm:h-14">
                <div className="w-7 sm:w-10 h-7 sm:h-10 rounded-full border border-white/[0.03] flex items-center justify-center">
                  <div className="w-3.5 sm:w-5 h-3.5 sm:h-5 rounded-full flex items-center justify-center transition-colors duration-1000"
                    style={{ backgroundColor: config.color + '80' }}>
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gray-900" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <div className="transition-all duration-500" style={{ opacity: trackFade, transform: `translateY(${trackFade === 1 ? 0 : 8}px)` }}>
              <h3 className="text-white/90 font-semibold text-sm sm:text-base tracking-wide truncate"
                style={{ fontFamily: 'Nunito, sans-serif' }}>
                {config.name}
              </h3>
              <p className="text-white/35 text-[10px] sm:text-xs mt-0.5 truncate" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {config.subtitle} • {config.bpm} bpm
              </p>
              {/* Ambience tags - scrollable on mobile */}
              <div className="flex gap-1 mt-1.5 overflow-x-auto pb-1 scrollbar-hide">
                {config.ambience.slice(0, 4).map((a, i) => (
                  <span key={i} className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.04] text-white/25 whitespace-nowrap flex-shrink-0"
                    style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {ambienceEmojis[a.type]} {ambienceLabels[a.type]}
                  </span>
                ))}
                {config.ambience.length > 4 && (
                  <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.04] text-white/25 flex-shrink-0">
                    +{config.ambience.length - 4}
                  </span>
                )}
              </div>
            </div>
            
            {/* Visualizer bars - fewer on mobile */}
            <div className="flex items-end gap-[2px] sm:gap-[3px] mt-2 sm:mt-2.5 h-3 sm:h-4" ref={barsRef}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-colors duration-1000 hidden sm:block"
                  style={{
                    width: '3px',
                    height: '3px',
                    background: isPlaying
                      ? `linear-gradient(to top, ${config.color}90, ${config.color}40)`
                      : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-colors duration-1000 sm:hidden"
                  style={{
                    width: '2.5px',
                    height: '3px',
                    background: isPlaying
                      ? `linear-gradient(to top, ${config.color}90, ${config.color}40)`
                      : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-5">
          <button
            onClick={() => skipTrack(-1)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center
              transition-all duration-300 text-white/30 hover:text-white/60 active:scale-90"
          >
            <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg
              transition-all duration-500 hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${config.color}cc, ${config.color}88)`,
              boxShadow: `0 4px 20px ${config.color}30`,
            }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="white" />
            )}
          </button>

          <button
            onClick={() => skipTrack(1)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center
              transition-all duration-300 text-white/30 hover:text-white/60 active:scale-90"
          >
            <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" />
          </button>

          <div className="flex items-center gap-2 flex-1 ml-1 sm:ml-2">
            <VolumeIcon className="w-4 h-4 text-white/25 flex-shrink-0 hidden sm:block" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
          </div>

          {/* Ambience toggle */}
          <button
            onClick={() => setShowAmbienceMix(!showAmbienceMix)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300
              ${showAmbienceMix ? 'bg-white/[0.1] text-white/60' : 'bg-white/[0.04] text-white/25 hover:text-white/50'}`}
            title="Ambience Mix"
          >
            <Wind className="w-4 h-4" />
          </button>
        </div>

        {/* Ambience volume slider */}
        <div className={`overflow-hidden transition-all duration-500 ${showAmbienceMix ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          <div className="flex items-center gap-2 sm:gap-3 px-2 py-2.5 rounded-xl bg-white/[0.02]">
            <span className="text-[10px] sm:text-[11px] text-white/25 tracking-wider whitespace-nowrap"
              style={{ fontFamily: 'Nunito, sans-serif' }}>
              🎧 AMBIENCE
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={ambienceVol}
              onChange={handleAmbienceVolumeChange}
              className="flex-1"
            />
            <span className="text-[10px] sm:text-[11px] text-white/25 w-7 text-right"
              style={{ fontFamily: 'Space Mono, monospace' }}>
              {ambienceVol}
            </span>
          </div>
        </div>

        {/* Transition indicator */}
        {isTransitioning && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.color }} />
            <span className="text-[9px] text-white/20 hidden sm:inline" style={{ fontFamily: 'Nunito, sans-serif' }}>switching...</span>
          </div>
        )}
      </div>
    </div>
  );
}
