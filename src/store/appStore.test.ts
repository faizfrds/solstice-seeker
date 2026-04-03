import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore, PARKS } from './appStore'
import { DEFAULT_PARK_ID } from '@/constants/parks'

describe('appStore', () => {
  beforeEach(() => {
    // Reset store state before every test
    useAppStore.setState({
      selectedPark: PARKS.find((p) => p.id === DEFAULT_PARK_ID)!,
      selectedDate: new Date().toISOString().slice(0, 10),
      selectedMinutes: 7 * 60, // 07:00
      markerMode: null,
      vantageMarker: null,
      subjectMarker: null,
      showGoldenRatioOverlay: false,
      showLNTModal: false,
    })
  })

  it('updates selected park and relative datetime', () => {
    const store = useAppStore.getState()
    expect(store.selectedPark.id).toBe(DEFAULT_PARK_ID)

    const otherPark = PARKS.find((p) => p.id !== DEFAULT_PARK_ID)!
    useAppStore.getState().setSelectedPark(otherPark.id)

    expect(useAppStore.getState().selectedPark.id).toBe(otherPark.id)
    // activeSunCalcCoords should follow park
    expect(useAppStore.getState().activeSunCalcCoords).toEqual(otherPark.coords)
  })

  it('updates date and minutes', () => {
    useAppStore.getState().setDate('2030-01-01')
    expect(useAppStore.getState().selectedDate).toBe('2030-01-01')

    useAppStore.getState().setMinutes(600) // 10:00 AM
    expect(useAppStore.getState().selectedMinutes).toBe(600)
    
    // DateTime derived state should be updated
    const dt = useAppStore.getState().currentDateTime
    expect(dt).toBeInstanceOf(Date)
  })

  it('handles marker placement modes correctly', () => {
    // Set to vantage mode
    useAppStore.getState().setMarkerMode('vantage')
    expect(useAppStore.getState().markerMode).toBe('vantage')

    // Place a marker
    const coords = { lat: 10, lng: 20 }
    useAppStore.getState().placeMarker(coords, true)

    const state = useAppStore.getState()
    expect(state.vantageMarker).toBeDefined()
    expect(state.vantageMarker?.coords).toEqual(coords)
    expect(state.vantageMarker?.inSensitiveZone).toBe(true)
    expect(state.markerMode).toBeNull() // Should reset mode
    expect(state.showLNTModal).toBe(true) // Show modal since sensitive zone = true
    
    // active coords should be updated
    expect(state.activeSunCalcCoords).toEqual(coords)
  })

  it('clears markers and resets suncalc coords to park', () => {
    // Place vintage marker
    useAppStore.getState().setMarkerMode('vantage')
    useAppStore.getState().placeMarker({ lat: 10, lng: 20 }, false)
    
    useAppStore.getState().clearMarkers()
    
    const state = useAppStore.getState()
    expect(state.vantageMarker).toBeNull()
    expect(state.subjectMarker).toBeNull()
    expect(state.activeSunCalcCoords).toEqual(state.selectedPark.coords)
  })

  it('toggles golden ratio overlay', () => {
    expect(useAppStore.getState().showGoldenRatioOverlay).toBe(false)
    useAppStore.getState().toggleGoldenRatioOverlay()
    expect(useAppStore.getState().showGoldenRatioOverlay).toBe(true)
  })
})
