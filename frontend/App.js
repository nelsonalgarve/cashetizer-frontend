import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ItemsScreen } from './src/features/Items/screens/ItemsScreen';

export default App = () => {
	return (
		<>
			<View>
				<Text>Welcome to Cashetizer</Text>
				<ItemsScreen />
			</View>
			<ExpoStatusBar style="auto" />
		</>
	);
};

const styles = StyleSheet.create({});
