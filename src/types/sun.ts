/** Raw output from SunCalc.getPosition() — angles in radians */
export interface RawSunPosition {
  /** Angle above horizon in radians. Range: -π/2 to +π/2 */
  altitude: number
  /** Azimuth in radians from SOUTH, increasing westward (SunCalc convention) */
  azimuth: number
}

/** Normalised sun position ready for display and Maps injection */
export interface SunPosition {
  /** Altitude in degrees above horizon. Negative = below horizon */
  altitudeDeg: number
  /** Compass bearing in degrees (0 = North, 90 = East, 180 = South, 270 = West) */
  azimuthDeg: number
  /** Whether the sun is above the horizon */
  isAboveHorizon: boolean
  /** True when altitude is between -6° and +6° (golden / blue hour) */
  isGoldenHour: boolean
}

export interface SunTimes {
  sunrise: Date
  sunset: Date
  goldenHourStart: Date   // afternoon golden hour begin
  goldenHourEnd: Date     // morning golden hour end
  solarNoon: Date
}
