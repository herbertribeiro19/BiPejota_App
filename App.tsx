import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import Welcome from './src/pages/Welcome/Welcome';

const AppContent = () => {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Welcome />
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
