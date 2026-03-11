// LofiCouch — Multi-Track Lofi Engine with Ambient Sound Layers & Crossfade
// 13 vibes, each with unique musical character + perfectly blended ambience
// v3 — Refined ambience: soothing rain, balanced mixing, natural sounds

export type VibeId =
  | 'midnight' | 'sunset' | 'forest' | 'ocean' | 'cafe'
  | 'rain' | 'space' | 'sakura' | 'nostalgic' | 'nineties'
  | 'ghibli' | 'library' | 'train';

export interface AmbienceLayer {
  type: 'rain' | 'heavyrain' | 'thunder' | 'wind' | 'fire' | 'birds'
    | 'waves' | 'cafechatter' | 'trainrumble' | 'vhsstatic' | 'crickets'
    | 'lightrain' | 'chimes' | 'stream' | 'nightbugs';
  volume: number;
  filterFreq?: number;
}

interface TrackConfig {
  name: string;
  subtitle: string;
  bpm: number;
  key: string;
  chords: number[][];
  bassOctave: number;
  scale: number[];
  filterCutoff: number;
  reverbDecay: number;
  swingAmount: number;
  drumStyle: 'soft' | 'boom' | 'boom90' | 'minimal' | 'jazzy' | 'none' | 'tape' | 'dusty' | 'airy' | 'brushes' | 'lofi90' | 'gentle';
  padEnabled: boolean;
  padFreqs?: number[];
  crackleAmount: number;
  melodyProbability: number;
  melodyOctave: number;
  waveform: OscillatorType;
  chordVoicing: 'spread' | 'close' | 'drop2' | 'rootless' | 'open' | 'stacked';
  color: string;
  ambience: AmbienceLayer[];
}

export const TRACK_CONFIGS: Record<VibeId, TrackConfig> = {
  midnight: {
    name: 'Midnight Rain',
    subtitle: 'urban night lofi',
    bpm: 72,
    key: 'Dm',
    chords: [
      [293.66, 349.23, 440.0, 523.25],
      [392.0, 493.88, 293.66, 349.23],
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 261.63, 329.63, 392.0],
    ],
    bassOctave: 4,
    scale: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25],
    filterCutoff: 800,
    reverbDecay: 2.5,
    swingAmount: 0.03,
    drumStyle: 'boom',
    padEnabled: true,
    padFreqs: [130.81, 164.81, 196.0],
    crackleAmount: 0.25,
    melodyProbability: 0.35,
    melodyOctave: 1,
    waveform: 'triangle',
    chordVoicing: 'spread',
    color: '#6366f1',
    ambience: [
      { type: 'rain', volume: 0.14, filterFreq: 2200 },
      { type: 'thunder', volume: 0.04 },
    ],
  },
  sunset: {
    name: 'Golden Dust',
    subtitle: 'warm sunset beats',
    bpm: 78,
    key: 'Gmaj',
    chords: [
      [392.0, 493.88, 587.33, 739.99],
      [329.63, 415.30, 493.88, 622.25],
      [261.63, 329.63, 392.0, 493.88],
      [293.66, 369.99, 440.0, 554.37],
    ],
    bassOctave: 4,
    scale: [392.0, 440.0, 493.88, 587.33, 659.25, 783.99],
    filterCutoff: 1200,
    reverbDecay: 3.0,
    swingAmount: 0.02,
    drumStyle: 'soft',
    padEnabled: true,
    padFreqs: [196.0, 246.94, 293.66],
    crackleAmount: 0.35,
    melodyProbability: 0.45,
    melodyOctave: 1,
    waveform: 'sine',
    chordVoicing: 'close',
    color: '#f59e0b',
    ambience: [
      { type: 'wind', volume: 0.07, filterFreq: 600 },
      { type: 'birds', volume: 0.04, filterFreq: 4500 },
      { type: 'chimes', volume: 0.025 },
    ],
  },
  forest: {
    name: 'Moss & Mist',
    subtitle: 'enchanted woodland',
    bpm: 66,
    key: 'Em',
    chords: [
      [329.63, 392.0, 493.88, 587.33],
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 277.18, 329.63, 415.30],
      [246.94, 311.13, 369.99, 466.16],
    ],
    bassOctave: 4,
    scale: [329.63, 369.99, 440.0, 493.88, 587.33, 659.25],
    filterCutoff: 600,
    reverbDecay: 4.0,
    swingAmount: 0.01,
    drumStyle: 'minimal',
    padEnabled: true,
    padFreqs: [164.81, 196.0, 246.94],
    crackleAmount: 0.15,
    melodyProbability: 0.5,
    melodyOctave: 1,
    waveform: 'sine',
    chordVoicing: 'drop2',
    color: '#10b981',
    ambience: [
      { type: 'birds', volume: 0.06, filterFreq: 5000 },
      { type: 'stream', volume: 0.08, filterFreq: 2200 },
      { type: 'wind', volume: 0.04, filterFreq: 500 },
    ],
  },
  ocean: {
    name: 'Tidal Drift',
    subtitle: 'deep sea ambient',
    bpm: 60,
    key: 'Bbmaj',
    chords: [
      [233.08, 293.66, 349.23, 440.0],
      [311.13, 392.0, 466.16, 587.33],
      [174.61, 220.0, 261.63, 329.63],
      [196.0, 246.94, 293.66, 369.99],
    ],
    bassOctave: 4,
    scale: [233.08, 293.66, 349.23, 392.0, 466.16, 523.25],
    filterCutoff: 500,
    reverbDecay: 5.0,
    swingAmount: 0.0,
    drumStyle: 'none',
    padEnabled: true,
    padFreqs: [116.54, 146.83, 174.61],
    crackleAmount: 0.1,
    melodyProbability: 0.3,
    melodyOctave: 1,
    waveform: 'sine',
    chordVoicing: 'rootless',
    color: '#06b6d4',
    ambience: [
      { type: 'waves', volume: 0.14, filterFreq: 1600 },
      { type: 'wind', volume: 0.05, filterFreq: 400 },
    ],
  },
  cafe: {
    name: 'Café au Lait',
    subtitle: 'cozy coffee shop',
    bpm: 82,
    key: 'Cmaj',
    chords: [
      [261.63, 329.63, 392.0, 493.88],
      [349.23, 440.0, 523.25, 659.25],
      [293.66, 349.23, 440.0, 523.25],
      [392.0, 493.88, 587.33, 698.46],
    ],
    bassOctave: 4,
    scale: [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5],
    filterCutoff: 1000,
    reverbDecay: 2.0,
    swingAmount: 0.04,
    drumStyle: 'jazzy',
    padEnabled: false,
    crackleAmount: 0.4,
    melodyProbability: 0.55,
    melodyOctave: 1,
    waveform: 'triangle',
    chordVoicing: 'close',
    color: '#d97706',
    ambience: [
      { type: 'cafechatter', volume: 0.06, filterFreq: 1500 },
      { type: 'lightrain', volume: 0.05, filterFreq: 2000 },
    ],
  },
  rain: {
    name: 'Grey Skies',
    subtitle: 'rainy window beats',
    bpm: 68,
    key: 'Fm',
    chords: [
      [174.61, 220.0, 261.63, 329.63],
      [207.65, 261.63, 311.13, 392.0],
      [155.56, 196.0, 233.08, 293.66],
      [185.0, 233.08, 277.18, 349.23],
    ],
    bassOctave: 4,
    scale: [349.23, 392.0, 466.16, 523.25, 622.25, 698.46],
    filterCutoff: 650,
    reverbDecay: 3.5,
    swingAmount: 0.025,
    drumStyle: 'tape',
    padEnabled: true,
    padFreqs: [87.31, 110.0, 130.81],
    crackleAmount: 0.3,
    melodyProbability: 0.4,
    melodyOctave: 1,
    waveform: 'triangle',
    chordVoicing: 'spread',
    color: '#64748b',
    ambience: [
      { type: 'rain', volume: 0.16, filterFreq: 2400 },
      { type: 'thunder', volume: 0.035 },
      { type: 'wind', volume: 0.05, filterFreq: 500 },
    ],
  },
  space: {
    name: 'Cosmic Drift',
    subtitle: 'stargazing ambient',
    bpm: 56,
    key: 'Dbmaj',
    chords: [
      [277.18, 349.23, 415.30, 523.25],
      [233.08, 293.66, 349.23, 440.0],
      [311.13, 392.0, 466.16, 587.33],
      [185.0, 233.08, 277.18, 349.23],
    ],
    bassOctave: 4,
    scale: [277.18, 311.13, 349.23, 415.30, 466.16, 554.37],
    filterCutoff: 400,
    reverbDecay: 6.0,
    swingAmount: 0.0,
    drumStyle: 'airy',
    padEnabled: true,
    padFreqs: [69.30, 87.31, 103.83],
    crackleAmount: 0.08,
    melodyProbability: 0.25,
    melodyOctave: 2,
    waveform: 'sine',
    chordVoicing: 'rootless',
    color: '#8b5cf6',
    ambience: [
      { type: 'wind', volume: 0.04, filterFreq: 300 },
    ],
  },
  sakura: {
    name: 'Cherry Blossom',
    subtitle: 'anime garden lofi',
    bpm: 75,
    key: 'Amaj',
    chords: [
      [220.0, 277.18, 329.63, 415.30],
      [329.63, 415.30, 493.88, 622.25],
      [293.66, 369.99, 440.0, 554.37],
      [246.94, 311.13, 369.99, 466.16],
    ],
    bassOctave: 4,
    scale: [440.0, 493.88, 554.37, 659.25, 739.99, 880.0],
    filterCutoff: 950,
    reverbDecay: 2.8,
    swingAmount: 0.035,
    drumStyle: 'dusty',
    padEnabled: true,
    padFreqs: [110.0, 138.59, 164.81],
    crackleAmount: 0.3,
    melodyProbability: 0.6,
    melodyOctave: 1,
    waveform: 'triangle',
    chordVoicing: 'close',
    color: '#ec4899',
    ambience: [
      { type: 'wind', volume: 0.05, filterFreq: 700 },
      { type: 'chimes', volume: 0.03 },
      { type: 'birds', volume: 0.035, filterFreq: 5000 },
    ],
  },
  nostalgic: {
    name: 'Faded Memories',
    subtitle: 'VHS nostalgia tape',
    bpm: 70,
    key: 'Ebmaj',
    chords: [
      [311.13, 392.0, 466.16, 587.33],
      [261.63, 329.63, 392.0, 493.88],
      [207.65, 261.63, 311.13, 392.0],
      [233.08, 293.66, 349.23, 440.0],
    ],
    bassOctave: 4,
    scale: [311.13, 349.23, 392.0, 466.16, 523.25, 622.25],
    filterCutoff: 550,
    reverbDecay: 4.5,
    swingAmount: 0.02,
    drumStyle: 'tape',
    padEnabled: true,
    padFreqs: [155.56, 196.0, 233.08],
    crackleAmount: 0.55,
    melodyProbability: 0.45,
    melodyOctave: 1,
    waveform: 'triangle',
    chordVoicing: 'spread',
    color: '#a78bfa',
    ambience: [
      { type: 'vhsstatic', volume: 0.04, filterFreq: 2500 },
      { type: 'crickets', volume: 0.05, filterFreq: 4500 },
      { type: 'nightbugs', volume: 0.04, filterFreq: 3000 },
    ],
  },
  nineties: {
    name: '90\'s Boom Bap',
    subtitle: 'golden era hip-hop',
    bpm: 88,
    key: 'Cm',
    chords: [
      [261.63, 311.13, 392.0, 466.16],
      [233.08, 293.66, 349.23, 440.0],
      [207.65, 261.63, 311.13, 392.0],
      [196.0, 246.94, 293.66, 369.99],
    ],
    bassOctave: 3,
    scale: [523.25, 587.33, 622.25, 783.99, 880.0, 1046.5],
    filterCutoff: 900,
    reverbDecay: 1.8,
    swingAmount: 0.05,
    drumStyle: 'boom90',
    padEnabled: false,
    crackleAmount: 0.5,
    melodyProbability: 0.5,
    melodyOctave: 1,
    waveform: 'square',
    chordVoicing: 'stacked',
    color: '#ef4444',
    ambience: [
      { type: 'vhsstatic', volume: 0.03, filterFreq: 2000 },
      { type: 'cafechatter', volume: 0.035, filterFreq: 1000 },
    ],
  },
  ghibli: {
    name: 'Spirit Garden',
    subtitle: 'studio ghibli inspired',
    bpm: 72,
    key: 'Fmaj',
    chords: [
      [349.23, 440.0, 523.25, 659.25],
      [293.66, 369.99, 440.0, 554.37],
      [233.08, 293.66, 349.23, 440.0],
      [261.63, 329.63, 392.0, 493.88],
    ],
    bassOctave: 4,
    scale: [349.23, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99],
    filterCutoff: 1100,
    reverbDecay: 3.5,
    swingAmount: 0.015,
    drumStyle: 'gentle',
    padEnabled: true,
    padFreqs: [174.61, 220.0, 261.63],
    crackleAmount: 0.2,
    melodyProbability: 0.7,
    melodyOctave: 1,
    waveform: 'sine',
    chordVoicing: 'open',
    color: '#34d399',
    ambience: [
      { type: 'birds', volume: 0.06, filterFreq: 5000 },
      { type: 'stream', volume: 0.07, filterFreq: 1800 },
      { type: 'wind', volume: 0.04, filterFreq: 500 },
      { type: 'chimes', volume: 0.025 },
    ],
  },
  library: {
    name: 'Quiet Pages',
    subtitle: 'late night study',
    bpm: 65,
    key: 'Dbmaj',
    chords: [
      [277.18, 349.23, 415.30, 523.25],
      [246.94, 311.13, 369.99, 466.16],
      [311.13, 392.0, 466.16, 587.33],
      [185.0, 233.08, 277.18, 349.23],
    ],
    bassOctave: 4,
    scale: [277.18, 311.13, 349.23, 415.30, 466.16, 523.25],
    filterCutoff: 500,
    reverbDecay: 4.0,
    swingAmount: 0.01,
    drumStyle: 'minimal',
    padEnabled: true,
    padFreqs: [138.59, 174.61, 207.65],
    crackleAmount: 0.15,
    melodyProbability: 0.35,
    melodyOctave: 1,
    waveform: 'sine',
    chordVoicing: 'rootless',
    color: '#78716c',
    ambience: [
      { type: 'lightrain', volume: 0.07, filterFreq: 1800 },
      { type: 'fire', volume: 0.06, filterFreq: 1500 },
      { type: 'wind', volume: 0.03, filterFreq: 400 },
    ],
  },
  train: {
    name: 'Starlit Express',
    subtitle: 'night train journey',
    bpm: 74,
    key: 'Am',
    chords: [
      [220.0, 261.63, 329.63, 392.0],
      [349.23, 440.0, 523.25, 659.25],
      [261.63, 329.63, 392.0, 493.88],
      [329.63, 392.0, 493.88, 587.33],
    ],
    bassOctave: 4,
    scale: [220.0, 261.63, 329.63, 392.0, 440.0, 523.25, 587.33],
    filterCutoff: 750,
    reverbDecay: 3.0,
    swingAmount: 0.025,
    drumStyle: 'soft',
    padEnabled: true,
    padFreqs: [110.0, 130.81, 164.81],
    crackleAmount: 0.3,
    melodyProbability: 0.5,
    melodyOctave: 1,
    waveform: 'triangle',
    chordVoicing: 'drop2',
    color: '#f472b6',
    ambience: [
      { type: 'trainrumble', volume: 0.08, filterFreq: 250 },
      { type: 'lightrain', volume: 0.06, filterFreq: 2000 },
      { type: 'wind', volume: 0.04, filterFreq: 400 },
    ],
  },
};

// ─── Ambient Sound Generator (v3 — refined, soothing, balanced) ──

class AmbiencePlayer {
  private ctx: AudioContext;
  private masterGain: GainNode;
  private sources: (AudioBufferSourceNode | OscillatorNode)[] = [];
  private intervalIds: number[] = [];
  private timeoutIds: number[] = [];
  private isPlaying = false;

  constructor(ctx: AudioContext, destination: AudioNode) {
    this.ctx = ctx;
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
    this.masterGain.connect(destination);
  }

  private createNoiseBuffer(duration: number, type: 'white' | 'pink' | 'brown' = 'white'): AudioBuffer {
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    let lastBrown = 0;

    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'white') {
        data[i] = white;
      } else if (type === 'pink') {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      } else {
        lastBrown += white * 0.02;
        lastBrown = Math.max(-1, Math.min(1, lastBrown));
        data[i] = lastBrown * 3.5;
      }
    }
    return buffer;
  }

  // ── RAIN: Soothing, gentle, steady rainfall ──
  // Uses pink noise with a LOWPASS filter for a warm, non-harsh sound
  // Gentle LFO modulation for natural variation without sudden changes
  private startRain(volume: number, filterFreq: number) {
    const buffer = this.createNoiseBuffer(6, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Lowpass filter — this is key for soothing rain (not bandpass which sounds like a shower)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq || 2200, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.4, this.ctx.currentTime);

    // Second stage — gentle highpass to remove rumble
    const hpFilter = this.ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(200, this.ctx.currentTime);
    hpFilter.Q.setValueAtTime(0.3, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);

    // Very slow, gentle modulation — like rain intensity naturally shifting
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.04, this.ctx.currentTime); // Very slow
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(volume * 0.08, this.ctx.currentTime); // Very subtle
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    source.connect(hpFilter);
    hpFilter.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    this.sources.push(source, lfo);
  }

  // ── LIGHT RAIN: Even softer, more distant rain ──
  private startLightRain(volume: number, filterFreq: number) {
    const buffer = this.createNoiseBuffer(6, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq || 1800, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.3, this.ctx.currentTime);

    const hpFilter = this.ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(300, this.ctx.currentTime);
    hpFilter.Q.setValueAtTime(0.2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.7, this.ctx.currentTime);

    // Very gentle, barely perceptible modulation
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.025, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(volume * 0.04, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    source.connect(hpFilter);
    hpFilter.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    this.sources.push(source, lfo);
  }

  // ── THUNDER: Distant, infrequent, gentle rumbles ──
  // Much less frequent, softer, more distant
  private startThunder(volume: number) {
    const playThunder = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;

      // Very low, distant rumble
      const noiseBuffer = this.createNoiseBuffer(4, 'brown');
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80 + Math.random() * 60, now);
      filter.Q.setValueAtTime(0.5, now);

      const gain = this.ctx.createGain();
      const dur = 3 + Math.random() * 4;
      gain.gain.setValueAtTime(0, now);
      // Slow fade in, even slower fade out — sounds distant
      gain.gain.linearRampToValueAtTime(volume * (0.2 + Math.random() * 0.3), now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + dur + 0.1);
    };

    const scheduleNext = () => {
      if (!this.isPlaying) return;
      // Much less frequent — 18-45 seconds between thunders
      const delay = 18000 + Math.random() * 27000;
      const id = window.setTimeout(() => {
        playThunder();
        scheduleNext();
      }, delay);
      this.timeoutIds.push(id);
    };

    // First thunder after 10-20 sec
    const id = window.setTimeout(() => { playThunder(); scheduleNext(); }, 10000 + Math.random() * 10000);
    this.timeoutIds.push(id);
  }

  // ── WIND: Soft, slow, natural gusts ──
  private startWind(volume: number, filterFreq: number) {
    const buffer = this.createNoiseBuffer(8, 'brown');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq || 600, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.5, this.ctx.currentTime);

    // Two LFOs for more natural variation
    const lfo1 = this.ctx.createOscillator();
    lfo1.type = 'sine';
    lfo1.frequency.setValueAtTime(0.06, this.ctx.currentTime);
    const lfo1Gain = this.ctx.createGain();
    lfo1Gain.gain.setValueAtTime(volume * 0.2, this.ctx.currentTime);
    lfo1.connect(lfo1Gain);

    const lfo2 = this.ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.setValueAtTime(0.015, this.ctx.currentTime);
    const lfo2Gain = this.ctx.createGain();
    lfo2Gain.gain.setValueAtTime(volume * 0.15, this.ctx.currentTime);
    lfo2.connect(lfo2Gain);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.5, this.ctx.currentTime);
    lfo1Gain.connect(gain.gain);
    lfo2Gain.connect(gain.gain);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    lfo1.start();
    lfo2.start();
    this.sources.push(source, lfo1, lfo2);
  }

  // ── FIRE: Warm, cozy crackling ──
  // Gentle brown noise base with soft, infrequent crackle pops
  private startFire(volume: number, filterFreq: number) {
    // Warm base — brown noise through gentle bandpass
    const buffer = this.createNoiseBuffer(6, 'brown');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq || 1500, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.6, this.ctx.currentTime); // Lower Q = wider, softer

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.35, this.ctx.currentTime);

    // Very gentle modulation to simulate flickering
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.3 + Math.random() * 0.2, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(volume * 0.06, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    lfo.start();
    this.sources.push(source, lfo);

    // Soft crackle pops — less frequent, softer
    const playCrackle = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const len = Math.floor(this.ctx.sampleRate * 0.03);
      const popBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = popBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 12); // Sharper falloff = softer pop
      }
      const pop = this.ctx.createBufferSource();
      pop.buffer = popBuffer;

      const popFilter = this.ctx.createBiquadFilter();
      popFilter.type = 'bandpass';
      popFilter.frequency.setValueAtTime(1200 + Math.random() * 800, now);
      popFilter.Q.setValueAtTime(0.8, now);

      const popGain = this.ctx.createGain();
      popGain.gain.setValueAtTime(volume * 0.12, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      pop.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(this.masterGain);
      pop.start(now);
    };

    const id = window.setInterval(() => {
      if (Math.random() > 0.4) playCrackle(); // Less frequent
    }, 300 + Math.random() * 400);
    this.intervalIds.push(id);
  }

  // ── BIRDS: Natural, gentle chirps with realistic frequency sweeps ──
  private startBirds(volume: number, filterFreq: number) {
    const playChirp = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;

      // Two-tone chirp (tweet-tweet)
      const numNotes = 1 + Math.floor(Math.random() * 3);
      for (let n = 0; n < numNotes; n++) {
        const noteTime = now + n * (0.08 + Math.random() * 0.06);
        const baseFreq = 2800 + Math.random() * 1800;

        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, noteTime);
        osc.frequency.exponentialRampToValueAtTime(
          baseFreq * (0.7 + Math.random() * 0.6),
          noteTime + 0.05 + Math.random() * 0.04
        );

        const oscFilter = this.ctx.createBiquadFilter();
        oscFilter.type = 'lowpass';
        oscFilter.frequency.setValueAtTime(filterFreq || 5000, noteTime);

        const oscGain = this.ctx.createGain();
        const dur = 0.04 + Math.random() * 0.05;
        oscGain.gain.setValueAtTime(0, noteTime);
        oscGain.gain.linearRampToValueAtTime(volume * 0.25, noteTime + 0.005);
        oscGain.gain.exponentialRampToValueAtTime(0.001, noteTime + dur);

        osc.connect(oscFilter);
        oscFilter.connect(oscGain);
        oscGain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + dur + 0.01);
      }
    };

    // Random chirps every 3-8 seconds — not too frequent
    const scheduleChirp = () => {
      if (!this.isPlaying) return;
      const delay = 3000 + Math.random() * 5000;
      const id = window.setTimeout(() => {
        playChirp();
        scheduleChirp();
      }, delay);
      this.timeoutIds.push(id);
    };

    const id = window.setTimeout(() => { playChirp(); scheduleChirp(); }, 2000 + Math.random() * 3000);
    this.timeoutIds.push(id);
  }

  // ── OCEAN WAVES: Slow, rhythmic, soothing swells ──
  private startWaves(volume: number, filterFreq: number) {
    const buffer = this.createNoiseBuffer(8, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq || 1600, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.3, this.ctx.currentTime);

    // Primary wave rhythm — slow swell
    const lfo1 = this.ctx.createOscillator();
    lfo1.type = 'sine';
    lfo1.frequency.setValueAtTime(0.08, this.ctx.currentTime); // ~12s period
    const lfo1Gain = this.ctx.createGain();
    lfo1Gain.gain.setValueAtTime(volume * 0.35, this.ctx.currentTime);
    lfo1.connect(lfo1Gain);

    // Secondary wave — slower, bigger
    const lfo2 = this.ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.setValueAtTime(0.03, this.ctx.currentTime); // ~33s period
    const lfo2Gain = this.ctx.createGain();
    lfo2Gain.gain.setValueAtTime(volume * 0.2, this.ctx.currentTime);
    lfo2.connect(lfo2Gain);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.35, this.ctx.currentTime);
    lfo1Gain.connect(gain.gain);
    lfo2Gain.connect(gain.gain);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    lfo1.start();
    lfo2.start();
    this.sources.push(source, lfo1, lfo2);
  }

  // ── CAFÉ CHATTER: Very distant, muffled conversation murmur ──
  private startCafeChatter(volume: number, filterFreq: number) {
    const buffer = this.createNoiseBuffer(6, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Very narrow bandpass to sound like muffled voices
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq || 1500, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // Modulation to simulate conversation rhythm
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.8 + Math.random() * 0.4, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(volume * 0.15, this.ctx.currentTime);
    lfo.connect(lfoGain);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.4, this.ctx.currentTime);
    lfoGain.connect(gain.gain);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    lfo.start();
    this.sources.push(source, lfo);
  }

  // ── TRAIN RUMBLE: Low, steady, rhythmic clickety-clack ──
  private startTrainRumble(volume: number, filterFreq: number) {
    // Low rumble base
    const buffer = this.createNoiseBuffer(8, 'brown');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq || 250, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.4, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.5, this.ctx.currentTime);

    // Rhythmic modulation — clickety-clack at ~2Hz (rail joints)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(1.8, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(volume * 0.08, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    lfo.start();
    this.sources.push(source, lfo);
  }

  // ── VHS STATIC: Very subtle tape hiss/warble ──
  private startVhsStatic(volume: number, filterFreq: number) {
    const buffer = this.createNoiseBuffer(4, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq || 2500, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    // Slow warble effect — like old tape
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.15 + Math.random() * 0.1, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(volume * 0.1, this.ctx.currentTime);
    lfo.connect(lfoGain);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.3, this.ctx.currentTime);
    lfoGain.connect(gain.gain);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    lfo.start();
    this.sources.push(source, lfo);
  }

  // ── CRICKETS: Natural chirping pattern ──
  private startCrickets(volume: number, filterFreq: number) {
    const playChirpBurst = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;

      // A cricket chirp is a rapid series of pulses
      const burstCount = 3 + Math.floor(Math.random() * 4);
      const pulseRate = 0.04 + Math.random() * 0.02;

      for (let i = 0; i < burstCount; i++) {
        const t = now + i * pulseRate;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(4200 + Math.random() * 1000, t);

        const oscFilter = this.ctx.createBiquadFilter();
        oscFilter.type = 'lowpass';
        oscFilter.frequency.setValueAtTime(filterFreq || 4500, t);

        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0, t);
        oscGain.gain.linearRampToValueAtTime(volume * 0.15, t + 0.003);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + pulseRate * 0.8);

        osc.connect(oscFilter);
        oscFilter.connect(oscGain);
        oscGain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + pulseRate + 0.01);
      }
    };

    const scheduleChirp = () => {
      if (!this.isPlaying) return;
      const delay = 1500 + Math.random() * 4000;
      const id = window.setTimeout(() => {
        playChirpBurst();
        scheduleChirp();
      }, delay);
      this.timeoutIds.push(id);
    };

    const id = window.setTimeout(() => { playChirpBurst(); scheduleChirp(); }, 1000 + Math.random() * 2000);
    this.timeoutIds.push(id);
  }

  // ── CHIMES: Gentle, occasional wind chime tones ──
  private startChimes(volume: number) {
    // Pentatonic frequencies for pleasant chimes
    const chimeFreqs = [880, 988, 1175, 1318, 1480, 1760];

    const playChime = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const gain = this.ctx.createGain();
      const dur = 1.5 + Math.random() * 2;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume * 0.18, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + dur + 0.1);
    };

    const scheduleChime = () => {
      if (!this.isPlaying) return;
      const delay = 5000 + Math.random() * 10000; // 5-15 seconds
      const id = window.setTimeout(() => {
        playChime();
        // Sometimes play 2 close together
        if (Math.random() > 0.6) {
          const id2 = window.setTimeout(playChime, 200 + Math.random() * 500);
          this.timeoutIds.push(id2);
        }
        scheduleChime();
      }, delay);
      this.timeoutIds.push(id);
    };

    const id = window.setTimeout(() => { playChime(); scheduleChime(); }, 3000 + Math.random() * 5000);
    this.timeoutIds.push(id);
  }

  // ── STREAM: Gentle babbling water ──
  private startStream(volume: number, filterFreq: number) {
    const buffer = this.createNoiseBuffer(8, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq || 2000, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.6, this.ctx.currentTime);

    // Two LFOs for babbling texture
    const lfo1 = this.ctx.createOscillator();
    lfo1.type = 'sine';
    lfo1.frequency.setValueAtTime(1.5 + Math.random() * 0.5, this.ctx.currentTime);
    const lfo1Gain = this.ctx.createGain();
    lfo1Gain.gain.setValueAtTime(volume * 0.08, this.ctx.currentTime);
    lfo1.connect(lfo1Gain);

    const lfo2 = this.ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.setValueAtTime(0.3, this.ctx.currentTime);
    const lfo2Gain = this.ctx.createGain();
    lfo2Gain.gain.setValueAtTime(volume * 0.06, this.ctx.currentTime);
    lfo2.connect(lfo2Gain);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.35, this.ctx.currentTime);
    lfo1Gain.connect(gain.gain);
    lfo2Gain.connect(gain.gain);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    lfo1.start();
    lfo2.start();
    this.sources.push(source, lfo1, lfo2);
  }

  // ── NIGHT BUGS: Distant insect hum — very subtle ──
  private startNightBugs(volume: number, filterFreq: number) {
    const buffer = this.createNoiseBuffer(6, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq || 3000, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime); // Narrow band

    // Slow pulsation
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.5, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(volume * 0.12, this.ctx.currentTime);
    lfo.connect(lfoGain);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.25, this.ctx.currentTime);
    lfoGain.connect(gain.gain);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    lfo.start();
    this.sources.push(source, lfo);
  }

  start(layers: AmbienceLayer[]) {
    this.isPlaying = true;

    for (const layer of layers) {
      switch (layer.type) {
        case 'rain': this.startRain(layer.volume, layer.filterFreq || 2200); break;
        case 'heavyrain': this.startRain(layer.volume * 1.1, (layer.filterFreq || 2800)); break;
        case 'lightrain': this.startLightRain(layer.volume, layer.filterFreq || 1800); break;
        case 'thunder': this.startThunder(layer.volume); break;
        case 'wind': this.startWind(layer.volume, layer.filterFreq || 600); break;
        case 'fire': this.startFire(layer.volume, layer.filterFreq || 1500); break;
        case 'birds': this.startBirds(layer.volume, layer.filterFreq || 5000); break;
        case 'waves': this.startWaves(layer.volume, layer.filterFreq || 1600); break;
        case 'cafechatter': this.startCafeChatter(layer.volume, layer.filterFreq || 1500); break;
        case 'trainrumble': this.startTrainRumble(layer.volume, layer.filterFreq || 250); break;
        case 'vhsstatic': this.startVhsStatic(layer.volume, layer.filterFreq || 2500); break;
        case 'crickets': this.startCrickets(layer.volume, layer.filterFreq || 4500); break;
        case 'chimes': this.startChimes(layer.volume); break;
        case 'stream': this.startStream(layer.volume, layer.filterFreq || 2000); break;
        case 'nightbugs': this.startNightBugs(layer.volume, layer.filterFreq || 3000); break;
      }
    }
  }

  fadeIn(duration: number) {
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(1.0, now + duration);
  }

  async fadeOut(duration: number) {
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + duration);
    return new Promise<void>(resolve => setTimeout(resolve, duration * 1000));
  }

  stop() {
    this.isPlaying = false;
    this.intervalIds.forEach(id => clearInterval(id));
    this.intervalIds = [];
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];

    this.sources.forEach(s => { try { s.stop(); } catch {} });
    this.sources = [];
  }

  destroy() {
    this.stop();
    try { this.masterGain.disconnect(); } catch {}
  }
}

// ─── Lofi Track Player ──────────────────────────────────────────

class LofiTrackPlayer {
  private ctx: AudioContext;
  private masterGain: GainNode;
  private config: TrackConfig;
  private isPlaying = false;
  private intervalIds: number[] = [];
  private currentChordIndex = 0;
  private noiseNode: AudioBufferSourceNode | null = null;

  constructor(ctx: AudioContext, destination: AudioNode, config: TrackConfig) {
    this.ctx = ctx;
    this.config = config;
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
    this.masterGain.connect(destination);
  }

  fadeIn(duration: number) {
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(1.0, now + duration);
  }

  async fadeOut(duration: number) {
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + duration);
    return new Promise<void>(resolve => setTimeout(resolve, duration * 1000));
  }

  private voiceChord(chord: number[]): number[] {
    const v = this.config.chordVoicing;
    if (v === 'spread') return [chord[0] / 2, chord[1], chord[2], chord[3] * 1.01];
    if (v === 'close') return [...chord];
    if (v === 'drop2') return [chord[1] / 2, chord[0], chord[2], chord[3]];
    if (v === 'rootless') return [chord[1], chord[2], chord[3], chord[1] * 2.01];
    if (v === 'open') return [chord[0] / 2, chord[2], chord[1] * 2, chord[3]];
    if (v === 'stacked') return [chord[0], chord[1], chord[2], chord[3]];
    return chord;
  }

  private playChord(chord: number[], startTime: number) {
    const voiced = this.voiceChord(chord);
    voiced.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = this.config.waveform;
      osc.frequency.setValueAtTime(freq, startTime);
      osc.detune.setValueAtTime(Math.random() * 12 - 6, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(this.config.filterCutoff, startTime);

      const dur = (60 / this.config.bpm) * 3.8;
      oscGain.gain.setValueAtTime(0, startTime);
      oscGain.gain.linearRampToValueAtTime(0.03, startTime + 0.05);
      oscGain.gain.setValueAtTime(0.03, startTime + dur * 0.3);
      oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.masterGain);

      const humanize = Math.random() * 0.015;
      osc.start(startTime + humanize + i * 0.008);
      osc.stop(startTime + dur + 0.1);
    });
  }

  private playBass(rootFreq: number, startTime: number) {
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    const freq = rootFreq / this.config.bassOctave;
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, startTime);

    const dur = (60 / this.config.bpm) * 2;
    oscGain.gain.setValueAtTime(0, startTime);
    oscGain.gain.linearRampToValueAtTime(0.06, startTime + 0.03);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + dur + 0.1);
  }

  private playKick(startTime: number, soft = false) {
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(soft ? 120 : 150, startTime);
    osc.frequency.exponentialRampToValueAtTime(soft ? 25 : 30, startTime + 0.15);

    oscGain.gain.setValueAtTime(soft ? 0.25 : 0.35, startTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + (soft ? 0.2 : 0.3));

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.35);
  }

  private playSnare(startTime: number, softness = 1) {
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 4);
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2500 + Math.random() * 1000, startTime);
    filter.Q.setValueAtTime(1, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08 * softness, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, startTime);
    osc.frequency.exponentialRampToValueAtTime(90, startTime + 0.05);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.08 * softness, startTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    source.start(startTime);
    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  private playHiHat(startTime: number, open = false) {
    const bufferSize = this.ctx.sampleRate * (open ? 0.15 : 0.04);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, open ? 3 : 10);
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6000 + Math.random() * 3000, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(open ? 0.05 : 0.03, startTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(startTime);
  }

  private playRimclick(startTime: number) {
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, startTime);
    osc.frequency.exponentialRampToValueAtTime(400, startTime + 0.02);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.06, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + 0.05);
  }

  private playBrush(startTime: number) {
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2) * 0.5;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(4000, startTime);
    filter.Q.setValueAtTime(0.5, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.03, startTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start(startTime);
  }

  private scheduleDrums(beatDuration: number) {
    const style = this.config.drumStyle;
    const sw = this.config.swingAmount;

    const drumLoop = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;

      switch (style) {
        case 'boom':
          this.playKick(now);
          this.playKick(now + beatDuration * 2);
          this.playSnare(now + beatDuration);
          this.playSnare(now + beatDuration * 3);
          for (let i = 0; i < 8; i++) {
            const t = now + (beatDuration / 2) * i;
            const swing = i % 2 === 1 ? sw : 0;
            if (Math.random() > 0.12) this.playHiHat(t + swing, i % 4 === 2 && Math.random() > 0.7);
          }
          break;

        case 'boom90':
          this.playKick(now);
          this.playKick(now + beatDuration * 1.5);
          this.playKick(now + beatDuration * 2.5);
          this.playSnare(now + beatDuration + sw);
          this.playSnare(now + beatDuration * 3 + sw);
          for (let i = 0; i < 8; i++) {
            const t = now + (beatDuration / 2) * i;
            const swing = i % 2 === 1 ? sw * 1.5 : 0;
            if (Math.random() > 0.1) this.playHiHat(t + swing, i === 4);
          }
          if (Math.random() > 0.5) this.playSnare(now + beatDuration * 2.75, 0.3);
          break;

        case 'soft':
          this.playKick(now, true);
          this.playKick(now + beatDuration * 2.5, true);
          this.playSnare(now + beatDuration, 0.6);
          this.playSnare(now + beatDuration * 3, 0.5);
          for (let i = 0; i < 8; i++) {
            if (Math.random() > 0.2) {
              this.playHiHat(now + (beatDuration / 2) * i + (i % 2 === 1 ? sw : 0));
            }
          }
          break;

        case 'minimal':
          this.playKick(now, true);
          if (Math.random() > 0.3) this.playKick(now + beatDuration * 2, true);
          if (Math.random() > 0.4) this.playSnare(now + beatDuration * 3, 0.4);
          for (let i = 0; i < 4; i++) {
            if (Math.random() > 0.3) this.playHiHat(now + beatDuration * i);
          }
          break;

        case 'jazzy':
          this.playKick(now);
          this.playKick(now + beatDuration * 2);
          this.playRimclick(now + beatDuration + sw);
          this.playRimclick(now + beatDuration * 3 + sw);
          this.playBrush(now + beatDuration * 0.5);
          this.playBrush(now + beatDuration * 1.5);
          this.playBrush(now + beatDuration * 2.5);
          this.playBrush(now + beatDuration * 3.5);
          for (let i = 0; i < 8; i++) {
            const t = now + (beatDuration / 2) * i;
            if (Math.random() > 0.15) this.playHiHat(t + (i % 2 === 1 ? sw * 1.5 : 0), Math.random() > 0.8);
          }
          break;

        case 'tape':
          this.playKick(now, true);
          if (Math.random() > 0.4) this.playKick(now + beatDuration * 2, true);
          this.playSnare(now + beatDuration, 0.5);
          this.playSnare(now + beatDuration * 3, 0.4);
          for (let i = 0; i < 6; i++) {
            if (Math.random() > 0.25) this.playHiHat(now + (beatDuration / 1.5) * i + (i % 2 === 1 ? sw : 0));
          }
          break;

        case 'dusty':
          this.playKick(now);
          this.playKick(now + beatDuration * 2);
          this.playSnare(now + beatDuration + sw, 0.7);
          this.playSnare(now + beatDuration * 3 + sw, 0.6);
          for (let i = 0; i < 8; i++) {
            const t = now + (beatDuration / 2) * i;
            if (Math.random() > 0.18) this.playHiHat(t + (i % 2 === 1 ? sw : 0));
          }
          if (Math.random() > 0.5) this.playRimclick(now + beatDuration * 1.5);
          break;

        case 'airy':
          if (Math.random() > 0.3) this.playKick(now, true);
          if (Math.random() > 0.6) this.playBrush(now + beatDuration * 2);
          for (let i = 0; i < 4; i++) {
            if (Math.random() > 0.5) this.playHiHat(now + beatDuration * i, Math.random() > 0.6);
          }
          break;

        case 'brushes':
          this.playKick(now, true);
          if (Math.random() > 0.3) this.playKick(now + beatDuration * 2, true);
          this.playBrush(now + beatDuration * 0.5);
          this.playBrush(now + beatDuration * 1);
          this.playBrush(now + beatDuration * 1.5);
          this.playBrush(now + beatDuration * 2.5);
          this.playBrush(now + beatDuration * 3);
          this.playBrush(now + beatDuration * 3.5);
          if (Math.random() > 0.4) this.playRimclick(now + beatDuration * 3);
          break;

        case 'lofi90':
          this.playKick(now);
          this.playKick(now + beatDuration * 2);
          if (Math.random() > 0.6) this.playKick(now + beatDuration * 3.5);
          this.playSnare(now + beatDuration);
          this.playSnare(now + beatDuration * 3);
          for (let i = 0; i < 8; i++) {
            const t = now + (beatDuration / 2) * i;
            if (Math.random() > 0.08) this.playHiHat(t + (i % 2 === 1 ? sw : 0));
          }
          if (Math.random() > 0.6) this.playRimclick(now + beatDuration * 2.5);
          break;

        case 'gentle':
          if (Math.random() > 0.2) this.playKick(now, true);
          if (Math.random() > 0.5) this.playKick(now + beatDuration * 2, true);
          if (Math.random() > 0.4) this.playBrush(now + beatDuration);
          if (Math.random() > 0.5) this.playBrush(now + beatDuration * 3);
          for (let i = 0; i < 4; i++) {
            if (Math.random() > 0.35) this.playHiHat(now + beatDuration * i + (i % 2 === 1 ? sw : 0));
          }
          break;

        case 'none':
        default:
          break;
      }
    };

    const interval = window.setInterval(drumLoop, beatDuration * 4 * 1000);
    this.intervalIds.push(interval);
  }

  private startPad() {
    if (!this.config.padEnabled || !this.config.padFreqs) return;

    const playPad = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;

      this.config.padFreqs!.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(Math.random() * 8 - 4, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300 + Math.random() * 200, now);

        const dur = 6 + Math.random() * 4;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 2);
        gain.gain.linearRampToValueAtTime(0.025, now + dur - 2);
        gain.gain.linearRampToValueAtTime(0, now + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + dur + 0.1);
      });
    };

    playPad();
    const interval = window.setInterval(playPad, 8000);
    this.intervalIds.push(interval);
  }

  private startCrackle() {
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      if (Math.random() > 0.97) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      } else {
        data[i] = (Math.random() * 2 - 1) * 0.002;
      }
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1500, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.config.crackleAmount, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    this.noiseNode = source;
  }

  private playMelody(startTime: number) {
    const scale = this.config.scale;
    const freq = scale[Math.floor(Math.random() * scale.length)] / this.config.melodyOctave;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = this.config.waveform;
    osc.frequency.setValueAtTime(freq, startTime);
    osc.detune.setValueAtTime(Math.random() * 15 - 7, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.config.filterCutoff + 200, startTime);

    const dur = 0.4 + Math.random() * 1.2;
    oscGain.gain.setValueAtTime(0, startTime);
    oscGain.gain.linearRampToValueAtTime(0.035, startTime + 0.03);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + dur + 0.05);
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentChordIndex = 0;

    const beatDuration = 60 / this.config.bpm;
    const barDuration = beatDuration * 4;

    this.startCrackle();
    this.startPad();

    const chordInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const chord = this.config.chords[this.currentChordIndex % this.config.chords.length];
      this.playChord(chord, now);
      this.playBass(chord[0], now);
      this.currentChordIndex++;
    }, barDuration * 1000);
    this.intervalIds.push(chordInterval);

    this.scheduleDrums(beatDuration);

    const melodyInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      if (Math.random() < this.config.melodyProbability) {
        const now = this.ctx.currentTime;
        const offset = Math.random() * beatDuration;
        this.playMelody(now + offset);
        if (Math.random() > 0.45) {
          this.playMelody(now + offset + beatDuration * (0.4 + Math.random() * 0.5));
        }
        if (Math.random() > 0.7) {
          this.playMelody(now + offset + beatDuration * (1.0 + Math.random() * 0.5));
        }
      }
    }, (beatDuration * 2) * 1000);
    this.intervalIds.push(melodyInterval);

    // Play first chord immediately
    const chord = this.config.chords[0];
    this.playChord(chord, this.ctx.currentTime);
    this.playBass(chord[0], this.ctx.currentTime);
    this.currentChordIndex = 1;
  }

  stop() {
    this.isPlaying = false;
    this.intervalIds.forEach(id => clearInterval(id));
    this.intervalIds = [];

    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch {}
      this.noiseNode = null;
    }
  }

  destroy() {
    this.stop();
    try { this.masterGain.disconnect(); } catch {}
  }
}

// ─── Main Engine ─────────────────────────────────────────────

export class LofiEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private currentTrack: LofiTrackPlayer | null = null;
  private currentAmbience: AmbiencePlayer | null = null;
  private currentVibe: VibeId = 'midnight';
  private isPlaying = false;
  private volume = 0.5;
  private ambienceVolume = 0.6;
  private transitioning = false;

  getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  private ensureNodes() {
    if (!this.masterGain) {
      const ctx = this.getContext();
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
      this.masterGain.connect(ctx.destination);

      this.musicGain = ctx.createGain();
      this.musicGain.gain.setValueAtTime(1.0, ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.ambienceGain = ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(this.ambienceVolume, ctx.currentTime);
      this.ambienceGain.connect(this.masterGain);
    }
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.getContext().currentTime);
    }
  }

  setAmbienceVolume(v: number) {
    this.ambienceVolume = Math.max(0, Math.min(1, v));
    if (this.ambienceGain) {
      this.ambienceGain.gain.setValueAtTime(this.ambienceVolume, this.getContext().currentTime);
    }
  }

  getVolume() { return this.volume; }
  getAmbienceVolume() { return this.ambienceVolume; }
  getIsPlaying() { return this.isPlaying; }
  getCurrentVibe() { return this.currentVibe; }

  async switchVibe(vibe: VibeId) {
    if (vibe === this.currentVibe && this.currentTrack) return;
    if (this.transitioning) return;

    this.currentVibe = vibe;

    if (!this.isPlaying) return;

    this.transitioning = true;

    const ctx = this.getContext();
    if (ctx.state === 'suspended') await ctx.resume();
    this.ensureNodes();

    const config = TRACK_CONFIGS[vibe];
    const fadeTime = 2.5;

    // Crossfade Music
    const newTrack = new LofiTrackPlayer(ctx, this.musicGain!, config);
    newTrack.start();

    if (this.currentTrack) {
      this.currentTrack.fadeOut(fadeTime);
      const oldTrack = this.currentTrack;
      setTimeout(() => { oldTrack.destroy(); }, fadeTime * 1000 + 500);
    }
    newTrack.fadeIn(fadeTime);
    this.currentTrack = newTrack;

    // Crossfade Ambience
    const newAmbience = new AmbiencePlayer(ctx, this.ambienceGain!);
    newAmbience.start(config.ambience);

    if (this.currentAmbience) {
      this.currentAmbience.fadeOut(fadeTime);
      const oldAmb = this.currentAmbience;
      setTimeout(() => { oldAmb.destroy(); }, fadeTime * 1000 + 500);
    }
    newAmbience.fadeIn(fadeTime + 1.0);
    this.currentAmbience = newAmbience;

    this.transitioning = false;
  }

  async start(vibe?: VibeId) {
    if (vibe) this.currentVibe = vibe;
    if (this.isPlaying) return;

    const ctx = this.getContext();
    if (ctx.state === 'suspended') await ctx.resume();
    this.ensureNodes();

    this.isPlaying = true;

    const config = TRACK_CONFIGS[this.currentVibe];

    this.currentTrack = new LofiTrackPlayer(ctx, this.musicGain!, config);
    this.currentTrack.start();
    this.currentTrack.fadeIn(1.5);

    this.currentAmbience = new AmbiencePlayer(ctx, this.ambienceGain!);
    this.currentAmbience.start(config.ambience);
    this.currentAmbience.fadeIn(2.5);
  }

  async stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.currentTrack) {
      await this.currentTrack.fadeOut(1.0);
      this.currentTrack.destroy();
      this.currentTrack = null;
    }

    if (this.currentAmbience) {
      await this.currentAmbience.fadeOut(1.5);
      this.currentAmbience.destroy();
      this.currentAmbience = null;
    }
  }

  async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      await this.stop();
    } else {
      await this.start();
    }
    return this.isPlaying;
  }
}

export const lofiEngine = new LofiEngine();
