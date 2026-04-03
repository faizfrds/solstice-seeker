/**
 * Drives Cesium's sun position by syncing the viewer clock to currentDateTime.
 *
 * Cesium computes the sun direction automatically from the simulation time, so
 * setting clock.currentTime is all that's needed to shift shadows on the terrain.
 */
import { useEffect } from 'react'
import * as Cesium from 'cesium'
import { useAppStore } from '@/store/appStore'

export function useRenderingOptions() {
  const viewer        = useAppStore(s => s.mapInstance) as unknown as Cesium.Viewer | null
  const currentDateTime = useAppStore(s => s.currentDateTime)

  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return

    viewer.clock.shouldAnimate = false
    viewer.clock.currentTime   = Cesium.JulianDate.fromDate(currentDateTime)
    viewer.scene.requestRender()
  }, [viewer, currentDateTime])
}
