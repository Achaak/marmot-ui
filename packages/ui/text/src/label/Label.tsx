import type { PikasConfig } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import * as LabelPrimitive from '@radix-ui/react-label'
import React from 'react'

const LabelStyled = styled(LabelPrimitive.Label, {
  fontSize: '$EM-SMALL',
  fontWeight: '$BOLD',
  display: 'block',
  color: '$BLACK',
})

export interface LabelProps<Config extends PikasConfig = PikasConfig> {
  children?: React.ReactNode
  css?: Config['css']
  htmlFor?: string
}

export const Label = <Config extends PikasConfig = PikasConfig>({
  children,
  css,
  htmlFor,
}: LabelProps<Config>): JSX.Element => {
  return (
    <LabelStyled
      css={{
        ...(htmlFor && {
          cursor: 'pointer',
        }),
        ...css,
      }}
      htmlFor={htmlFor}
    >
      {children}
    </LabelStyled>
  )
}
