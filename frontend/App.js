import { Lato_400Regular, useFonts as useLato } from '@expo-google-fonts/lato';
import { Oswald_400Regular, useFonts as useOswald } from '@expo-google-fonts/oswald';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import user from './reducers/user';
import { MapPicker } from './src/features/Items/components/MapPicker';
import { ItemForm } from './src/features/Items/screens/ItemForm';
import { ItemsScreen } from './src/features/Items/screens/ItemsScreen';
import { ListItems } from './src/features/Items/screens/ListItems';
import { ResultScreen } from './src/features/Items/screens/ResultScreen';
import { SingleItem } from './src/features/Items/screens/SingleItem';
import { SignUpForm } from './src/features/welcome//screens/SignUpForm';
import { CheckIdScreen } from './src/features/welcome/screens/CheckIdScreen';
import { ConfirmationAccountScreen } from './src/features/welcome/screens/ConfirmationAccountScreen';
import { ConfirmationAdvertScreen } from './src/features/welcome/screens/ConfirmationAdvertScreen';
import { ConfirmationRentScreen } from './src/features/welcome/screens/ConfirmationRentScreen';
import FavouriteScreen from './src/features/welcome/screens/FavouriteScreen';
import { HomeScreen } from './src/features/welcome/screens/HomeScreen';
import MyProfileScreen from './src/features/welcome/screens/MyProfileScreen';
import { ProductFormScreen } from './src/features/welcome/screens/ProductFormScreen';
import { SearchScreen } from './src/features/welcome/screens/SearchScreen';
import SettingsScreen from './src/features/welcome/screens/SettingsScreen';
import { SignInForm } from './src/features/welcome/screens/SignInForm';
import { SingleProductScreen } from './src/features/welcome/screens/SingleProductScreen';
import { WelcomeScreen } from './src/features/welcome/screens/WelcomeScreen';
import { theme } from './src/infrastructure/theme';
import themePaper from './src/infrastructure/theme/themePaper';

const store = configureStore({
	reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const getTabBarVisible = (route) => {
		const routeName = route.state?.routes[route.state.index]?.name ?? '';
		return routeName !== 'Welcome';
	};
	const handleExitApp = () => {
		navigation.navigate('Welcome');
	};

	const navigation = useNavigation();

	return (
		<Tab.Navigator
			style={{ padding: 0 }}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName = '';

					if (route.name === 'Home') {
						iconName = 'home';
					} else if (route.name === 'MyProfile') {
						iconName = 'person';
					} else if (route.name === 'Favourite') {
						iconName = 'heart';
					} else if (route.name === 'Settings') {
						iconName = 'cog';
					} else if (route.name === 'Welcome') {
						iconName = 'exit-outline';
					}
					return (
						<View style={{ justifyContent: 'center', alignItems: 'center', height: 50, marginTop: 40 }}>
							<Ionicons name={iconName} size={30} color={color} />
						</View>
					);
				},
				tabBarActiveTintColor: '#FFCE52',
				tabBarInactiveTintColor: '#335561',
				headerShown: false,
				tabBarShowLabel: false,
				/* tabBarLabel: ({ focused, color }) => {
				let label = '';
				if (route.name === 'Home') {
				label = 'Accueil';
				} else if (route.name === 'MyProfile') {
				label = 'Mon Profil';
				} else if (route.name === 'Favourite') {
				label = 'Favoris';
				} else if (route.name === 'Settings') {
				label = 'Réglages';
				} else if (route.name === 'Welcome') {
				label = 'Exit';
				}
				return <Text style={{ color, marginTop: 35 }}>{label}</Text>;
			}, */
			})}
			tabBarStyle={{
				paddingHorizontal: 0,
				paddingVertical: 0,
			}}>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="MyProfile" component={MyProfileScreen} />
			<Tab.Screen name="Favourite" component={FavouriteScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
			<Tab.Screen
				name="Welcome"
				component={WelcomeScreen}
				options={{
					tabBarVisible: false,
					tabBarIcon: ({ color }) => (
						<TouchableOpacity onPress={handleExitApp}>
							<View style={{ justifyContent: 'center', alignItems: 'center', height: 50, marginTop: 40 }}>
								<Ionicons name="exit-outline" size={30} color={color} />
							</View>
						</TouchableOpacity>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default App = () => {
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

									<Stack.Screen name="ItemForm" component={ItemForm} options={({ navigation }) => ({
											title: 'Nouvelle annonce',
											headerLeft: () => (
												<TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
													<Ionicons name="close" size={30} color="white" />
												</TouchableOpacity>
											),
											headerRight: () => '',
							
										})}/>
									<Stack.Screen
										name="Search"
										component={SearchScreen}
										options={{
											headerShown: false,
										}}
									/>

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
											headerLeft: () => '',
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.backButton}>
													<Ionicons name="home-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="ConfirmRent"
										component={ConfirmationRentScreen}
										options={({ navigation }) => ({
											title: 'Bienvenue!',
											headerLeft: () => '',
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.backButton}>
													<Ionicons name="home-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="ConfirmAdvert"
										component={ConfirmationAdvertScreen}
										options={({ navigation }) => ({
											title: 'Bienvenue!',
											headerLeft: () => '',
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.backButton}>
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
									<Stack.Screen
										name="TabNavigator"
										component={TabNavigator}
										options={{
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="Results"
										component={ResultScreen}
										options={({ navigation }) => ({
											title: 'Résultats recherche',
											headerLeft: () => (
												<TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.backButton}>
													<Ionicons name="arrow-back" size={30} color="white" />
												</TouchableOpacity>
											),
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.backButton}>
													<Ionicons name="home-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
									/>
									<Stack.Screen
										name="SingleProduct"
										component={SingleProductScreen}
										options={{
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="SearchScreen"
										component={SearchScreen}
										options={{
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="ProductForm"
										component={ProductFormScreen}
										options={({ navigation }) => ({
											title: 'Finalisation!',
											headerLeft: () => '',
											headerRight: () => (
												<TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.backButton}>
													<Ionicons name="home-outline" size={30} color="white" />
												</TouchableOpacity>
											),
										})}
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
