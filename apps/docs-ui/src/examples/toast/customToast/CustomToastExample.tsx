import type { ToastPosition } from '@pikas-ui/toast'
import { ExampleContainer } from '@/components/ExampleContainer'
import { CustomToastProvider } from './customToastProvider'
import { toastPosition } from '../utils'

export const CustomToastExample: React.FC = () => {
  return (
    <ExampleContainer
      css={{
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {toastPosition.map((position, positionKey) => (
        <CustomToastProvider
          key={positionKey}
          position={position as ToastPosition}
        />
      ))}
    </ExampleContainer>
  )
}
