/**
 * Fetches the sensitive-areas GeoJSON once on mount and returns it
 * for use by useMarkers.
 */
import { useState, useEffect } from 'react'
import type { SensitiveAreasGeoJson } from '@/lib/geojsonUtils'

export function useSensitiveAreas(): SensitiveAreasGeoJson | null {
  const [data, setData] = useState<SensitiveAreasGeoJson | null>(null)

  useEffect(() => {
    fetch('/data/sensitive-areas.geojson')
      .then(r => r.json())
      .then((json: SensitiveAreasGeoJson) => setData(json))
      .catch(err => console.warn('[useSensitiveAreas] Failed to load GeoJSON:', err))
    // TODO: if moved to an external CDN, the server must return CORS headers
  }, [])

  return data
}
