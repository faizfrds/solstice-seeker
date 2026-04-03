/**
 * Minimal GeoJSON utilities — no external dependencies.
 * Supports Point-in-Polygon via ray casting for Polygon and MultiPolygon features.
 */
import type { LatLng } from '@/types/parks'

type GeoJsonCoordPair = [number, number]         // [lng, lat]
type GeoJsonRing     = GeoJsonCoordPair[]
type GeoJsonPolygonCoords     = GeoJsonRing[]
type GeoJsonMultiPolygonCoords = GeoJsonPolygonCoords[]

interface GeoJsonPolygonGeometry {
  type: 'Polygon'
  coordinates: GeoJsonPolygonCoords
}

interface GeoJsonMultiPolygonGeometry {
  type: 'MultiPolygon'
  coordinates: GeoJsonMultiPolygonCoords
}

interface GeoJsonFeature {
  type: 'Feature'
  properties: Record<string, unknown> | null
  geometry: GeoJsonPolygonGeometry | GeoJsonMultiPolygonGeometry
}

export interface SensitiveAreasGeoJson {
  type: 'FeatureCollection'
  features: GeoJsonFeature[]
}

/**
 * Ray-casting algorithm. Returns true if `point` is inside `ring`.
 * `ring` is an array of [lng, lat] pairs (GeoJSON order).
 */
function pointInRing(point: LatLng, ring: GeoJsonRing): boolean {
  const { lat, lng } = point
  let inside = false

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]

    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi

    if (intersect) inside = !inside
  }

  return inside
}

/**
 * Returns true if `point` is inside a Polygon geometry.
 * Handles holes: point must be in the outer ring but outside all inner rings.
 */
function pointInPolygon(point: LatLng, coords: GeoJsonPolygonCoords): boolean {
  if (!pointInRing(point, coords[0])) return false
  // Holes
  for (let h = 1; h < coords.length; h++) {
    if (pointInRing(point, coords[h])) return false
  }
  return true
}

/**
 * Returns true if `point` falls inside any sensitive area polygon
 * in the provided GeoJSON FeatureCollection.
 */
export function isInSensitiveZone(
  point: LatLng,
  geojson: SensitiveAreasGeoJson
): boolean {
  for (const feature of geojson.features) {
    const { geometry } = feature

    if (geometry.type === 'Polygon') {
      if (pointInPolygon(point, geometry.coordinates)) return true
    }

    if (geometry.type === 'MultiPolygon') {
      for (const polyCoords of geometry.coordinates) {
        if (pointInPolygon(point, polyCoords)) return true
      }
    }
  }

  return false
}
