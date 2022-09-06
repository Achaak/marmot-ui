import React, { createContext, useEffect, useState } from 'react'
import type { createTheme } from '../css.js'
import { styled, theme as themeDefault } from '../css.js'
import merge from 'lodash.merge'
import cloneDeep from 'lodash.clonedeep'
import * as usehooks from 'usehooks-ts'

const { useTernaryDarkMode } = usehooks

export { useTernaryDarkMode }

const ContainerStyled = styled('div', {
  width: 'auto',
  height: 'fit-content',
})

export interface PikasUIProviderProps {
  children?: React.ReactNode
  lightTheme?: ReturnType<typeof createTheme>
  darkTheme?: ReturnType<typeof createTheme>
}

export type PikasUIContextType = typeof themeDefault | undefined

export const PikasUIContext = createContext<PikasUIContextType>(undefined)

export const PikasUIProvider: React.FC<PikasUIProviderProps> = ({
  lightTheme,
  darkTheme,
  children,
}) => {
  const [theme, setTheme] = useState<PikasUIContextType>(
    merge(cloneDeep(themeDefault), lightTheme)
  )
  const { isDarkMode } = useTernaryDarkMode()

  useEffect(() => {
    const newDarkTheme = darkTheme || lightTheme

    setTheme(
      merge(cloneDeep(themeDefault), isDarkMode ? newDarkTheme : lightTheme)
    )
  }, [isDarkMode, lightTheme, darkTheme])

  return (
    <PikasUIContext.Provider value={theme}>
      <ContainerStyled className={theme}>{children}</ContainerStyled>
    </PikasUIContext.Provider>
  )
}
