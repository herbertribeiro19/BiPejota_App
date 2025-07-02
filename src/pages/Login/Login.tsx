import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { logos, backgrounds } from '../../utils/images';
import { useFonts } from '../../hooks/useFonts';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const navigation = useNavigation();
    const { colors, isDark } = useAppTheme();
    const { login, loading } = useAuth();
    const { fonts, text, heading } = useFonts();
    const themeKey = isDark ? 'dark' : 'light';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleCreateAccount = () => {
        navigation.navigate('Register' as never);
    };

    const handleLogin = async () => {
        try {
            console.log('Iniciando login...');
            await login(formData);
            // Não precisa navegar manualmente - o sistema faz automaticamente
        } catch (error: any) {
            console.error('Erro ao fazer login:', error.message);
            // Aqui você pode mostrar um alerta de erro
        }
    };

    return (
        <ImageBackground
            source={backgrounds[themeKey]}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            resizeMode="cover"
        >
            <Image
                source={logos[themeKey]}
                style={{ width: 93, height: 93, marginBottom: 10, marginTop: 160 }}
                resizeMode="contain"
            />
            <View style={[styles.container]}>
                <Text style={[heading.h1, { color: colors.text.primary, fontSize: 26, textAlign: 'center', marginTop: 0 }]}>
                    Entrar na Conta
                </Text>
                <Text style={[text.md, { color: colors.text.secondary, fontSize: 14, textAlign: 'center', marginBottom: 20 }]}>
                    Insira as suas credenciais
                </Text>

                <TextInput
                    placeholder="Email"
                    style={[styles.input, { color: colors.text.primary, borderBottomColor: colors.accent.primary, borderBottomWidth: 2 }]}
                    placeholderTextColor={colors.text.secondary}
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <TextInput
                    placeholder="Senha"
                    style={[styles.input, { color: colors.text.primary, borderBottomColor: colors.accent.primary, borderBottomWidth: 2 }]}
                    placeholderTextColor={colors.text.secondary}
                    value={formData.password}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    returnKeyType="done"
                    keyboardType="visible-password"
                    textContentType="password"
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.accent.primary, opacity: loading ? 0.7 : 1 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <View style={styles.buttonContent}>
                        <Text style={[heading.h2, { color: colors.text.inverse, fontSize: 18 }]}>
                            {loading ? 'Entrando...' : 'Entrar na Conta'}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button2, { backgroundColor: 'transparent' }]}
                    onPress={handleCreateAccount}
                    disabled={loading}
                >
                    <View style={styles.buttonContent}>
                        <Text style={[heading.h2, { color: colors.accent.primary, fontSize: 18 }]}>
                            Criar uma conta
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
    input: {
        padding: 12,
        fontSize: 16,
    },
    button: {
        paddingHorizontal: 22,
        paddingVertical: 16,
        borderRadius: 26,
        minWidth: 300,
        marginBottom: 16,
        marginTop: 20,
        alignSelf: 'center',
    },
    button2: {
        borderRadius: 26,
        alignSelf: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login;