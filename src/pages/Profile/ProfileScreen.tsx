import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from '../../hooks/useFonts';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/Toast';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { colors } = useAppTheme();
    const { logout, user, loading } = useAuth();
    const { heading, text } = useFonts();
    const { toast, showSuccess, showError, hideToast } = useToast();

    const handleLogout = async () => {
        try {
            console.log('Iniciando logout...');
            await logout();
            setTimeout(() => {
                navigation.navigate('Auth' as never);
            }, 2000);
        } catch (error) {
            showError("Erro ao sair da conta, tente novamente.");
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Toast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                duration={toast.duration}
                onHide={hideToast}
            />

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