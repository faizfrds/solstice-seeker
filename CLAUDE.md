# Project Solstice — claude.md

> A 3D terrain light simulation tool for photographers. Combines astronomical algorithms with photorealistic terrain data so users can preview exactly when sunlight (or shadow) will hit a specific location — on any day of the year.

---

## 01 — The Problem

**The Shadow Surprise.** Photographers travel hours to a National Park only to find the rock formation or valley they want to shoot is already swallowed in shadow — a nearby peak blocked the sun. Standard weather apps report horizon sunset times but ignore local terrain obstructions entirely.

---

## 02 — The Solution

An interactive 3D map that lets photographers simulate "light play" on specific landforms. By combining astronomical algorithms with high-resolution 3D terrain data, users can "time travel" through any day to see exactly when light hits a specific spot.

---

## 03 — Technology Stack

| Component     | Technology                    | Reason                                                                 |
|---------------|-------------------------------|------------------------------------------------------------------------|
| Map Engine    | Google Maps JavaScript API    | Photorealistic 3D Tiles for accurate terrain heights                   |
| Sun Physics   | SunCalc (JS library)          | Calculates sun position (azimuth/altitude) from date, time, lat/lng   |
| UI Framework  | React or Vue                  | Reactive time slider that updates the map view instantly               |
| Styling       | Tailwind CSS                  | Minimal dark-mode UI to preserve the user's night vision               |
| Data Overlay  | Advanced Markers              | Pin a vantage point and subject to visualize line of sight             |

---

## 04 — Implementation Logic

The core "magic" happens in how the app handles sun position relative to the 3D camera.

### Step 1 — Coordinate sync
When a user selects a park (e.g. Zion), the map centers on its coordinates automatically.

### Step 2 — Solar calculation
Sun position is derived using altitude `a` and azimuth `α`:

```
a = arcsin(sinφ sinδ + cosφ cosδ cosH)
```

Where:
- `φ` = latitude
- `δ` = solar declination
- `H` = hour angle

### Step 3 — 3D light simulation
Google Maps 3D Tiles render shadows from a configurable light source. Call `setRenderingOptions` to move that light source to match the calculated `a` and `α` values in real time.

---

## 05 — Tradeoffs & Decisions

### A — Web vs. native app
**Decision:** Web-based.

Loses some offline capability (critical in parks without cell service), but gains full access to Photorealistic 3D Tiles — heavy assets better handled by modern browser hardware acceleration.

### B — Real-time shadows vs. baked data
**Decision:** Real-time shadow rendering via the API.

More GPU-intensive for the user, but allows the date to be changed to any day of the year — enabling trip planning six months out. Baked shadows cannot support this flexibility.

### C — Detail vs. performance
**Decision:** Limit the 3D rendering radius to 5 km.

3D tiles consume API credits and bandwidth. Limiting high-detail rendering to a 5 km radius around the user's pin keeps the app snappy and avoids crashing mobile browsers.

---

## 06 — Vibe Features

- **Golden ratio overlay** — Toggleable composition grid on the map for "God's eye" shot framing.
- **Social stewardship** — A Leave No Trace reminder when a user pins a location known to be a fragile ecosystem, using a custom GeoJSON layer of sensitive areas.
- **Glassmorphism UI** — Semi-transparent control panel so beautiful 3D terrain peeks through the menus.
