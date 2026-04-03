/**
 * Central Zustand store.
 *
 * All reactive chains flow through here:
 *   selectedPark + datetime  →  useSunCalc  →  sunPosition  →  useRenderingOptions
 *   map click + markerMode   →  markers     →  useSensitiveAreas / useLineOfSight
 */
import { create } from 'zustand'
import type { Park, PlacedMarker, MarkerMode, LatLng } from '@/types/parks'
import type { SunPosition, SunTimes } from '@/types/sun'
import { PARKS, DEFAULT_PARK_ID, getParkById } from '@/constants/parks'

interface AppState {
  // ── Map instance (set once Maps API is ready) ──────────────────────────────
  mapInstance: any | null
  setMapInstance: (map: any) => void

  // ── Park selection ──────────────────────────────────────────────────────────
  selectedPark: Park
  setSelectedPark: (parkId: string) => void

  // ── Date/time ───────────────────────────────────────────────────────────────
  /** ISO date string YYYY-MM-DD, interpreted in the selected park's timezone */
  selectedDate: string
  /** Minutes since midnight in the selected park's local time (0–1439) */
  selectedMinutes: number
  setDate: (isoDate: string) => void
  setMinutes: (minutes: number) => void

  // ── Derived: current datetime as a UTC Date object ─────────────────────────
  /** Computed by useSunCalc from selectedDate + selectedMinutes + park timezone */
  currentDateTime: Date

  // ── Sun position ────────────────────────────────────────────────────────────
  sunPosition: SunPosition | null
  sunTimes: SunTimes | null
  setSunPosition: (pos: SunPosition) => void
  setSunTimes: (times: SunTimes) => void

  // ── Markers ─────────────────────────────────────────────────────────────────
  markerMode: MarkerMode
  setMarkerMode: (mode: MarkerMode) => void
  vantageMarker: PlacedMarker | null
  subjectMarker: PlacedMarker | null
  placeMarker: (coords: LatLng, inSensitiveZone: boolean) => void
  clearMarkers: () => void

  // ── Overlay toggles ─────────────────────────────────────────────────────────
  showGoldenRatioOverlay: boolean
  toggleGoldenRatioOverlay: () => void
  showLNTModal: boolean
  dismissLNTModal: () => void

  // ── Vantage-point coords for sun calculation ─────────────────────────────────
  /** Falls back to park centre if no vantage marker has been placed */
  activeSunCalcCoords: LatLng
}

function buildDateTime(isoDate: string, minutes: number, timezone: string): Date {
  // Construct a Date representing `isoDate` at `minutes` past midnight
  // in the park's local timezone, returned as a UTC Date.
  const [year, month, day] = isoDate.split('-').map(Number)
  const hours   = Math.floor(minutes / 60)
  const mins    = minutes % 60

  // Use Intl to find the UTC offset for this timezone at this instant.
  // We approximate by formatting a candidate UTC Date and comparing.
  const candidateUtc = new Date(Date.UTC(year, month - 1, day, hours, mins))
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  })
  const parts = Object.fromEntries(
    formatter.formatToParts(candidateUtc).map(p => [p.type, p.value])
  )
  const localHours = parseInt(parts.hour === '24' ? '0' : parts.hour, 10)
  const localMins  = parseInt(parts.minute, 10)
  const diffMins   = (hours - localHours) * 60 + (mins - localMins)
  return new Date(candidateUtc.getTime() + diffMins * 60 * 1000)
}

const todayIso = new Date().toISOString().slice(0, 10)
const defaultPark = getParkById(DEFAULT_PARK_ID)!
const defaultMinutes = 7 * 60   // 07:00 local

export const useAppStore = create<AppState>((set, get) => ({
  // ── Map ─────────────────────────────────────────────────────────────────────
  mapInstance: null,
  setMapInstance: (map) => set({ mapInstance: map }),

  // ── Park ─────────────────────────────────────────────────────────────────────
  selectedPark: defaultPark,
  setSelectedPark: (parkId) => {
    const park = getParkById(parkId) ?? defaultPark
    set({
      selectedPark: park,
      activeSunCalcCoords: park.coords,
      currentDateTime: buildDateTime(get().selectedDate, get().selectedMinutes, park.timezone),
    })
  },

  // ── Date / time ──────────────────────────────────────────────────────────────
  selectedDate: todayIso,
  selectedMinutes: defaultMinutes,
  setDate: (isoDate) => {
    const { selectedMinutes, selectedPark } = get()
    set({
      selectedDate: isoDate,
      currentDateTime: buildDateTime(isoDate, selectedMinutes, selectedPark.timezone),
    })
  },
  setMinutes: (minutes) => {
    const { selectedDate, selectedPark } = get()
    set({
      selectedMinutes: minutes,
      currentDateTime: buildDateTime(selectedDate, minutes, selectedPark.timezone),
    })
  },

  // ── Derived datetime ─────────────────────────────────────────────────────────
  currentDateTime: buildDateTime(todayIso, defaultMinutes, defaultPark.timezone),

  // ── Sun ──────────────────────────────────────────────────────────────────────
  sunPosition: null,
  sunTimes: null,
  setSunPosition: (pos) => set({ sunPosition: pos }),
  setSunTimes: (times) => set({ sunTimes: times }),

  // ── Markers ──────────────────────────────────────────────────────────────────
  markerMode: null,
  setMarkerMode: (mode) => set({ markerMode: mode }),
  vantageMarker: null,
  subjectMarker: null,
  placeMarker: (coords, inSensitiveZone) => {
    const { markerMode, selectedPark } = get()
    if (!markerMode) return

    const placed: PlacedMarker = { mode: markerMode, coords, inSensitiveZone }

    if (markerMode === 'vantage') {
      set({
        vantageMarker: placed,
        activeSunCalcCoords: coords,
        // Recalculate datetime with new reference coords (timezone unchanged; coords affect sun angle)
        markerMode: null,
        showLNTModal: inSensitiveZone,
      })
    } else {
      set({
        subjectMarker: placed,
        markerMode: null,
        showLNTModal: inSensitiveZone,
      })
    }

    void selectedPark // suppress unused warning — park timezone informs sun calc indirectly
  },
  clearMarkers: () => set({
    vantageMarker: null,
    subjectMarker: null,
    activeSunCalcCoords: get().selectedPark.coords,
  }),

  // ── Overlays ─────────────────────────────────────────────────────────────────
  showGoldenRatioOverlay: false,
  toggleGoldenRatioOverlay: () => set(s => ({ showGoldenRatioOverlay: !s.showGoldenRatioOverlay })),
  showLNTModal: false,
  dismissLNTModal: () => set({ showLNTModal: false }),

  // ── Sun calc coords ───────────────────────────────────────────────────────────
  activeSunCalcCoords: defaultPark.coords,
}))

export { PARKS }
