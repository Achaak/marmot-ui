import { IconByName } from '@pikas-ui/icons'
import type { CSS } from '@pikas-ui/styles'
import { useTheme } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'

const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  backgroundColor: '$GRAY_LIGHT',
  opacity: 0,
  inset: 0,
  transition: 'all 500ms',
  zIndex: '$XX-HIGH',

  variants: {
    visible: {
      true: {
        opacity: 0.5,
      },
    },
  },
})

const Container = styled(Dialog.Content, {
  inset: 'initial',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  boxShadow: '$ELEVATION_BOTTOM_5',

  backgroundColor: '$WHITE',
  maxWidth: '100vw',
  maxHeight: '100vh',
  transition: 'all 500ms',
  transform: 'scale(0.8)',
  overflow: 'hidden',
  opacity: 0,
  zIndex: '$XX-HIGH',

  display: 'flex',
  flexDirection: 'column',

  '&:focus': { outline: 'none' },

  '@sm': {
    top: '50%',
    left: '50%',
    bottom: 'initial',
    right: 'initial',
    br: 'md',
    transformOrigin: '0% 0%',
    transform: 'scale(0.8) translate(-50%, -50%)',
  },

  variants: {
    visible: {
      true: {
        opacity: 1,
        transform: 'scale(1)',

        '@sm': {
          transform: 'scale(1) translate(-50%, -50%)',
        },
      },
    },
    padding: {
      'no-padding': {
        padding: 0,
      },
      sm: {
        padding: '8px 16px',
        '@sm': {
          padding: '16px 24px',
        },
      },
      md: {
        padding: '16px 24px',
        '@sm': {
          padding: '24px 32px',
        },
      },
      lg: {
        padding: '24px 32px',
        '@sm': {
          padding: '32px 40px',
        },
      },
    },
    gap: {
      'no-gap': {
        customGap: 0,
      },
      sm: {
        customGap: 8,
      },
      md: {
        customGap: 16,
      },
      lg: {
        customGap: 32,
      },
    },
  },
})

const CloseBtn = styled('div', {
  cursor: 'pointer',
  position: 'absolute',
  right: '24px',
  top: '24px',
})

const DefaultContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',

  variants: {
    padding: {
      'no-padding': {
        padding: 0,
      },
      sm: {
        padding: '16px 24px',
      },
      md: {
        padding: '24px 32px',
      },
      lg: {
        padding: '32px 40px',
      },
    },
    gap: {
      'no-gap': {
        customGap: 0,
      },
      sm: {
        customGap: 8,
      },
      md: {
        customGap: 16,
      },
      lg: {
        customGap: 32,
      },
    },
  },
})

const Header = styled(DefaultContainer, {})

const Content = styled(DefaultContainer, {
  overflow: 'auto',
})

const Footer = styled(DefaultContainer, {})

export interface CustomDialogType {
  visible: boolean
  onOpen?: () => void
  onClose?: () => void
  closeIfClickOutside?: boolean

  hasCloseButton?: boolean
  css?: {
    container?: CSS
    header?: CSS
    content?: CSS
    footer?: CSS
  }
  width?: string | number
  height?: string | number
  padding?: {
    container?: 'no-padding' | 'sm' | 'md' | 'lg'
    header?: 'no-padding' | 'sm' | 'md' | 'lg'
    content?: 'no-padding' | 'sm' | 'md' | 'lg'
    footer?: 'no-padding' | 'sm' | 'md' | 'lg'
  }
  gap?: {
    container?: 'no-gap' | 'sm' | 'md' | 'lg'
    header?: 'no-gap' | 'sm' | 'md' | 'lg'
    content?: 'no-gap' | 'sm' | 'md' | 'lg'
    footer?: 'no-gap' | 'sm' | 'md' | 'lg'
  }
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
}

export const CustomDialog: React.FC<CustomDialogType> = ({
  visible,
  hasCloseButton,
  onClose,
  css,
  closeIfClickOutside,
  onOpen,
  width,
  padding,
  height,
  header,
  footer,
  content,
  gap,
}) => {
  const [visibleStyle, setVisibleStyle] = useState(false)
  const [visibleDOM, setVisibleDOM] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    if (visible) {
      setVisibleDOM(visible)

      setTimeout(() => {
        setVisibleStyle(visible)
      }, 100)
    } else {
      setVisibleStyle(visible)

      setTimeout(() => {
        setVisibleDOM(visible)
      }, 500)
    }
  }, [visible])

  const handleClose = (): void => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog.Root
      open={visibleDOM}
      modal={true}
      onOpenChange={(open): void => {
        if (open) {
          onOpen?.()
        }
      }}
    >
      <Dialog.Portal>
        <Overlay
          className={theme}
          visible={visibleStyle}
          css={{
            pointerEvents: 'initial',
          }}
        />

        <Container
          className={theme}
          visible={visibleStyle}
          onInteractOutside={(): void => {
            if (closeIfClickOutside) {
              handleClose()
            }
          }}
          padding={padding?.container}
          gap={gap?.container}
          css={{
            '@sm': {
              width: width,
              height: height,
            },

            ...css?.container,
          }}
        >
          {hasCloseButton && (
            <CloseBtn onClick={handleClose}>
              <IconByName name="bx:x" size={32} color="PRIMARY" />
            </CloseBtn>
          )}

          {header && (
            <Header
              css={{
                ...css?.header,
              }}
              gap={gap?.header}
              padding={padding?.header}
            >
              {header}
            </Header>
          )}
          {content && (
            <Content
              css={{
                ...css?.content,
              }}
              gap={gap?.content}
              padding={padding?.content}
            >
              {content}
            </Content>
          )}
          {footer && (
            <Footer
              css={{
                ...css?.footer,
              }}
              gap={gap?.footer}
              padding={padding?.footer}
            >
              {footer}
            </Footer>
          )}
        </Container>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

CustomDialog.defaultProps = {
  width: 500,
  padding: {
    container: 'md',
    content: 'no-padding',
    footer: 'no-padding',
    header: 'no-padding',
  },
  gap: {
    container: 'sm',
    content: 'md',
    footer: 'md',
    header: 'md',
  },
  hasCloseButton: true,
}
