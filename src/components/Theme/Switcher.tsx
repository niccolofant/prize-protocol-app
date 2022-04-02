import { FunctionComponent, useCallback, useState } from 'react'
import { useTheme } from 'next-themes'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const Switcher: FunctionComponent = () => {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark' ? true : false)

  const handleClick = useCallback(() => {
    setTheme(isDarkMode ? 'light' : 'dark')
    setIsDarkMode(!isDarkMode)
  }, [isDarkMode])

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={handleClick}
      size={20}
      sunColor="#9ca3af"
      moonColor="#9ca3af"
    />
  )
}

export default Switcher
