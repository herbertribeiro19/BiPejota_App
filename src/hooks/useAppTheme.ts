import { useTheme } from '../contexts/ThemeContext';

export const useAppTheme = () => {
  const { theme, themeType, isDark, setThemeType, toggleTheme } = useTheme();
  
  return {
    colors: theme,
    themeType,
    isDark,
    setThemeType,
    toggleTheme,
    // Helpers para facilitar o uso
    isLight: !isDark,
    accent: theme.accent,
    text: theme.text,
    surface: theme.surface,
  };
}; 