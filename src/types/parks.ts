export interface LatLng {
  lat: number
  lng: number
}

export interface Park {
  id: string
  name: string
  /** IANA timezone string, e.g. "America/Denver" */
  timezone: string
  coords: LatLng
  /** Compass heading toward the park's iconic subject, used for initial camera orientation */
  heroHeading: number
  /** Camera altitude in metres above terrain for the opening fly-in */
  cameraAltitude: number
}

export type MarkerMode = 'vantage' | 'subject' | null

export interface PlacedMarker {
  mode: 'vantage' | 'subject'
  coords: LatLng
  /** Whether this marker sits inside a sensitive ecosystem zone */
  inSensitiveZone: boolean
}
