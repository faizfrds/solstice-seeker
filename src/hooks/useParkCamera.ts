/**
 * Flies the Cesium camera to a new park whenever selectedPark changes.
 */
import { useEffect } from 'react'
import * as Cesium from 'cesium'
import { useAppStore } from '@/store/appStore'

export function useParkCamera() {
  const viewer       = useAppStore(s => s.mapInstance) as unknown as Cesium.Viewer | null
  const selectedPark = useAppStore(s => s.selectedPark)

  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        selectedPark.coords.lng,
        selectedPark.coords.lat,
        selectedPark.cameraAltitude,
      ),
      orientation: {
        heading: Cesium.Math.toRadians(selectedPark.heroHeading),
        pitch:   Cesium.Math.toRadians(-30),
        roll:    0,
      },
      duration: 1.5,
    })
  }, [viewer, selectedPark])
}
