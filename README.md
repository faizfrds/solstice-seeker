# Solstice Seeker

A 3D terrain light simulation tool for photographers. Combines astronomical algorithms with Google Photorealistic 3D Tiles so you can preview exactly when sunlight (or shadow) will hit a specific location — on any day of the year.

## The Problem

Photographers travel hours to a National Park only to find the rock formation or valley they want to shoot is already swallowed in shadow — a nearby peak blocked the sun. Standard weather apps report horizon sunset times but ignore local terrain obstructions entirely.

## The Solution

An interactive 3D map that lets you simulate light play on specific landforms. "Time travel" through any day to see exactly when light hits a specific spot.

![Solstice Seeker Demo](<public/data/Screenshot 2026-04-02 at 22.39.20.png>)

## Features

- **Time slider** — scrub through any hour of any day; sun shadows shift in real time across 3D terrain
- **Park selector** — jump between 10 US National Parks with cinematic opening camera angles
- **Vantage + Subject markers** — pin your shooting position and subject to visualise the line of sight
- **Sun info widget** — live readout of sun altitude, azimuth, and golden hour windows
- **Golden ratio overlay** — toggleable composition grid for shot framing
- **Leave No Trace alerts** — reminder when you pin a location in a sensitive ecosystem

## Tech Stack

| Component | Technology |
|---|---|
| 3D Terrain | Cesium + Google Photorealistic 3D Tiles |
| Sun Physics | SunCalc |
| UI | React + Zustand |
| Styling | Tailwind CSS |

## Setup

### 1. Prerequisites

- Node.js 18+
- A Google Cloud project with **Maps JavaScript API** and **Map Tiles API** enabled

### 2. Get credentials

- **API Key** — Google Cloud Console → APIs & Services → Credentials
- The API key needs access to the Map Tiles API

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_GOOGLE_MAPS_MAP_ID=your_map_id_here
```

For `VITE_GOOGLE_MAPS_MAP_ID`: create a Map ID in Google Cloud Console → Google Maps Platform → Map Management. Set type to **JavaScript / Satellite** and enable **Photorealistic 3D Tiles**.

### 4. Install and run

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm test         # Run unit tests
```
