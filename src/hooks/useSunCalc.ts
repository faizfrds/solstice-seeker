/**
 * Reactive SunCalc integration.
 *
 * Watches currentDateTime + activeSunCalcCoords from the store.
 * On every change it recomputes sun position + sun times and writes
 * them back to the store, triggering the rendering pipeline.
 */
import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'
import { getSunPosition, getSunTimes } from '@/lib/sunPosition'

export function useSunCalc() {
  const currentDateTime     = useAppStore(s => s.currentDateTime)
  const activeSunCalcCoords = useAppStore(s => s.activeSunCalcCoords)
  const setSunPosition      = useAppStore(s => s.setSunPosition)
  const setSunTimes         = useAppStore(s => s.setSunTimes)

  useEffect(() => {
    const { lat, lng } = activeSunCalcCoords

    const position = getSunPosition(currentDateTime, lat, lng)
    const times    = getSunTimes(currentDateTime, lat, lng)

    setSunPosition(position)
    setSunTimes(times)
  }, [currentDateTime, activeSunCalcCoords, setSunPosition, setSunTimes])
}
