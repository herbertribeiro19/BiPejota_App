import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

const Stack = createStackNavigator();

export const RootNavigator = () => {
    const { isAuthenticated, initializing } = useAuth();

    // Se ainda está inicializando, não renderiza nada
    if (initializing) {
        return null;
    }

    console.log('Status de autenticação:', isAuthenticated ? 'Logado' : 'Não logado');

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                // Rotas protegidas - usuário logado
                <Stack.Screen name="Main" component={MainNavigator} />
            ) : (
                // Rotas públicas - usuário não logado
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
}; 