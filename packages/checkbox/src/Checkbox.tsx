import type { BorderRadiusType, FontsSizesType } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import { IconByName } from '@pikas-ui/icons'
import { Label, TextError } from '@pikas-ui/text'
import type { AriaRole, ChangeEvent, ReactNode } from 'react'
import { forwardRef, useEffect, useState } from 'react'

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none',
})

const Element = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const StyledCheckbox = styled('label', {
  all: 'unset',
  backgroundColor: 'white',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 500ms',
  border: '2px solid',

  variants: {
    focus: {
      true: {
        borderColor: '$PRIMARY_DARKER',
      },
    },
    borderColor: {
      primary: {
        borderColor: '$PRIMARY',
      },
    },
    borderSize: {
      sm: {
        border: '1px solid',
      },
      md: {
        border: '2px solid',
      },
      lg: {
        border: '3px solid',
      },
    },
    size: {
      sm: {
        width: 16,
        height: 16,
      },
      md: {
        width: 20,
        height: 20,
      },
      lg: {
        width: 24,
        height: 24,
      },
    },
    borderRadius: {
      1: {
        br: 'sm',
      },
      2: {
        br: 'md',
      },
      3: {
        br: 'lg',
      },
      round: {
        br: 'round',
      },
    },
    error: {
      true: {
        borderColor: '$ERROR',
      },
    },
  },
})

const HiddenCheckbox = styled('input', {
  border: 0,
  clip: 'rect(0 0 0 0)',
  clippath: 'inset(50%)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
})

export interface CheckboxProps {
  defaultChecked?: boolean
  onChange?: (checked: ChangeEvent<HTMLInputElement>) => void
  setFieldValue?: (id: string, value: boolean) => void
  id?: string
  label?: string | ReactNode
  bgColor?: 'primary'
  bgColorChecked?: 'green' | 'white' | 'blue'
  disableAutoCheck?: boolean
  error?: boolean
  textError?: string
  borderColor?: 'primary'
  borderSize?: 'sm' | 'md' | 'lg'
  borderRadius?: BorderRadiusType
  fontSize?: FontsSizesType
  size?: 'sm' | 'md' | 'lg'
  checked?: boolean
  className?: string
  role?: AriaRole
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      defaultChecked,
      onChange,
      id,
      label,
      setFieldValue,
      disableAutoCheck,
      error,
      textError,
      borderColor,
      borderSize,
      borderRadius,
      fontSize,
      checked,
      size,
      className,
      role,
    },
    ref
  ) => {
    const [checkedState, setCheckedState] = useState(checked || false)
    const [focused, setFocused] = useState(false)

    useEffect(() => {
      if (checked === undefined) {
        return
      }

      setCheckedState(checked)
    }, [checked])

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      if (disableAutoCheck) {
        return
      }

      setCheckedState(e.target.checked)

      if (setFieldValue && id) {
        setFieldValue(id, e.target.checked)
      }

      if (onChange) {
        onChange(e)
      }
    }

    return (
      <Container
        css={{
          fontSize: `${fontSize}`,
        }}
      >
        <Element>
          <HiddenCheckbox
            type="checkbox"
            checked={checkedState}
            ref={ref}
            onChange={handleChange}
            onFocus={(): void => setFocused(true)}
            onBlur={(): void => setFocused(false)}
            id={id}
            className={className}
            role={role}
          />

          <StyledCheckbox
            htmlFor={id}
            defaultChecked={defaultChecked}
            borderColor={borderColor}
            borderSize={borderSize}
            error={error}
            size={size}
            focus={focused}
            css={{
              br: borderRadius,
            }}
          >
            {checkedState && <IconByName name="bx:check" size={20} />}
          </StyledCheckbox>

          {label ? <Label htmlFor={id}>{label}</Label> : null}
        </Element>

        {textError ? (
          <TextError style={{ marginTop: 5 }}>{textError}</TextError>
        ) : null}
      </Container>
    )
  }
)
Checkbox.displayName = 'Checkbox'

Checkbox.defaultProps = {
  bgColor: 'primary',
  bgColorChecked: 'green',
  size: 'md',
}
