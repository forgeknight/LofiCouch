import { useState, useEffect } from 'react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="text-center select-none">
      <div className="text-5xl sm:text-6xl md:text-7xl font-light text-white/75 tracking-[0.15em]"
        style={{ fontFamily: 'Space Mono, monospace' }}>
        {hours}
        <span className="animate-pulse text-white/30">:</span>
        {minutes}
        <span className="text-3xl sm:text-4xl md:text-5xl text-white/20 ml-2">{seconds}</span>
      </div>
      <p className="text-white/20 text-[10px] sm:text-xs mt-2 tracking-[0.3em] uppercase"
        style={{ fontFamily: 'Nunito, sans-serif' }}>
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>
    </div>
  );
}
