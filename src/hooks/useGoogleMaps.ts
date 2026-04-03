/**
 * Initialises a Cesium Viewer with Google Photorealistic 3D Tiles.
 *
 * Requirements:
 *   VITE_GOOGLE_MAPS_API_KEY — Google Maps API key (used by Cesium for tile access)
 *
 * Lighting approach:
 *   - Globe lighting is enabled as a base so terrain always has a sun direction.
 *   - Shadow maps (viewer.shadows) cast sun shadows onto the 3D tile surfaces.
 *   - No PBR custom shader — tiles render with their baked textures + shadow overlay.
 *   - The clock is frozen; useRenderingOptions drives currentTime from the slider.
 */
import { useEffect, useRef } from 'react'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useAppStore } from '@/store/appStore'
import type { Park } from '@/types/parks'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

if (!API_KEY) {
  console.error('[useGoogleMaps] VITE_GOOGLE_MAPS_API_KEY is not set.')
} else {
  Cesium.GoogleMaps.defaultApiKey = API_KEY
}

export function useGoogleMaps(containerRef: React.RefObject<HTMLDivElement>, _park: Park) {
  const setMapInstance = useAppStore(s => s.setMapInstance)
  const mapRef = useRef<Cesium.Viewer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let cancelled = false

    async function init() {
      if (cancelled || !containerRef.current) return

      const viewer = new Cesium.Viewer(containerRef.current, {
        animation: false,
        timeline: false,
        infoBox: false,
        homeButton: false,
        fullscreenButton: false,
        baseLayerPicker: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        geocoder: false,
        selectionIndicator: false,
        baseLayer: false,
        shouldAnimate: false,
      })

      // Globe provides the base terrain + ambient background — keep it visible.
      viewer.scene.globe.enableLighting = true
      viewer.scene.highDynamicRange = true
      // Cast sun shadows onto tile surfaces via Cesium's shadow map.
      viewer.shadows = true

      // Hide Cesium branding (ion credits not applicable; Google logo baked in tiles)
      const creditContainer = viewer.bottomContainer as HTMLElement | undefined
      if (creditContainer) creditContainer.style.display = 'none'

      try {
        const tileset = await Cesium.createGooglePhotorealistic3DTileset()
        tileset.shadows = Cesium.ShadowMode.ENABLED
        viewer.scene.primitives.add(tileset)
        await viewer.zoomTo(tileset)
      } catch (err) {
        console.error('[useGoogleMaps] Error loading Google 3D Tiles:', err)
      }

      if (cancelled) {
        viewer.destroy()
        return
      }

      mapRef.current = viewer
      // Cast needed because store types mapInstance as google.maps.Map for the
      // Google Maps path — Cesium.Viewer is stored here instead at runtime.
      setMapInstance(viewer as unknown as google.maps.Map)
    }

    init().catch(err => console.error('[useGoogleMaps] Failed to initialise Cesium:', err))

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.destroy()
        mapRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return mapRef
}
