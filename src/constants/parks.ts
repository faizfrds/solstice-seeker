import type { Park } from '@/types/parks'

export const PARKS: Park[] = [
  {
    id: 'zion',
    name: 'Zion National Park',
    timezone: 'America/Denver',
    coords: { lat: 37.2982, lng: -113.0263 },
    heroHeading: 170,   // facing south toward Angels Landing
    cameraAltitude: 3200,
  },
  {
    id: 'yosemite',
    name: 'Yosemite National Park',
    timezone: 'America/Los_Angeles',
    coords: { lat: 37.7459, lng: -119.5332 },
    heroHeading: 90,    // east toward El Capitan face
    cameraAltitude: 2800,
  },
  {
    id: 'bryce',
    name: 'Bryce Canyon National Park',
    timezone: 'America/Denver',
    coords: { lat: 37.5930, lng: -112.1871 },
    heroHeading: 0,     // north over the amphitheater
    cameraAltitude: 2500,
  },
  {
    id: 'arches',
    name: 'Arches National Park',
    timezone: 'America/Denver',
    coords: { lat: 38.7331, lng: -109.5925 },
    heroHeading: 315,   // northwest toward Delicate Arch
    cameraAltitude: 2000,
  },
  {
    id: 'grand-canyon',
    name: 'Grand Canyon National Park',
    timezone: 'America/Phoenix',
    coords: { lat: 36.1069, lng: -112.1129 },
    heroHeading: 180,   // south rim looking north into the canyon
    cameraAltitude: 4000,
  },
  {
    id: 'olympic',
    name: 'Olympic National Park',
    timezone: 'America/Los_Angeles',
    coords: { lat: 47.8021, lng: -123.6044 },
    heroHeading: 270,   // west toward the coast
    cameraAltitude: 3500,
  },
  {
    id: 'acadia',
    name: 'Acadia National Park',
    timezone: 'America/New_York',
    coords: { lat: 44.3386, lng: -68.2733 },
    heroHeading: 90,    // east toward Cadillac Mountain sunrise
    cameraAltitude: 2000,
  },
  {
    id: 'great-smoky',
    name: 'Great Smoky Mountains National Park',
    timezone: 'America/New_York',
    coords: { lat: 35.6532, lng: -83.5070 },
    heroHeading: 200,
    cameraAltitude: 3000,
  },
  {
    id: 'death-valley',
    name: 'Death Valley National Park',
    timezone: 'America/Los_Angeles',
    coords: { lat: 36.5323, lng: -117.0794 },
    heroHeading: 90,    // east toward Zabriskie Point
    cameraAltitude: 1800,
  },
  {
    id: 'glacier',
    name: 'Glacier National Park',
    timezone: 'America/Denver',
    coords: { lat: 48.7596, lng: -113.7870 },
    heroHeading: 135,
    cameraAltitude: 4500,
  },
]

export const DEFAULT_PARK_ID = 'zion'

export function getParkById(id: string): Park | undefined {
  return PARKS.find(p => p.id === id)
}
