/**
 * Extends the Google Maps type declarations to cover APIs that are in preview
 * and not yet included in @types/google.maps.
 */

export interface LightSourcePosition {
  /** Altitude of the light source in degrees above horizon (0–90) */
  altitude: number
  /** Compass bearing of the light source in degrees (0 = North, clockwise) */
  azimuth: number
}

export interface LightingConfig {
  enabled: boolean
  lightSourcePosition: LightSourcePosition
}

export interface MapRenderingOptions {
  lightingConfig?: LightingConfig
}

declare global {
  namespace google.maps {
    interface Map {
      setRenderingOptions(options: MapRenderingOptions): void
    }
    /** Extended CameraOptions with 3D altitude (metres above terrain) */
    interface CameraOptions {
      altitude?: number
    }
  }
}
