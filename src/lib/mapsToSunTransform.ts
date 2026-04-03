/**
 * Translates a normalised SunPosition into the shape expected by
 * google.maps.Map.setRenderingOptions({ lightingConfig }).
 *
 * Google Maps expects:
 *   altitude  — degrees above horizon (0 at horizon, 90 at zenith)
 *   azimuth   — compass bearing in degrees (0 = North, clockwise)
 *
 * Our SunPosition already uses these conventions after normalisation in
 * sunPosition.ts, so this file is mostly a structural mapping plus
 * clamping for below-horizon cases.
 */
import type { SunPosition } from '@/types/sun'
import type { MapRenderingOptions } from '@/types/maps'

/** Minimum effective altitude sent to Maps when sun is near/below horizon */
const MIN_ALTITUDE_DEG = 0.5

/**
 * Builds the renderingOptions object for setRenderingOptions().
 * When the sun is below the horizon the lighting is disabled.
 */
export function buildRenderingOptions(sun: SunPosition): MapRenderingOptions {
  if (!sun.isAboveHorizon) {
    return { lightingConfig: { enabled: false, lightSourcePosition: { altitude: 0, azimuth: 0 } } }
  }

  return {
    lightingConfig: {
      enabled: true,
      lightSourcePosition: {
        // Clamp so the light never sits exactly at the horizon (causes rendering artefacts)
        altitude: Math.max(sun.altitudeDeg, MIN_ALTITUDE_DEG),
        azimuth: sun.azimuthDeg,
      },
    },
  }
}
