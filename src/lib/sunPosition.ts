/**
 * Pure wrapper around SunCalc.
 *
 * SunCalc conventions (important!):
 *   - altitude: radians from horizon, positive = above
 *   - azimuth:  radians from SOUTH, increasing WESTWARD
 *
 * We normalise to compass degrees (0 = North, clockwise) before returning.
 */
import SunCalc from 'suncalc'
import type { SunPosition, SunTimes, RawSunPosition } from '@/types/sun'

const RAD_TO_DEG = 180 / Math.PI
const GOLDEN_HOUR_THRESHOLD_DEG = 6

/**
 * Converts SunCalc's south-referenced azimuth (radians, increasing westward)
 * to a standard compass bearing (degrees, 0 = North, clockwise).
 */
export function sunCalcAzimuthToCompass(sunCalcAzimuthRad: number): number {
  // SunCalc azimuth is measured from south (+π rotates to north).
  // Clockwise vs counterclockwise: SunCalc increases westward, so negate after rotation.
  const compassRad = sunCalcAzimuthRad + Math.PI
  let deg = compassRad * RAD_TO_DEG
  // Normalise to [0, 360)
  deg = ((deg % 360) + 360) % 360
  return deg
}

/**
 * Returns the current sun position for a given location and time.
 */
export function getSunPosition(date: Date, lat: number, lng: number): SunPosition {
  const raw: RawSunPosition = SunCalc.getPosition(date, lat, lng)

  const altitudeDeg = raw.altitude * RAD_TO_DEG
  const azimuthDeg = sunCalcAzimuthToCompass(raw.azimuth)

  return {
    altitudeDeg,
    azimuthDeg,
    isAboveHorizon: altitudeDeg > 0,
    isGoldenHour: Math.abs(altitudeDeg) <= GOLDEN_HOUR_THRESHOLD_DEG,
  }
}

/**
 * Returns key solar event times for a given date and location.
 */
export function getSunTimes(date: Date, lat: number, lng: number): SunTimes {
  const times = SunCalc.getTimes(date, lat, lng)

  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    goldenHourStart: times.goldenHour,
    goldenHourEnd: times.goldenHourEnd,
    solarNoon: times.solarNoon,
  }
}
