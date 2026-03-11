# 🛋️ LofiCouch

> Your cozy corner for lofi beats and ambient relaxation

![LofiCouch Preview](https://img.shields.io/badge/Vibes-13%20Unique%20Scenes-purple?style=for-the-badge)
![Made with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwindcss)

A beautiful, immersive lofi music experience with **procedurally generated beats** and **ambient soundscapes**. No external audio files — everything is synthesized in real-time using the Web Audio API.

## ✨ Features

### 🎵 13 Unique Vibes & Tracks

| Vibe | Track Name | BPM | Mood |
|------|------------|-----|------|
| 🌃 Midnight City | *Midnight Rain* | 72 | Dark, urban, rainy |
| 🌅 Golden Hour | *Sunset Drive* | 78 | Warm, mellow, nostalgic |
| 🌲 Enchanted Forest | *Mystic Woods* | 65 | Mystical, nature |
| 🌊 Ocean Waves | *Tidal Dreams* | 60 | Calm, flowing |
| ☕ Cozy Café | *Coffee & Jazz* | 85 | Upbeat, jazzy |
| 🌸 Cherry Blossom | *Sakura Breeze* | 68 | Japanese-inspired |
| ❄️ Winter Cabin | *Snowfall* | 62 | Cozy, warm |
| 🚀 Space Station | *Zero Gravity* | 55 | Cosmic, ambient |
| 📼 Faded Memories | *Nostalgic VHS* | 70 | 80s/90s nostalgic |
| 📻 90's Boom Bap | *Boom Bap Beat* | 88 | Hip-hop, vinyl |
| 🏯 Spirit Garden | *Ghibli Inspired* | 72 | Whimsical, nature |
| 📚 Quiet Library | *Quiet Pages* | 65 | Study, focus |
| 🚂 Starlit Express | *Night Train* | 74 | Journey, dreamy |

### 🎧 Procedural Audio Engine

- **Real-time music synthesis** — Piano, bass, drums, and melodies generated on-the-fly
- **Unique chord progressions** per vibe (jazz, lo-fi, J-pop inspired)
- **Vinyl warmth** — Crackle, noise, and analog character
- **Humanized timing** — Natural swing and micro-timing variations

### 🌧️ Ambient Sound Layers

Each vibe includes carefully mixed ambient layers:
- 🌧️ Rain (soothing rainfall, light drizzle)
- ⚡ Distant thunder
- 🔥 Fireplace crackling
- 🐦 Birds chirping
- 🌊 Ocean waves
- 👥 Café chatter
- 🚃 Train rumble
- 📺 VHS tape hiss
- 🦗 Crickets & night bugs
- 💨 Wind gusts
- 🔔 Wind chimes
- 💧 Flowing stream

### 🎨 Visual Experience

- **Animated SVG scenes** for each vibe
- **Particle systems** — Rain, snow, fireflies, cherry blossoms, stars
- **Smooth crossfade transitions** between vibes (2.5s audio + 1s visual)
- **Vinyl record animation** with spinning platter and tonearm
- **Real-time audio visualizer**

### 🛠️ Productivity Tools

- ⏰ **Clock-Style Focus Timer** — Drag the dial to set 1-60 minutes, or use preset buttons (5m, 15m, 25m, 45m, 60m)
- ✅ **Todo List** — Persistent task management (localStorage)
- 🕐 **Live Clock** — Current time and date display
- 💭 **Rotating Quotes** — Calming, inspirational messages

## 🚀 Quick Start

### Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/loficouch.git
cd loficouch

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output in ./dist folder
```

## 📦 Deploy to GitHub Pages

This project is configured for **automatic deployment** to GitHub Pages.

### One-Time Setup

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/loficouch.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Under "Build and deployment", select **GitHub Actions**
   - That's it! The workflow will run automatically.

3. **Access your site**
   - Wait 1-2 minutes for the build
   - Visit: `https://YOUR_USERNAME.github.io/loficouch/`

### Manual Deployment

You can also trigger a deployment manually:
- Go to **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

## 🎛️ Tech Stack

- **React 19** — UI framework
- **Vite 7** — Build tool
- **Tailwind CSS 4** — Styling
- **Web Audio API** — Procedural audio synthesis
- **TypeScript** — Type safety
- **Lucide React** — Icons

## 📂 Project Structure

```
loficouch/
├── src/
│   ├── App.tsx              # Main app with all vibes/scenes
│   ├── lofiEngine.ts        # Audio synthesis engine
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles & animations
│   ├── components/
│   │   ├── MusicPlayer.tsx  # Vinyl player UI
│   │   ├── SceneSelector.tsx # Vibe picker
│   │   ├── ParticleEffect.tsx # Rain/snow/fireflies
│   │   ├── RainEffect.tsx   # Rain canvas
│   │   ├── Clock.tsx        # Time display
│   │   ├── QuoteDisplay.tsx # Rotating quotes
│   │   ├── TodoWidget.tsx   # Task list
│   │   └── ClockTimer.tsx   # Draggable focus timer
│   └── utils/
│       └── cn.ts            # Class name utility
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Customization

### Add a New Vibe

1. Add track config in `lofiEngine.ts`:
   ```typescript
   'your-vibe': {
     name: 'Your Vibe',
     bpm: 75,
     key: 'Am',
     chordProgression: ['Am7', 'Dm7', 'G7', 'Cmaj7'],
     // ... more options
   }
   ```

2. Add ambience config in the same file
3. Add scene in `App.tsx` with background gradient and SVG elements
4. Add to `VIBES` array in `SceneSelector.tsx`

### Adjust Ambience Volumes

Edit the `ambienceConfigs` object in `lofiEngine.ts`. Each layer has:
- `type` — Sound type (rain, fire, birds, etc.)
- `volume` — Base volume (0.0 - 1.0)
- Additional parameters per type

## 🙏 Credits

- Inspired by lofi hip hop radio streams
- Studio Ghibli films for the magical atmosphere
- 90s boom bap and vaporwave aesthetics

## 📄 License

MIT License — Feel free to use, modify, and share!

---

<p align="center">
  Made with ☕ and 🎵 by lofi lovers
  <br>
  <a href="https://github.com/YOUR_USERNAME/loficouch">⭐ Star on GitHub</a>
</p>
