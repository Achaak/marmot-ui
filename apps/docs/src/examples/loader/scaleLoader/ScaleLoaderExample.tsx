import { ExampleContainer } from '@/components/ExampleContainer'
import { ScaleLoader } from '@pikas-ui/loader'

export const ScaleLoaderExample: React.FC = () => {
  return (
    <ExampleContainer
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
      }}
    >
      <ScaleLoader />
    </ExampleContainer>
  )
}
