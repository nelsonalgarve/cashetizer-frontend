import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default App = () => {
    return (
        <>
            <View>
                <Text>Welcom to Cashetizer</Text>
            </View>
            <ExpoStatusBar style='auto' />
        </>
    );
};

const styles = StyleSheet.create({});
