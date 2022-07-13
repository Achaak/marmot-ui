import type { ColorsType } from '@pikas-ui/styles'
import { BounceLoader as BounceLoaderDefault } from 'react-spinners'
import React from 'react'

export interface BounceLoaderProps {
  size?: number | string
  color?: ColorsType
  colorHex?: string
  loading?: boolean
  speedMultiplier?: number
}

export const BounceLoader: React.FC<BounceLoaderProps> = ({
  size,
  color,
  colorHex,
  loading,
  speedMultiplier,
}) => {
  return (
    <BounceLoaderDefault
      size={size}
      speedMultiplier={speedMultiplier}
      color={(color ? `var(--colors-${color})` : undefined) || colorHex}
      loading={loading}
    />
  )
}

BounceLoader.defaultProps = {
  loading: true,
  color: 'PRIMARY',
}
