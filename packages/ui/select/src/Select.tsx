import type { BorderRadius, PikasCSS, PikasConfig } from '@pikas-ui/styles'
import { useTheme } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import type { IconCSS } from '@pikas-ui/icons'
import { IconByName } from '@pikas-ui/icons'
import { Description, Label, TextError } from '@pikas-ui/text'
import * as SelectPrimitive from '@radix-ui/react-select'
import type { Ref } from 'react'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import type { TooltipCSS } from '@pikas-ui/tooltip'
import { Tooltip } from '@pikas-ui/tooltip'
import { Textfield } from '@pikas-ui/textfield'

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const SelectContainer = styled(SelectPrimitive.Root, {})

const Trigger = styled(SelectPrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  cursor: 'pointer',
  borderStyle: 'solid',
  width: '100%',
  color: '$BLACK',

  variants: {
    padding: {
      none: {
        padding: 0,
      },
      xs: {
        padding: '2px 4px',
      },
      sm: {
        padding: '4px 8px',
      },
      md: {
        padding: '8px 16px',
      },
      lg: {
        padding: '16px 32px',
      },
    },
    focus: {
      true: {
        outline: 'solid',
        outlineColor: '$PRIMARY',
        outlineWidth: 2,
      },
    },
  },
})

const SelectValue = styled(SelectPrimitive.Value, {})

const Icon = styled(SelectPrimitive.Icon, {
  marginLeft: 4,
})

const Content = styled(SelectPrimitive.Content, {
  backgroundColor: '$WHITE',
  boxShadow: '$ELEVATION_1',
  br: 'sm',
  zIndex: '$XXX-HIGH',
})

const Viewport = styled(SelectPrimitive.Viewport, {
  padding: 4,
})

const Group = styled(SelectPrimitive.Group, {})

const scrollButtonCSS: PikasCSS = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  cursor: 'default',
}

const ScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonCSS)

const ScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonCSS
)

const ItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Separator = styled(SelectPrimitive.Separator, {
  height: 1,
  backgroundColor: '$GRAY_LIGHTER',
  margin: 8,
})

const GroupLabel = styled(SelectPrimitive.Label, {
  padding: '4px 16px 4px 24px',
  fontWeight: '$MEDIUM',
  fontSize: '$EM-SMALL',
  color: '$BLACK',
})

const Item = styled(SelectPrimitive.Item, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  userSelect: 'none',
  padding: '4px 16px 4px 24px',
  br: 'sm',
  cursor: 'pointer',
  transition: 'all 100ms',

  '&[data-disabled]': {
    opacity: 0.5,
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: '$PRIMARY_LIGHTER',
    color: '$WHITE',
    fill: '$WHITE',
  },
})

const ItemText = styled('span', {
  fontSize: '$EM-SMALL',
  color: '$BLACK',
})

const SearchContainer = styled('div', {
  padding: 8,
})

const LabelContainer = styled('div', {
  display: 'flex',
  marginBottom: 4,
  color: '$BLACK',
})

const Required = styled('div', {
  color: '$WARNING',
  marginLeft: 4,
})

export type SelectItem = {
  label: React.ReactNode
  value: string
  disabled?: boolean
  searchValue?: string
  hidden?: boolean
}

export const selectDirections = {
  ltr: true,
  rtl: true,
} as const
export type SelectDirections = keyof typeof selectDirections

export const selectPadding = {
  none: true,
  xs: true,
  sm: true,
  md: true,
  lg: true,
} as const
export type SelectPadding = keyof typeof selectPadding

export type SelectCSS<Config extends PikasConfig = PikasConfig> = {
  container?: Config['css']
  trigger?: Config['css']
  infoTooltip?: TooltipCSS<Config>
  infoIcon?: IconCSS<Config>
  required?: Config['css']
  label?: Config['css']
  description?: Config['css']
  textError?: Config['css']
  content?: Config['css']
}

export interface SelectProps<Config extends PikasConfig = PikasConfig> {
  css?: SelectCSS<Config>
  hasSearch?: boolean
  searchPlaceholder?: string

  label?: string
  borderRadius?: BorderRadius
  padding?: SelectPadding
  fontSize?: Config['fontSize']
  borderColorName?: Config['color']
  borderWidth?: number
  data: {
    name?: string
    hidden?: boolean
    items: Array<SelectItem>
  }[]
  id?: string
  onChange?: (value: string) => void
  defaultValue: string
  ariaLabel?: string
  textError?: string
  direction?: SelectDirections
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  boxShadow?: Config['shadow'] | 'none'
  backgroundColorName?: Config['color']
  outline?: boolean
  description?: string
  width?: string | number
  maxWidth?: string | number
  minWidth?: string | number
  info?: React.ReactNode
  required?: boolean
}

export interface SelectRef {
  setValue: (value: string) => void
}

const SelectInner = <Config extends PikasConfig = PikasConfig>(
  {
    data,
    css,
    onChange,
    defaultValue,
    label,
    hasSearch,
    searchPlaceholder,
    id,
    ariaLabel,
    borderRadius = 'md',
    padding = 'md',
    textError,
    direction,
    onOpenChange,
    defaultOpen,
    borderColorName = 'TRANSPARENT',
    borderWidth = 0,
    fontSize = 'EM-MEDIUM',
    boxShadow = 'DIMINUTION_1',
    backgroundColorName = 'GRAY_LIGHTEST_1',
    outline = true,
    description,
    maxWidth,
    width = '100%',
    minWidth = '100%',
    info,
    required,
  }: SelectProps<Config>,
  ref: Ref<SelectRef>
): JSX.Element => {
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState(defaultValue || '')
  const [formattedData, setFormattedData] = useState(data)
  const [focus, setFocus] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    setFormattedData(
      data.map((group) => {
        const items = group.items.map((item) => {
          let hidden = item.hidden || false

          if (searchValue.length > 0) {
            if (
              item.searchValue &&
              !item.searchValue
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            ) {
              hidden = false
            }
          }

          return {
            ...item,
            hidden: hidden,
          }
        })

        return {
          ...group,
          hidden: !items.some((item) => !item.hidden),
          items,
        }
      })
    )
  }, [data, searchValue])

  const handleChange = (value: string): void => {
    onChange?.(value)
    setValue(value)
  }

  useImperativeHandle(ref, () => ({
    setValue: (value: string): void => {
      handleChange(value)
    },
  }))

  const handleOpenChange = (open: boolean): void => {
    onOpenChange?.(open)

    if (!open) {
      setSearchValue('')
    }
  }

  const viewport = useMemo(
    () => (
      <Viewport>
        {formattedData.map((group, groupIndex) => {
          const res = []
          const hidden = !group.items.some((item) => !item.hidden)

          if (
            groupIndex > 0 &&
            !hidden &&
            !formattedData[groupIndex - 1]?.hidden
          ) {
            res.push(<Separator key={`separator-${groupIndex}`} />)
          }

          res.push(
            <Group
              key={groupIndex}
              css={{
                ...(hidden ? { display: 'none' } : {}),
              }}
            >
              {group.name ? <GroupLabel>{group.name}</GroupLabel> : null}
              {group.items.map((item, itemIndex) => (
                <Item
                  key={itemIndex}
                  value={item.value}
                  disabled={item.disabled}
                  css={{
                    ...(item.hidden ? { display: 'none' } : {}),
                  }}
                >
                  <SelectPrimitive.ItemText>
                    <ItemText>{item.label}</ItemText>
                  </SelectPrimitive.ItemText>
                  <ItemIndicator>
                    <IconByName<Config>
                      name="bx:check"
                      size={20}
                      colorName="BLACK"
                    />
                  </ItemIndicator>
                </Item>
              ))}
            </Group>
          )

          return res
        })}
      </Viewport>
    ),
    [formattedData]
  )

  return (
    <Container
      css={{
        fontSize: `$${fontSize}`,
        width: width,
        maxWidth: maxWidth,
        minWidth: minWidth,
        ...css?.container,
      }}
    >
      {label ? (
        <LabelContainer>
          <Label<Config>
            htmlFor={id}
            css={{
              ...css?.label,
            }}
          >
            {label}
          </Label>

          {required ? (
            <Required
              css={{
                ...css?.required,
              }}
            >
              *
            </Required>
          ) : null}
          {info ? (
            <Tooltip content={info} css={css?.infoTooltip}>
              <IconByName<Config>
                name="bx:info-circle"
                colorName="BLACK_LIGHT"
                css={{
                  container: {
                    marginLeft: 4,
                    ...css?.infoIcon?.container,
                  },
                  svg: {
                    ...css?.infoIcon?.svg,
                  },
                }}
              />
            </Tooltip>
          ) : null}
        </LabelContainer>
      ) : null}

      {description ? (
        <Description<Config>
          css={{
            marginBottom: 4,
            ...css?.description,
          }}
        >
          {description}
        </Description>
      ) : null}

      <SelectContainer
        defaultValue={defaultValue}
        onValueChange={handleChange}
        dir={direction}
        onOpenChange={handleOpenChange}
        defaultOpen={defaultOpen}
        value={value}
        css={{
          ...css?.container,
        }}
      >
        <Trigger
          aria-label={ariaLabel}
          padding={padding}
          focus={outline ? focus : undefined}
          onFocus={(): void => setFocus(true)}
          onBlur={(): void => setFocus(false)}
          css={{
            br: borderRadius,
            borderColor: `$${borderColorName}`,
            borderWidth: borderWidth,
            boxShadow: `$${boxShadow}`,
            backgroundColor: `$${backgroundColorName}`,
            ...css?.trigger,
          }}
        >
          <SelectValue />
          <Icon>
            <IconByName<Config>
              name="bx:chevron-down"
              size="1em"
              colorName="BLACK"
            />
          </Icon>
        </Trigger>

        <SelectPrimitive.Portal>
          <Content css={css?.content} className={theme}>
            {hasSearch ? (
              <>
                <SearchContainer>
                  <Textfield
                    onChange={(e): void => {
                      setSearchValue(e.target.value)
                    }}
                    placeholder={searchPlaceholder}
                    borderRadius="round"
                    padding="sm"
                    fontSize="EM-SMALL"
                  />
                </SearchContainer>
                <Separator />
              </>
            ) : null}

            <ScrollUpButton>
              <IconByName<Config>
                name="bx:chevron-up"
                size={20}
                colorName="BLACK"
              />
            </ScrollUpButton>
            {viewport}
            <ScrollDownButton>
              <IconByName<Config>
                name="bx:chevron-down"
                size={20}
                colorName="BLACK"
              />
            </ScrollDownButton>
          </Content>
        </SelectPrimitive.Portal>
      </SelectContainer>

      {textError ? (
        <TextError<Config> css={{ marginTop: 5, ...css?.textError }}>
          {textError}
        </TextError>
      ) : null}
    </Container>
  )
}

export const Select = forwardRef(SelectInner) as <
  Config extends PikasConfig = PikasConfig
>(
  props: SelectProps<Config> & { ref?: React.ForwardedRef<SelectRef> }
) => ReturnType<typeof SelectInner>
