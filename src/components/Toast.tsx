import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { useFonts } from '../hooks/useFonts';

interface ToastProps {
    visible: boolean;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({
    visible,
    message,
    type = 'info',
    duration = 3000,
    onHide,
}) => {
    const { colors } = useAppTheme();
    const { text } = useFonts();
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Mostrar toast
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Esconder automaticamente após duration
            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onHide();
        });
    };

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#4CAF50',
                    borderLeftColor: '#45A049',
                };
            case 'error':
                return {
                    backgroundColor: '#F44336',
                    borderLeftColor: '#D32F2F',
                };
            case 'warning':
                return {
                    backgroundColor: '#FF9800',
                    borderLeftColor: '#F57C00',
                };
            default:
                return {
                    backgroundColor: '#2196F3',
                    borderLeftColor: '#1976D2',
                };
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            default:
                return 'ℹ';
        }
    };

    if (!visible) return null;

    const toastStyle = getToastStyle();

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                    backgroundColor: toastStyle.backgroundColor,
                    borderLeftColor: toastStyle.borderLeftColor,
                },
            ]}
        >
            <View style={styles.content}>
                <Text style={styles.icon}>{getIcon()}</Text>
                <Text style={[styles.message, { color: colors.text.inverse }]}>
                    {message}
                </Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 70,
        left: 20,
        right: 20,
        borderRadius: 20,
        padding: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 20,
        marginRight: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    message: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Toast; 