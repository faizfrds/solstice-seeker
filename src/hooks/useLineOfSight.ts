/**
 * Draws a polyline between vantage and subject markers when both are placed.
 */
import { useEffect, useRef } from 'react'
import * as Cesium from 'cesium'
import { useAppStore } from '@/store/appStore'

export function useLineOfSight() {
  const viewer        = useAppStore(s => s.mapInstance) as unknown as Cesium.Viewer | null
  const vantageMarker = useAppStore(s => s.vantageMarker)
  const subjectMarker = useAppStore(s => s.subjectMarker)
  const polylineRef   = useRef<Cesium.Entity | null>(null)

  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return

    if (polylineRef.current) {
      viewer.entities.remove(polylineRef.current)
      polylineRef.current = null
    }

    if (!vantageMarker || !subjectMarker) return

    polylineRef.current = viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          vantageMarker.coords.lng, vantageMarker.coords.lat,
          subjectMarker.coords.lng, subjectMarker.coords.lat,
        ]),
        width: 2,
        material: Cesium.Color.fromCssColorString('#facc15').withAlpha(0.8),
        clampToGround: true,
      },
    })

    return () => {
      if (polylineRef.current && !viewer.isDestroyed()) {
        viewer.entities.remove(polylineRef.current)
        polylineRef.current = null
      }
    }
  }, [viewer, vantageMarker, subjectMarker])
}
