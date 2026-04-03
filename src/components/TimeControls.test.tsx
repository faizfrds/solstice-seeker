import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { TimeControls } from './TimeControls'
import { useAppStore } from '@/store/appStore'

describe('TimeControls', () => {
  beforeEach(() => {
    useAppStore.setState({
      selectedMinutes: 12 * 60, // 12:00
      sunTimes: {
        sunrise: new Date(),
        sunset: new Date('2024-03-20T18:30:00'), // Needs mock local time
        goldenHourStart: new Date(),
        goldenHourEnd: new Date(),
        solarNoon: new Date()
      }
    })
  })

  it('renders correctly', () => {
    render(<TimeControls />)
    // 12 * 60 = 12:00
    expect(screen.getByText('12:00')).toBeInTheDocument()
  })

  it('updates minutes on slider change', () => {
    render(<TimeControls />)
    
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
    
    // simulate slider change to 13:00 (780 mins)
    fireEvent.change(slider, { target: { value: '780' } })
    
    expect(useAppStore.getState().selectedMinutes).toBe(780)
  })
})
