import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, ColorScheme } from '../theme/colors';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: ColorScheme;
    themeType: ThemeType;
    isDark: boolean;
    setThemeType: (type: ThemeType) => void;
    toggleTheme: () => void;
    systemColorScheme: string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [themeType, setThemeType] = useState<ThemeType>('system');
    const [isDark, setIsDark] = useState(false);

    // Debug logs
    console.log('🔍 Debug Theme:', {
        systemColorScheme,
        themeType,
        isDark
    });

    // Determina qual tema usar baseado no tipo selecionado
    const getCurrentTheme = (): ColorScheme => {
        const shouldUseDark = themeType === 'dark' ||
            (themeType === 'system' && systemColorScheme === 'dark');

        console.log('🎨 Tema escolhido:', shouldUseDark ? 'DARK' : 'LIGHT');

        return shouldUseDark ? darkColors : lightColors;
    };

    // Atualiza o estado quando o tema do sistema ou tipo de tema muda
    useEffect(() => {
        const currentTheme = getCurrentTheme();
        const newIsDark = currentTheme === darkColors;
        setIsDark(newIsDark);

        console.log(' Tema atualizado:', {
            systemColorScheme,
            themeType,
            newIsDark
        });
    }, [themeType, systemColorScheme]);

    const theme = getCurrentTheme();

    const toggleTheme = () => {
        setThemeType(prev => {
            if (prev === 'system') {
                return systemColorScheme === 'dark' ? 'light' : 'dark';
            }
            return prev === 'light' ? 'dark' : 'light';
        });
    };

    const value: ThemeContextType = {
        theme,
        themeType,
        isDark,
        setThemeType,
        toggleTheme,
        systemColorScheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}; 