import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { ItemsScreen } from './src/features/Items/screens/ItemsScreen';
import { theme } from './src/infrastructure/theme';

export default App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <ItemsScreen />
            </ThemeProvider>
            <ExpoStatusBar style='auto' />
        </>
    );
};

const styles = StyleSheet.create({});
