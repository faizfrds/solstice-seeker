/**
 * Root component — wires all functional hooks together.
 * No UI layout here; this is purely the hook orchestration layer.
 * A MapCanvas ref is passed down so useGoogleMaps can attach to the DOM element.
 */
import { useRef } from 'react'
import { useAppStore } from '@/store/appStore'
import { useGoogleMaps } from '@/hooks/useGoogleMaps'
import { useSunCalc } from '@/hooks/useSunCalc'
import { useRenderingOptions } from '@/hooks/useRenderingOptions'
import { useParkCamera } from '@/hooks/useParkCamera'
import { useSensitiveAreas } from '@/hooks/useSensitiveAreas'
import { useMarkers } from '@/hooks/useMarkers'
import { useLineOfSight } from '@/hooks/useLineOfSight'

// UI Components
import { MainLayout } from '@/components/MainLayout'
import { ConfigPanel } from '@/components/ConfigPanel'
import { TimeControls } from '@/components/TimeControls'
import { MarkerControls } from '@/components/MarkerControls'
import { SunInfoWidget } from '@/components/SunInfoWidget'
import { LocationSelect } from '@/components/LocationSelect'
import { LNTModal } from '@/components/LNTModal'


export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedPark = useAppStore(s => s.selectedPark)

  // Bootstrap map
  useGoogleMaps(containerRef, selectedPark)

  // Reactive functional pipeline
  useSunCalc()
  useRenderingOptions()
  useParkCamera()

  const sensitiveAreas = useSensitiveAreas()
  useMarkers(sensitiveAreas)
  useLineOfSight()

  return (
    <MainLayout
      mapChildren={<div ref={containerRef} style={{ width: '100%', height: '100%' }} />}
    >
      <LocationSelect />
      {/* SunInfoWidget pushes down enough so LocationSelect is above it if we wanted, but we positioned SunInfo at top-24 left-6, and LocationSelect at top-24 left-6. We should adjust this. */}
      {/* The LocationSelect is absolute. Let's just render them. We'll adjust positions next if they collide. */}
      {/* Actually I'll wrap SunInfoWidget in a div offset if they collide. */}
      <div style={{ marginTop: '4rem' }}>
        <SunInfoWidget />
      </div>
      <MarkerControls />
      <TimeControls />
      <ConfigPanel />
      <LNTModal />

      {/* Render the Golden Ratio Grid if active */}
      {useAppStore(s => s.showGoldenRatioOverlay) && (
        <div className="pointer-events-none fixed inset-0 z-40 border-8 border-primary/20 pointer-events-none" style={{
           backgroundImage: 'linear-gradient(to right, transparent 61.8%, rgba(143,163,130,0.2) 61.8%, rgba(143,163,130,0.2) calc(61.8% + 2px), transparent calc(61.8% + 2px)), linear-gradient(to bottom, transparent 61.8%, rgba(143,163,130,0.2) 61.8%, rgba(143,163,130,0.2) calc(61.8% + 2px), transparent calc(61.8% + 2px))'
        }} />
      )}
    </MainLayout>
  )
}
