/**
 * Manages vantage and subject markers on the Cesium scene.
 */
import { useEffect, useRef } from 'react'
import * as Cesium from 'cesium'
import { useAppStore } from '@/store/appStore'
import { isInSensitiveZone, type SensitiveAreasGeoJson } from '@/lib/geojsonUtils'
import type { LatLng } from '@/types/parks'

export function useMarkers(sensitiveAreas: SensitiveAreasGeoJson | null) {
  const viewer        = useAppStore(s => s.mapInstance) as unknown as Cesium.Viewer | null
  const markerMode    = useAppStore(s => s.markerMode)
  const vantageMarker = useAppStore(s => s.vantageMarker)
  const subjectMarker = useAppStore(s => s.subjectMarker)
  const placeMarker   = useAppStore(s => s.placeMarker)

  const vantageEntityRef = useRef<Cesium.Entity | null>(null)
  const subjectEntityRef = useRef<Cesium.Entity | null>(null)
  const clickHandlerRef  = useRef<Cesium.ScreenSpaceEventHandler | null>(null)

  // ── Click listener ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return

    if (clickHandlerRef.current && !clickHandlerRef.current.isDestroyed()) {
      clickHandlerRef.current.destroy()
      clickHandlerRef.current = null
    }

    if (!markerMode) return

    clickHandlerRef.current = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    clickHandlerRef.current.setInputAction((e: { position: Cesium.Cartesian2 }) => {
      const pos = viewer.scene.pickPosition(e.position)
               ?? viewer.camera.pickEllipsoid(e.position, viewer.scene.globe.ellipsoid)
      if (!pos) return
      const carto = Cesium.Cartographic.fromCartesian(pos)
      const coords: LatLng = {
        lat: Cesium.Math.toDegrees(carto.latitude),
        lng: Cesium.Math.toDegrees(carto.longitude),
      }
      placeMarker(coords, sensitiveAreas ? isInSensitiveZone(coords, sensitiveAreas) : false)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    return () => {
      if (clickHandlerRef.current && !clickHandlerRef.current.isDestroyed()) {
        clickHandlerRef.current.destroy()
        clickHandlerRef.current = null
      }
    }
  }, [viewer, markerMode, sensitiveAreas, placeMarker])

  // ── Vantage marker ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return
    if (!vantageMarker) {
      if (vantageEntityRef.current) viewer.entities.remove(vantageEntityRef.current)
      vantageEntityRef.current = null
      return
    }
    const position = Cesium.Cartesian3.fromDegrees(vantageMarker.coords.lng, vantageMarker.coords.lat)
    if (vantageEntityRef.current) {
      vantageEntityRef.current.position = new Cesium.ConstantPositionProperty(position)
    } else {
      vantageEntityRef.current = viewer.entities.add({
        position,
        point: { pixelSize: 16, color: Cesium.Color.fromCssColorString('#f59e0b'), outlineColor: Cesium.Color.WHITE, outlineWidth: 2, disableDepthTestDistance: Number.POSITIVE_INFINITY },
        name: 'Vantage Point',
      })
    }
  }, [viewer, vantageMarker])

  // ── Subject marker ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return
    if (!subjectMarker) {
      if (subjectEntityRef.current) viewer.entities.remove(subjectEntityRef.current)
      subjectEntityRef.current = null
      return
    }
    const position = Cesium.Cartesian3.fromDegrees(subjectMarker.coords.lng, subjectMarker.coords.lat)
    if (subjectEntityRef.current) {
      subjectEntityRef.current.position = new Cesium.ConstantPositionProperty(position)
    } else {
      subjectEntityRef.current = viewer.entities.add({
        position,
        point: { pixelSize: 16, color: Cesium.Color.fromCssColorString('#60a5fa'), outlineColor: Cesium.Color.WHITE, outlineWidth: 2, disableDepthTestDistance: Number.POSITIVE_INFINITY },
        name: 'Subject',
      })
    }
  }, [viewer, subjectMarker])
}
