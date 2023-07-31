import { Lato_400Regular, useFonts as useLato } from '@expo-google-fonts/lato';
import { Oswald_400Regular, useFonts as useOswald } from '@expo-google-fonts/oswald';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components';
import { ItemsScreen } from './src/features/Items/screens/ItemsScreen';
import { ListItems } from './src/features/Items/screens/ListItems';
import { SingleItem } from './src/features/Items/screens/SingleItem';
import { SignUpForm } from './src/features/welcome//screens/SignUpForm';
import { SignInForm } from './src/features/welcome/screens/SignInForm';
import { SignUpScreen } from './src/features/welcome/screens/SignUpScreen';
import { WelcomeScreen } from './src/features/welcome/screens/WelcomeScreen';
import { theme } from './src/infrastructure/theme';
import themePaper from './src/infrastructure/theme/themePaper';
import { Ionicons } from '@expo/vector-icons'; 

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
								<Stack.Screen name="Welcome" component={WelcomeScreen} options={{
            headerShown: false, 
          }}/>
								<Stack.Screen name="SignUp" component={SignUpForm} options={({ navigation }) => ({
								   title: 'Créer un compte', 
								   headerLeft: () => (
									 <TouchableOpacity
									   onPress={() => navigation.navigate('WelcomeScreen')}
									   style={styles.backButton}
									 >
									   <Ionicons name="close" size={30} color="white" />
									 </TouchableOpacity>
								   ), 
								 })}/>
								
								<Stack.Screen name="SignIn" component={SignInForm} />
								
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
			<ExpoStatusBar style="auto" />
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#155263' 
	},
});
