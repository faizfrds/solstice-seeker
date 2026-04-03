
import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { SunInfoWidget } from './SunInfoWidget'
import { useAppStore } from '@/store/appStore'

describe('SunInfoWidget', () => {
  beforeEach(() => {
    useAppStore.setState({ sunPosition: null })
  })

  it('renders nothing when sunPosition is null', () => {
    const { container } = render(<SunInfoWidget />)
    expect(container.firstChild).toBeNull()
  })

  it('renders azimuth and altitude correctly', () => {
    useAppStore.setState({
      sunPosition: {
        altitudeDeg: 45.123,
        azimuthDeg: 180.987,
        isAboveHorizon: true,
        isGoldenHour: true,
      }
    })

    render(<SunInfoWidget />)
    
    // Checks formatting rules (toFixed(1))
    expect(screen.getByText('181.0°')).toBeInTheDocument()
    expect(screen.getByText('45.1°')).toBeInTheDocument()
    expect(screen.getByText('Golden Hour')).toBeInTheDocument()
  })
})
