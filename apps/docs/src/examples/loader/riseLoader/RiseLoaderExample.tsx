import { ExampleContainer } from '@/components/ExampleContainer'
import { RiseLoader } from '@pikas-ui/loader'

export const RiseLoaderExample: React.FC = () => {
  return (
    <ExampleContainer
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
      }}
    >
      <RiseLoader />
    </ExampleContainer>
  )
}
