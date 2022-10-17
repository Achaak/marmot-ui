import { Icon as Iconify } from '@iconify/react'
import { CustomIcon } from '../customIcon'
import type { IconProps } from '../types'
import type { PikasConfig } from '@pikas-ui/styles'

export interface IconByNameProps<Config extends PikasConfig>
  extends IconProps<Config> {
  name: string
}

export const IconByName = <Config extends PikasConfig = PikasConfig>({
  name,
  ...props
}: IconByNameProps<Config>): JSX.Element => {
  return (
    <CustomIcon {...props}>
      <Iconify icon={name} />
    </CustomIcon>
  )
}
