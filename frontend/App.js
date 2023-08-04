import { Lato_400Regular, useFonts as useLato } from '@expo-google-fonts/lato';
import { Oswald_400Regular, useFonts as useOswald } from '@expo-google-fonts/oswald';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import { ConfirmationAccountScreen } from './src/features/welcome/screens/ConfirmationAccountScreen';
import { ConfirmationRentScreen } from './src/features/welcome/screens/ConfirmationRentScreen';
import { ConfirmationAdvertScreen } from './src/features/welcome/screens/ConfirmationAdvertScreen';
import { HomeScreen } from './src/features/welcome/screens/HomeScreen';
import { SettingsScreen } from './src/features/welcome/screens/SettingsScreen';
import { MyProfileScreen } from './src/features/welcome/screens/MyProfileScreen';
import { SignInForm } from './src/features/welcome/screens/SignInForm';
import { WelcomeScreen } from './src/features/welcome/screens/WelcomeScreen';
import { theme } from './src/infrastructure/theme';
import themePaper from './src/infrastructure/theme/themePaper';

const store = configureStore({
	reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const TabNavigator = () => {
	return (
	  <Tab.Navigator screenOptions={({ route }) => ({
		tabBarIcon: ({ color, size }) => {
		  let iconName = '';
  
		  if (route.name === 'MyProfile') {
			iconName = 'location-arrow';
		  } else if (route.name === 'Settings') {
			iconName = 'map-pin';
		  }
  
		  return <FontAwesome name={iconName} size={size} color={color} />;
		},
		tabBarActiveTintColor: '#ec6e5b',
		tabBarInactiveTintColor: '#335561',
		headerShown: false,
	  })}>
		<Tab.Screen name="MyProfile" component={MyProfileScreen} />
		<Tab.Screen name="Settings" component={SettingsScreen} />
	  </Tab.Navigator>
	);
  };

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
									}}>
									<Stack.Screen
										name="Welcome"
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
												<TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.backButton}>
													<Ionicons name="close" size={30} color="white" />
												</TouchableOpacity>
											),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.backButton}>
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
												<TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.backButton}>
													<Ionicons name="close" size={30} color="white" />
												</TouchableOpacity>
											),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.newAccButton}>
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
									<Stack.Screen
										name="CheckId"
										component={CheckIdScreen}
										options={({ navigation }) => ({
											title: 'Vérification ID',
											headerLeft: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.backButton}>
													<Ionicons name="arrow-back" size={30} color="white" />
												</TouchableOpacity>
											),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.backButton}>
													<Ionicons name="key-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="ConfirmationAccount"
										component={ConfirmationAccountScreen}
										options={({ navigation }) => ({
											title: 'Bienvenue!',
											headerLeft: () => (''),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.backButton}>
													<Ionicons name="home-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="ConfirmationRent"
										component={ConfirmationRentScreen}
										options={({ navigation }) => ({
											title: 'Bienvenue!',
											headerLeft: () => (''),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.backButton}>
													<Ionicons name="home-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="ConfirmationAdvert"
										component={ConfirmationAdvertScreen}
										options={({ navigation }) => ({
											title: 'Bienvenue!',
											headerLeft: () => (''),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.backButton}>
													<Ionicons name="home-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="Home"
										component={HomeScreen}
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
