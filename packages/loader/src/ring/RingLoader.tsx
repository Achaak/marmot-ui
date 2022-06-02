import type { ColorsType } from '@pikas-ui/styles'
import { theme } from '@pikas-ui/styles'
import { RingLoader as RingLoaderDefault } from 'react-spinners'
import React from 'react'

export interface RingLoaderProps {
  size: number | string
  color?: ColorsType
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
      color={(color ? theme.colors[color].value : undefined) || colorHex}
      loading={loading}
    />
  )
}

RingLoader.defaultProps = {
  loading: true,
}
