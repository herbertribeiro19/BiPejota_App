import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../contexts/AuthContext';
import { useFonts } from '../../hooks/useFonts';

const ProfileScreen = () => {
    const { colors } = useAppTheme();
    const { logout, user, loading } = useAuth();
    const { heading, text } = useFonts();

    const handleLogout = async () => {
        try {
            console.log('🚪 Iniciando logout...');
            await logout();
            console.log('✅ Logout realizado com sucesso!');
            // Não precisa navegar manualmente - o sistema faz automaticamente
        } catch (error) {
            console.error('❌ Erro ao fazer logout:', error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[heading.h1, { color: colors.text.primary }]}>
                Perfil
            </Text>

            {user && (
                <View style={styles.userInfo}>
                    <Text style={[text.lg, { color: colors.text.primary }]}>
                        Nome: {user.name}
                    </Text>
                    <Text style={[text.md, { color: colors.text.secondary }]}>
                        Email: {user.email}
                    </Text>
                </View>
            )}

            <Text style={[text.md, { color: colors.text.secondary }]}>
                Gerencie suas configurações
            </Text>

            <TouchableOpacity
                style={[styles.logoutButton, {
                    backgroundColor: colors.accent.primary,
                    opacity: loading ? 0.7 : 1
                }]}
                onPress={handleLogout}
                disabled={loading}
            >
                <Text style={[heading.h2, { color: colors.text.inverse, fontSize: 16 }]}>
                    {loading ? 'Saindo...' : 'Sair da Conta'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    userInfo: {
        marginVertical: 20,
        alignItems: 'center',
    },
    logoutButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 30,
    },
});

export default ProfileScreen; 