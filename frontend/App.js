import { Lato_400Regular, useFonts as useLato } from '@expo-google-fonts/lato';
import { Oswald_400Regular, useFonts as useOswald } from '@expo-google-fonts/oswald';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import user from './reducers/user';
import { MapPicker } from './src/features/Items/components/MapPicker';
import { ItemForm } from './src/features/Items/screens/ItemForm';
import { ItemsScreen } from './src/features/Items/screens/ItemsScreen';
import { ListItems } from './src/features/Items/screens/ListItems';
import { SingleItem } from './src/features/Items/screens/SingleItem';
import { SignUpForm } from './src/features/welcome//screens/SignUpForm';
import { CheckIdScreen } from './src/features/welcome/screens/CheckIdScreen';
import { SignInForm } from './src/features/welcome/screens/SignInForm';
import { WelcomeScreen } from './src/features/welcome/screens/WelcomeScreen';
import { theme } from './src/infrastructure/theme';
import themePaper from './src/infrastructure/theme/themePaper';

const store = configureStore({
	reducer: { user },
});

const Stack = createNativeStackNavigator();

export default App = () => {
	// const [fontsLoaded] = useLato({
	//     Lato_400Regular,
	// });
	// const [fontsLoaded2] = useOswald({
	//     Oswald_400Regular,
	// });
	// if (!fontsLoaded || !fontsLoaded2) {
	//     return null;
	// }

	return (
		<>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<PaperProvider theme={themePaper}>
						<SafeAreaView style={styles.container}>
							<NavigationContainer>
								<Stack.Navigator
									screenOptions={{
										headerShown: true,
										headerTitleStyle: {
											fontWeight: 'bold',
											fontSize: 28,
										},
										headerStyle: {
											backgroundColor: '#155263',
										},
										headerTintColor: '#fff',
										headerTitleAlign: 'center',
									}}
								>
									<Stack.Screen
										name="WelcomeScreen"
										component={WelcomeScreen}
										options={{
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="SignUp"
										component={SignUpForm}
										options={({ navigation }) => ({
											title: 'Créer un compte',
											headerLeft: () => (
												<TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')} style={styles.backButton}>
													<Ionicons name="close" size={30} color="white" />
												</TouchableOpacity>
											),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignInForm')} style={styles.backButton}>
													<Ionicons name="key-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="SignIn"
										component={SignInForm}
										options={({ navigation }) => ({
											title: 'Connexion',
											headerLeft: () => (
												<TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')} style={styles.backButton}>
													<Ionicons name="close" size={30} color="white" />
												</TouchableOpacity>
											),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={styles.newAccButton}>
													<Ionicons name="person-add-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="CheckIdScreen"
										component={CheckIdScreen}
										options={({ navigation }) => ({
											title: 'Vérification ID',
											headerLeft: () => (
												<TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')} style={styles.backButton}>
													{/* <Ionicons name="close" size={30} color="white" /> */}
												</TouchableOpacity>
											),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={styles.newAccButton}>
													<Ionicons name="person-add-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen name="ItemForm" component={ItemForm} />

									<Stack.Screen
										name="MapPicker"
										component={MapPicker}
										options={{
											headerShown: false,
										}}
									/>
									{/* <Stack.Screen name='ItemsList' component={ListItems} /> */}
									{/* <Stack.Screen
								 name="SignUpScreen"
								 component={SignUpScreen}
								 options={({ navigation }) => ({
								   title: 'Créer un compte', 
								   headerLeft: () => (
									 <TouchableOpacity
									   onPress={() => navigation.navigate('WelcomeScreen')}
									   style={styles.backButton}
									 >
									   <Ionicons name="close" size={30} color="white" />
									 </TouchableOpacity>
								   ),
								 })}
							   /> */}
									{/* <ItemsScreen /> */}
									{/* <SingleItem /> */}
								</Stack.Navigator>
							</NavigationContainer>
						</SafeAreaView>
					</PaperProvider>
				</ThemeProvider>
			</Provider>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#155263',
	},
});
