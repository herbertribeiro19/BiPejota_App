import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useFonts } from '../../hooks/useFonts';

const TasksScreen = () => {
    const { colors } = useAppTheme();
    const { heading } = useFonts();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[heading.h1, { color: colors.text.primary }]}>
                Tarefas
            </Text>
            <Text style={{ color: colors.text.secondary }}>
                Gerencie suas tarefas aqui
            </Text>
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
});

export default TasksScreen; 