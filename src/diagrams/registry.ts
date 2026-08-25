import type { ComponentType } from 'react'
import {
  AspectRatioFrames,
  CompressionStack,
  FaceDistortion,
  FocalLengthDial,
  SensorCrop,
  ZoomVsPush,
} from './lens'

/**
 * Every diagram a lesson can reference, by key.
 * `npm run lint:content` fails if a lesson names a key that is not in here,
 * so a lesson can never ship pointing at a diagram that does not exist.
 */
export const DIAGRAMS: Record<string, ComponentType> = {
  FocalLengthDial,
  CompressionStack,
  FaceDistortion,
  ZoomVsPush,
  SensorCrop,
  AspectRatioFrames,
}

export const DIAGRAM_KEYS = Object.keys(DIAGRAMS)
