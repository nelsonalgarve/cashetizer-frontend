import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default App = () => {
    return (
        <>
            <ItemScreen />
            <ExpoStatusBar style='auto' />
        </>
    );
};

const styles = StyleSheet.create({});
