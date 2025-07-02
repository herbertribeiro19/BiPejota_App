import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppTheme } from '../hooks/useAppTheme';

// Importe suas telas de autenticação aqui
import Welcome from '../pages/Welcome/Welcome';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
    const { colors } = useAppTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.surface.primary,
                },
                headerTintColor: colors.text.primary,
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold',
                },
                headerShown: false, // Esconde o header nas telas de auth
            }}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};