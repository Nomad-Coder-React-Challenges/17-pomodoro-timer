import Router from '#components/services/Router';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import { useMemo } from 'react';
import usePrefersColorScheme from '#hooks/usePrefersColorScheme';
import DarkModeToggle from '#components/blocks/DarkModeToggle';

export default function App() {
  const { isDarkMode } = usePrefersColorScheme();

  const theme = useMemo(() => {
    return isDarkMode ? darkTheme : lightTheme;
  }, [isDarkMode]);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
        <DarkModeToggle />
      </ThemeProvider>
    </div>
  );
}
