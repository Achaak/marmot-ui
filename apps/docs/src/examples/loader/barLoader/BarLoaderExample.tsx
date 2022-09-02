import { ExampleContainer } from '@/components/ExampleContainer'
import { BarLoader } from '@pikas-ui/loader'

export const BarLoaderExample: React.FC = () => {
  return (
    <ExampleContainer
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
      }}
    >
      <BarLoader />
    </ExampleContainer>
  )
}
