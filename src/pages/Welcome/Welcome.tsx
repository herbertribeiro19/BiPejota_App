import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { logos, backgrounds } from '../../utils/images';
import { useFonts } from '../../hooks/useFonts';

const Welcome = () => {
    const navigation = useNavigation();
    const { colors, isDark } = useAppTheme();
    const { fonts, text, heading } = useFonts();
    const themeKey = isDark ? 'dark' : 'light';

    const handleStart = () => {
        navigation.navigate('Login' as never);
    };

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
                <Text style={[heading.h2, { color: colors.accent.primary, textAlign: 'center', fontWeight: '500' }]}>
                    Bem-vindo ao BiPejota!
                </Text>
                <Text style={[heading.h1, { color: colors.text.primary, fontSize: 26, textAlign: 'center', marginTop: 10 }]}>
                    Domine seu tempo, potencialize seus resultados
                </Text>
                <Text style={[text.md, { color: colors.text.secondary, fontSize: 14, textAlign: 'center', marginBottom: 20 }]}>
                    Profissionalize a sua rotina e simplifique sua gestão
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.accent.primary }]}
                    onPress={handleStart}
                >
                    <View style={styles.buttonContent}>
                        <Text style={[heading.h2, { color: colors.text.inverse, fontSize: 18 }]}>
                            Começar
                        </Text>
                        <Text style={[heading.h2, { color: colors.text.inverse, fontSize: 18, marginLeft: 8 }]}>
                            →
                        </Text>
                    </View>
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
    button: {
        paddingHorizontal: 22,
        paddingVertical: 16,
        borderRadius: 26,
        minWidth: 300,
        marginBottom: 20,
        alignSelf: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Welcome;