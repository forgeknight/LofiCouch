import { useState, useEffect, useCallback, useRef } from 'react';
import { Timer, RotateCcw, Play, Pause, Clock, Zap, X } from 'lucide-react';

interface ClockTimerProps {
  accentColor?: string;
}

const PRESETS = [
  { label: '5m', minutes: 5, icon: '☕' },
  { label: '15m', minutes: 15, icon: '📖' },
  { label: '25m', minutes: 25, icon: '🎯' },
  { label: '45m', minutes: 45, icon: '💪' },
  { label: '60m', minutes: 60, icon: '🔥' },
];

export function ClockTimer({ accentColor = '#f59e0b' }: ClockTimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<SVGSVGElement>(null);

  const progress = 1 - remainingSeconds / totalSeconds;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            playNotificationSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remainingSeconds]);

  const playNotificationSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(1100, audioCtx.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.5);
  };

  const handleDialInteraction = useCallback((e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (isRunning) return;
    
    const dial = dialRef.current;
    if (!dial) return;

    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const angle = Math.atan2(clientY - centerY, clientX - centerX);
    let normalizedAngle = (angle + Math.PI / 2) / (2 * Math.PI);
    if (normalizedAngle < 0) normalizedAngle += 1;
    
    const newMinutes = Math.max(1, Math.round(normalizedAngle * 60));
    const newTotalSeconds = newMinutes * 60;
    
    setTotalSeconds(newTotalSeconds);
    setRemainingSeconds(newTotalSeconds);
  }, [isRunning]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isRunning) return;
    setIsDragging(true);
    handleDialInteraction(e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isRunning) return;
    setIsDragging(true);
    handleDialInteraction(e);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || isRunning) return;
    handleDialInteraction(e);
  }, [isDragging, isRunning, handleDialInteraction]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || isRunning) return;
    handleDialInteraction(e);
  }, [isDragging, isRunning, handleDialInteraction]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const setPreset = (mins: number) => {
    if (isRunning) return;
    const newTotal = mins * 60;
    setTotalSeconds(newTotal);
    setRemainingSeconds(newTotal);
  };

  const reset = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  }, [totalSeconds]);

  const toggleTimer = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(totalSeconds);
    }
    setIsRunning(!isRunning);
  };

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference * (1 - progress);
  const minuteAngle = (remainingSeconds / totalSeconds) * 360;
  
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * 360 - 90;
    const isHour = i % 5 === 0;
    const innerR = isHour ? 44 : 48;
    const outerR = 52;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 60 + innerR * Math.cos(rad),
      y1: 60 + innerR * Math.sin(rad),
      x2: 60 + outerR * Math.cos(rad),
      y2: 60 + outerR * Math.sin(rad),
      isHour,
    };
  });

  const numbers = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((num) => {
    const angle = ((num / 60) * 360 - 90) * (Math.PI / 180);
    return {
      num: num === 60 ? 60 : num,
      x: 60 + 36 * Math.cos(angle),
      y: 60 + 36 * Math.sin(angle) + 3,
    };
  });

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5 sm:p-3
          hover:bg-white/[0.08] transition-all duration-300 text-white/40 hover:text-white/70
          relative"
      >
        <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
        {isRunning && (
          <span 
            className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
        )}
      </button>

      {/* Mobile: Full screen modal, Desktop: Popup */}
      <div className={`
        fixed sm:absolute inset-0 sm:inset-auto sm:bottom-14 sm:right-0
        w-full sm:w-80 md:w-[340px]
        h-full sm:h-auto
        backdrop-blur-2xl bg-black/90 sm:bg-black/70 
        sm:border sm:border-white/[0.08] sm:rounded-3xl 
        p-5 sm:p-6 
        shadow-2xl z-50
        flex flex-col sm:block
        transition-all duration-500 origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
      `}>
        {/* Mobile close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 sm:hidden w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-4 mt-8 sm:mt-0">
          <Clock className="w-5 h-5 sm:w-4 sm:h-4 text-white/40" />
          <span className="text-sm sm:text-xs font-medium tracking-widest text-white/40 uppercase">Focus Timer</span>
        </div>

        {/* Clock Dial */}
        <div className="relative w-48 h-48 sm:w-36 md:w-40 sm:h-36 md:h-40 mx-auto mb-6 sm:mb-4 flex-shrink-0">
          <svg 
            ref={dialRef}
            className="w-full h-full cursor-pointer select-none"
            viewBox="0 0 120 120"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ touchAction: 'none' }}
          >
            {/* Outer ring */}
            <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Tick marks */}
            {ticks.map((tick, i) => (
              <line
                key={i}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={tick.isHour ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}
                strokeWidth={tick.isHour ? 1.5 : 0.75}
              />
            ))}

            {/* Numbers */}
            {numbers.map(({ num, x, y }) => (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                fill="rgba(255,255,255,0.3)"
                fontSize="7"
                fontFamily="Space Mono, monospace"
              >
                {num}
              </text>
            ))}

            {/* Progress arc background */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="4"
            />

            {/* Progress arc */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={accentColor}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ 
                transition: isDragging ? 'none' : 'stroke-dashoffset 1s linear',
                filter: `drop-shadow(0 0 6px ${accentColor}50)`
              }}
            />

            {/* Center circle */}
            <circle cx="60" cy="60" r="28" fill="rgba(0,0,0,0.5)" />
            <circle cx="60" cy="60" r="27" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Minute hand */}
            <g transform={`rotate(${360 - minuteAngle} 60 60)`}>
              <line
                x1="60"
                y1="60"
                x2="60"
                y2="22"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 4px ${accentColor})` }}
              />
              <circle cx="60" cy="22" r="3" fill={accentColor} />
            </g>

            {/* Center dot */}
            <circle cx="60" cy="60" r="4" fill={accentColor} />
            <circle cx="60" cy="60" r="2" fill="white" />
          </svg>

          {/* Digital time display */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center mt-1">
              <span 
                className="text-3xl sm:text-2xl md:text-[1.7rem] font-light tracking-wider text-white/80"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                {minutes.toString().padStart(2, '0')}
                <span className="animate-pulse">:</span>
                {seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Instruction text */}
        <p className="text-center text-xs sm:text-[10px] text-white/30 mb-4 sm:mb-3">
          {isRunning ? 'Timer running...' : isDragging ? 'Release to set time' : 'Drag the dial to set time'}
        </p>

        {/* Preset buttons */}
        <div className="flex justify-center gap-2 sm:gap-1.5 mb-5 sm:mb-4">
          {PRESETS.map((preset) => (
            <button
              key={preset.minutes}
              onClick={() => setPreset(preset.minutes)}
              disabled={isRunning}
              className={`flex flex-col items-center gap-1 sm:gap-0.5 px-3 sm:px-2 py-2 sm:py-1.5 rounded-xl sm:rounded-lg transition-all text-sm sm:text-xs
                ${Math.floor(totalSeconds / 60) === preset.minutes 
                  ? 'bg-white/10 text-white/80' 
                  : 'bg-white/[0.03] text-white/30 hover:bg-white/[0.06] hover:text-white/50'}
                ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
              title={`${preset.minutes} minutes`}
            >
              <span className="text-lg sm:text-base">{preset.icon}</span>
              <span className="text-[10px] sm:text-[9px]">{preset.label}</span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 sm:gap-3 mt-auto sm:mt-0">
          <button
            onClick={toggleTimer}
            className="flex items-center gap-2 px-8 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl text-sm sm:text-xs transition-all font-medium tracking-wider active:scale-95"
            style={{
              fontFamily: 'Nunito, sans-serif',
              backgroundColor: isRunning ? 'rgba(255,255,255,0.06)' : `${accentColor}25`,
              color: isRunning ? 'rgba(255,255,255,0.6)' : accentColor,
              boxShadow: !isRunning ? `0 0 20px ${accentColor}20` : 'none',
            }}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                PAUSE
              </>
            ) : (
              <>
                <Play className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                {remainingSeconds === 0 ? 'RESTART' : 'START'}
              </>
            )}
          </button>
          <button
            onClick={reset}
            className="p-3 sm:p-2.5 rounded-2xl sm:rounded-xl bg-white/[0.04] text-white/25 hover:text-white/50 hover:bg-white/[0.08] transition-all active:scale-95"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Completion message */}
        {remainingSeconds === 0 && !isRunning && (
          <div 
            className="mt-5 sm:mt-4 text-center py-3 sm:py-2 rounded-xl sm:rounded-lg animate-pulse"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            <Zap className="w-5 h-5 sm:w-4 sm:h-4 inline mr-1" />
            <span className="text-sm sm:text-xs font-medium">Time's up! Great focus session!</span>
          </div>
        )}
      </div>
    </div>
  );
}
