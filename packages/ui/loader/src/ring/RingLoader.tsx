import type { Colors } from '@pikas-ui/styles'
import { RingLoader as RingLoaderDefault } from 'react-spinners'
import React from 'react'

export interface RingLoaderProps {
  size?: number | string
  color?: Colors
  colorHex?: string
  loading?: boolean
  speedMultiplier?: number
}

export const RingLoader: React.FC<RingLoaderProps> = ({
  size,
  color,
  colorHex,
  loading,
  speedMultiplier,
}) => {
  return (
    <RingLoaderDefault
      size={size}
      speedMultiplier={speedMultiplier}
      color={colorHex || (color ? `var(--colors-${color})` : undefined)}
      loading={loading}
    />
  )
}

RingLoader.defaultProps = {
  loading: true,
  color: 'PRIMARY',
}
