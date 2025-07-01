import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { logos, backgrounds } from '../../utils/images';
import { useFonts } from '../../hooks/useFonts';

const Welcome = () => {
    const { colors, isDark, themeType } = useAppTheme();
    const { fonts, text, heading } = useFonts();
    const themeKey = isDark ? 'dark' : 'light';

    return (
        <ImageBackground
            source={backgrounds[themeKey]}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            resizeMode="cover"
        >
            <Image
                source={logos[themeKey]}
                style={{ width: 200, height: 200, marginBottom: 24, marginTop: 200 }}
                resizeMode="contain"
            />
            <View style={[styles.container]}>
                <Text style={[heading.h2, { color: colors.accent.primary, textAlign: 'center', fontWeight: '600' }]}>
                    Bem-vindo ao BiPejota!
                </Text>
                <Text style={[heading.h1, { color: colors.text.primary, fontSize: 26, textAlign: 'center', marginTop: 10, fontWeight: '700' }]}>
                    Domine seu tempo, potencialize seus resultados
                </Text>
                <Text style={[text.md, { color: colors.text.secondary, fontSize: 14, textAlign: 'center', marginBottom: 20 }]}>
                    Profissionalize a sua rotina e simplifique sua gestão
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.accent.primary }]}
                >
                    <Text style={[heading.h2, { color: colors.text.inverse, textAlign: 'center', fontSize: 18, fontWeight: '600', }]}>
                        Começar
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 200,
    },
    debugContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    debugText: {
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        paddingHorizontal: 22,
        paddingVertical: 16,
        borderRadius: 26,
        minWidth: 300,
        marginBottom: 30,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Welcome;