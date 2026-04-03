/**
 * Computes golden ratio grid line positions as fractions of viewport dimensions.
 *
 * The golden ratio φ ≈ 0.618.
 * Lines are placed at 1/φ and 1 - 1/φ along each axis, giving four intersection
 * points — the classical "power points" for photographic composition.
 *
 * Returns values in the range [0, 1] so callers can multiply by actual pixel
 * dimensions to get absolute positions.
 */

export const PHI = 1.618033988749895
export const PHI_INV = 1 / PHI           // ≈ 0.618

export interface GoldenRatioGrid {
  /** Vertical line X positions as fractions of width, e.g. [0.382, 0.618] */
  verticalLines: [number, number]
  /** Horizontal line Y positions as fractions of height, e.g. [0.382, 0.618] */
  horizontalLines: [number, number]
  /** The four power-point intersections as { x, y } fractions */
  powerPoints: [
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
  ]
}

/**
 * Returns golden ratio grid geometry as viewport fractions.
 * Pure function — no DOM dependencies.
 */
export function computeGoldenRatioGrid(): GoldenRatioGrid {
  const near = 1 - PHI_INV   // ≈ 0.382
  const far  = PHI_INV        // ≈ 0.618

  return {
    verticalLines: [near, far],
    horizontalLines: [near, far],
    powerPoints: [
      { x: near, y: near },
      { x: far,  y: near },
      { x: near, y: far  },
      { x: far,  y: far  },
    ],
  }
}
