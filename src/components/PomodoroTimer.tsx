import { useState, useEffect, useCallback, useRef } from 'react';
import { Timer, RotateCcw } from 'lucide-react';

interface PomodoroTimerProps {
  accentColor?: string;
}

export function PomodoroTimer({ accentColor = '#f59e0b' }: PomodoroTimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const intervalRef = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const totalSeconds = minutes * 60 + seconds;
  const maxSeconds = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progress = 1 - totalSeconds / maxSeconds;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            setMinutes(prevMin => {
              if (prevMin === 0) {
                setIsRunning(false);
                if (mode === 'focus') {
                  setMode('break');
                  setMinutes(5);
                } else {
                  setMode('focus');
                  setMinutes(25);
                }
                return 0;
              }
              return prevMin - 1;
            });
            return prev === 0 ? 59 : prev - 1;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setMinutes(mode === 'focus' ? 25 : 5);
    setSeconds(0);
  }, [mode]);

  const circumference = 2 * Math.PI * 40;
  const focusColor = accentColor;
  const breakColor = '#22c55e';
  const activeColor = mode === 'focus' ? focusColor : breakColor;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5
          hover:bg-white/[0.08] transition-all duration-300 text-white/40 hover:text-white/70"
      >
        <Timer className="w-4.5 h-4.5" />
      </button>

      <div className={`absolute bottom-12 right-0 w-60 backdrop-blur-2xl bg-black/60 border border-white/[0.08]
        rounded-2xl p-5 shadow-2xl z-50 text-center
        transition-all duration-500 origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>

        <div className="flex gap-1 mb-4 bg-white/[0.03] rounded-lg p-0.5">
          <button
            onClick={() => { setMode('focus'); setMinutes(25); setSeconds(0); setIsRunning(false); }}
            className="flex-1 py-1.5 text-[10px] rounded-md transition-all font-medium tracking-wider"
            style={{
              fontFamily: 'Nunito, sans-serif',
              backgroundColor: mode === 'focus' ? `${focusColor}20` : 'transparent',
              color: mode === 'focus' ? focusColor : 'rgba(255,255,255,0.25)',
            }}
          >
            FOCUS
          </button>
          <button
            onClick={() => { setMode('break'); setMinutes(5); setSeconds(0); setIsRunning(false); }}
            className="flex-1 py-1.5 text-[10px] rounded-md transition-all font-medium tracking-wider"
            style={{
              fontFamily: 'Nunito, sans-serif',
              backgroundColor: mode === 'break' ? `${breakColor}20` : 'transparent',
              color: mode === 'break' ? breakColor : 'rgba(255,255,255,0.25)',
            }}
          >
            BREAK
          </button>
        </div>

        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 -rotate-90">
            <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
            <circle cx="48" cy="48" r="40" fill="none"
              stroke={`${activeColor}70`}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/60 text-xl font-light tracking-wider" style={{ fontFamily: 'Space Mono, monospace' }}>
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-5 py-2 rounded-xl text-xs transition-all font-medium tracking-wider"
            style={{
              fontFamily: 'Nunito, sans-serif',
              backgroundColor: isRunning ? 'rgba(255,255,255,0.06)' : `${activeColor}20`,
              color: isRunning ? 'rgba(255,255,255,0.5)' : activeColor,
            }}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-xl bg-white/[0.04] text-white/25 hover:text-white/50 hover:bg-white/[0.08] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
