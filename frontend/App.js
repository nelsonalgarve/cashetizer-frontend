import { Lato_400Regular, useFonts as useLato } from '@expo-google-fonts/lato';
import { Oswald_400Regular, useFonts as useOswald } from '@expo-google-fonts/oswald';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { ItemsScreen } from './src/features/Items/screens/ItemsScreen';
import { ListItems } from './src/features/Items/screens/ListItems';
import { SingleItem } from './src/features/Items/screens/SingleItem';
import { theme } from './src/infrastructure/theme';

export default App = () => {
	const [fontsLoaded] = useLato({
		Lato_400Regular,
	});
	const [fontsLoaded2] = useOswald({
		Oswald_400Regular,
	});
	if (!fontsLoaded || !fontsLoaded2) {
		return null;
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				{/* <ItemsScreen /> */}
				{/* <SingleItem /> */}
				<ListItems />
			</ThemeProvider>
			<ExpoStatusBar style="auto" />
		</>
	);
};

const styles = StyleSheet.create({});
