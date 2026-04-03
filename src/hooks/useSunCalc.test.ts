import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSunCalc } from './useSunCalc'
import { useAppStore } from '@/store/appStore'
import * as sunPositionModule from '@/lib/sunPosition'

vi.mock('@/lib/sunPosition', () => ({
  getSunPosition: vi.fn(),
  getSunTimes: vi.fn()
}))

describe('useSunCalc', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAppStore.setState({
      currentDateTime: new Date('2024-03-20T12:00:00Z'),
      activeSunCalcCoords: { lat: 37, lng: -113 },
      setSunPosition: vi.fn(),
      setSunTimes: vi.fn()
    })
  })

  it('computes sun position and times and calls setters on mount/change', () => {
    const mockPos = { altitudeDeg: 45, azimuthDeg: 180, isAboveHorizon: true, isGoldenHour: false }
    const mockTimes = { sunrise: new Date(), sunset: new Date(), goldenHourStart: new Date(), goldenHourEnd: new Date(), solarNoon: new Date() }
    
    vi.mocked(sunPositionModule.getSunPosition).mockReturnValue(mockPos)
    vi.mocked(sunPositionModule.getSunTimes).mockReturnValue(mockTimes)

    renderHook(() => useSunCalc())

    const state = useAppStore.getState()
    
    expect(sunPositionModule.getSunPosition).toHaveBeenCalledWith(state.currentDateTime, state.activeSunCalcCoords.lat, state.activeSunCalcCoords.lng)
    expect(sunPositionModule.getSunTimes).toHaveBeenCalledWith(state.currentDateTime, state.activeSunCalcCoords.lat, state.activeSunCalcCoords.lng)
    
    expect(state.setSunPosition).toHaveBeenCalledWith(mockPos)
    expect(state.setSunTimes).toHaveBeenCalledWith(mockTimes)
  })
})
