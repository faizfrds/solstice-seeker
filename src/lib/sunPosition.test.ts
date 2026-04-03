import { describe, it, expect } from 'vitest'
import { sunCalcAzimuthToCompass, getSunPosition, getSunTimes } from './sunPosition'

describe('sunPosition', () => {
  describe('sunCalcAzimuthToCompass', () => {
    it('converts suncalc south-based radial to standard compass degrees', () => {
      // 0 rad = South = 180 deg
      expect(sunCalcAzimuthToCompass(0)).toBeCloseTo(180)
      // Math.PI rad = North = 0 deg
      expect(sunCalcAzimuthToCompass(Math.PI)).toBeCloseTo(0)
      expect(sunCalcAzimuthToCompass(-Math.PI)).toBeCloseTo(0)
      // Math.PI/2 rad = West = 270 deg (since suncalc increases westward)
      expect(sunCalcAzimuthToCompass(Math.PI / 2)).toBeCloseTo(270)
      // -Math.PI/2 rad = East = 90 deg
      expect(sunCalcAzimuthToCompass(-Math.PI / 2)).toBeCloseTo(90)
    })
  })

  describe('getSunPosition', () => {
    it('returns position with proper compass degrees and altitude check', () => {
      // Mock SunCalc just to verify transformation logic
      const date = new Date('2024-03-20T12:00:00Z') // Equinox noon ish
      const lat = 0 // Equator
      const lng = 0
      
      const pos = getSunPosition(date, lat, lng)
      expect(pos).toHaveProperty('altitudeDeg')
      expect(pos).toHaveProperty('azimuthDeg')
      expect(pos).toHaveProperty('isAboveHorizon')
      expect(pos).toHaveProperty('isGoldenHour')
      
      expect(typeof pos.altitudeDeg).toBe('number')
      expect(typeof pos.azimuthDeg).toBe('number')
    })
  })

  describe('getSunTimes', () => {
    it('returns proper sun times object', () => {
      const date = new Date('2024-06-21T00:00:00Z') // Solstice
      const lat = 37.2982 // Zion approx
      const lng = -113.0263
      
      const times = getSunTimes(date, lat, lng)
      expect(times).toHaveProperty('sunrise')
      expect(times).toHaveProperty('sunset')
      expect(times).toHaveProperty('goldenHourStart')
      expect(times).toHaveProperty('goldenHourEnd')
      expect(times).toHaveProperty('solarNoon')
      
      // Basic sanity check
      expect(times.sunrise).toBeInstanceOf(Date)
      expect(times.sunset).toBeInstanceOf(Date)
    })
  })
})
