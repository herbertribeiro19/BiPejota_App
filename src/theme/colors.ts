export const lightColors = {
  // Background
  background: '#f9f9f9',
  
  // Accent colors
  accent: {
    primary: '#C4BC00',
    strong: '#403E16',
    medium: '#797200',
    light: '#DAD347',
    lighter: '#C9C344',
  },
  
  // Text colors
  text: {
    primary: '#242424',
    secondary: '#666666',
    inverse: '#f9f9f9',
  },
  
  // Surface colors
  surface: {
    primary: '#ffffff',
    secondary: '#f0f0f0',
  },
  
  // Border colors
  border: '#e0e0e0',
};

export const darkColors = {
  // Background
  background: '#242424',
  
  // Accent colors (mesmas cores do light)
  accent: {
    primary: '#C4BC00',
    strong: '#403E16',
    medium: '#797200',
    light: '#DAD347',
    lighter: '#C9C344',
  },
  
  // Text colors
  text: {
    primary: '#f9f9f9',
    secondary: '#cccccc',
    inverse: '#242424',
  },
  
  // Surface colors
  surface: {
    primary: '#2a2a2a',
    secondary: '#333333',
  },
  
  // Border colors
  border: '#404040',
};

export type ColorScheme = typeof lightColors; 