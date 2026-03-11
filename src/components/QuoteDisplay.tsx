import { useState, useEffect } from 'react';

const quotes = [
  { text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "Slow down and everything you are chasing will come around and catch you.", author: "John De Paola" },
  { text: "The time you enjoy wasting is not wasted time.", author: "Bertrand Russell" },
  { text: "Be like water making its way through cracks.", author: "Bruce Lee" },
  { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
  { text: "Sometimes the most productive thing you can do is relax.", author: "Mark Black" },
  { text: "Music is the moonlight in the gloomy night of life.", author: "Jean Paul" },
  { text: "Where words fail, music speaks.", author: "Hans Christian Andersen" },
  { text: "Surrender to what is. Let go of what was. Have faith in what will be.", author: "Sonia Ricotti" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "Stars can't shine without darkness.", author: "D.H. Sidebottom" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
  { text: "The world is full of magic things, patiently waiting for our senses to grow sharper.", author: "W.B. Yeats" },
  { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
  { text: "Music gives a soul to the universe, wings to the mind, flight to the imagination.", author: "Plato" },
  { text: "We do not remember days, we remember moments.", author: "Cesare Pavese" },
  { text: "Rain is grace; rain is the sky descending to the earth.", author: "John Updike" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "I have loved the stars too fondly to be fearful of the night.", author: "Sarah Williams" },
];

export function QuoteDisplay() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentQuote(prev => (prev + 1) % quotes.length);
        setOpacity(1);
      }, 1200);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  const quote = quotes[currentQuote];

  return (
    <div className="text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 transition-all duration-[1200ms]"
      style={{ opacity, transform: `translateY(${opacity === 1 ? 0 : 6}px)` }}>
      <p className="text-white/35 sm:text-white/40 text-base sm:text-lg md:text-xl italic leading-relaxed"
        style={{ fontFamily: 'Caveat, cursive' }}>
        &ldquo;{quote.text}&rdquo;
      </p>
      <p className="text-white/15 text-[9px] sm:text-[10px] mt-2 sm:mt-2.5 tracking-[0.15em] uppercase"
        style={{ fontFamily: 'Nunito, sans-serif' }}>
        — {quote.author}
      </p>
    </div>
  );
}
