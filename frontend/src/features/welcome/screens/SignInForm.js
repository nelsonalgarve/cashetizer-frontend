import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUserData, setToken, setUser } from '../../../../reducers/user';
import formTheme from '../themes/FormTheme';
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const SignInForm = () => {
	const navigation = useNavigation();
	const handleSignUpPress = () => {
		navigation.navigate('SignUp');
	};
	/* const testCheckIdSignUpPress = () => {
		navigation.navigate('CheckId');
	};
	const testConfirmationAccountScreen = () => {
		navigation.navigate('ConfirmationAccount');
	};
	const testConfirmationAdvertScreen = () => {
		navigation.navigate('ConfirmationAdvert');
	};
	const testConfirmationRentScreen = () => {
		navigation.navigate('ConfirmationRent');
	}; */
	const testGoHome = () => {
		navigation.navigate('TabNavigator');
	};

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		reset,
	} = useForm();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.tokenValue);

	// SIGNIN _______________________________________________________________
	const onSubmit = (data) => {
		// Adresse du backend pour Fetch POST login
		const signIn = `https://cashetizer-backend.vercel.app/users/login`;

		// Objet user à envoyer au backend
		const requestData = {
			email: data.email,
			password: data.password,
		};
		fetch(signIn, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('data', data);
				// Réponse du backend { user: {...}, token: "..." }
				if (data.user && data.token) {
					console.log('Succes loggedIn', data);
					dispatch(setToken(data.token));
					dispatch(setUser(data.user));
					testGoHome();
				} else {
					console.log('Error', data.message || 'Signin failed');
				}
			})
			.catch((error) => {
				console.error('Error signing in:', error);
				// erreur lors de la procédure d'inscription
				console.log('Error', 'An error occurred while signing up. Please try again later.');
			});
	};

	/// SIGNOUT _________________________________________________________________________
	const onSubmitLogout = () => {
		dispatch(clearUser());
		// Adresse du backend pour Fetch POST logout
		const logout = `http://192.168.0.15:3000/users/logoutAll`;

		// Token récupéré depuis le reducer user
		const bearerToken = token;
		console.log('-----------beresr', bearerToken);
		fetch(logout, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				// 'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				dispatch(clearUser());

				console.log(data);
			})
			.catch((error) => {
				// setError(error.message);
			});
	};
	const onReset = () => {
		reset();
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
					{/* If token exists, show the logout button */}
					{token && (
						<Button style={styles.buttonOutlined} mode="Outlined" onPress={onSubmitLogout}>
							Logout {user.username}
						</Button>
					)}

					{/* If token does not exist, show the email and password fields */}
					{!token && (
						<>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: 'Email is required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'Invalid email address',
									},
								}}
								render={({ field }) => (
									<View>
										<TextInput
											{...field}
											style={styles.textInput}
											value={field.value}
											maxLength={50}
											label="Email"
											autoCapitalize="none"
											mode="outlined"
											error={errors.email}
											left={<TextInput.Icon icon="email" />}
											onChangeText={(text) => field.onChange(text)}
										/>
										{errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
									</View>
								)}
							/>

							<Controller
								name="password"
								control={control}
								defaultValue=""
								rules={{
									required: 'Password is required',
								}}
								render={({ field }) => (
									<View>
										<TextInput
											{...field}
											style={styles.textInput}
											value={field.value}
											label="Password"
											secureTextEntry
											mode="outlined"
											error={errors.password}
											left={<TextInput.Icon icon="lock" />}
											onChangeText={(text) => field.onChange(text)}
										/>
										{errors.password && <HelperText type="error">{errors.password.message}</HelperText>}
									</View>
								)}
							/>
						</>
					)}
					{!token && (
						<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSubmit(onSubmit)}>
							<Text style={styles.buttonText}>Se connecter</Text>
						</Button>
					)}
					{!token && (
						<Button style={styles.buttonGreenOutlined} mode="outlined" onPress={handleSignUpPress}>
							<Text style={styles.buttonText}>Créer un compte</Text>
						</Button>
					)}
					{!token && (
						<Button style={styles.buttonNoColorOutlined} mode="outlined" onPress={console.log('cool')}>
							Mot de passe oublié?
						</Button>
					)}
			{/* 		<Button onPress={onReset}>Reset</Button>
					<Button onPress={testCheckIdSignUpPress}>
						<Text> Test CheckId </Text>
					</Button>
					<Button onPress={testConfirmationAccountScreen}>
						<Text> Test ConfirmationAccountScreen </Text>
					</Button>
					<Button onPress={testConfirmationRentScreen}>
						<Text> Test ConfirmationRentScreen </Text>
					</Button>
					<Button onPress={testConfirmationAdvertScreen}>
						<Text> Test ConfirmationAdvertScreen </Text>
					</Button>
					<Button onPress={testGoHome}>
						<Text> Test Go Home </Text>
					</Button>
					<Button onPress={() => navigation.navigate('ItemForm')}>
						<Text> Go to item form </Text>
					</Button>
					<Button onPress={() => navigation.navigate('SearchScreen')}>
						<Text> Go to SearchScreen </Text>
					</Button>
					<Button onPress={() => navigation.navigate('ProductForm')}>
						<Text> Go to ProductForm </Text>
					</Button>
					<Button onPress={() => navigation.navigate('MesAnnonces')}>
						<Text> Mes annonces </Text>
					</Button> */}
				</ScrollView>
			</View>
			{/* </KeyboardAvoidingView> */}
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		justifyContent: 'space-between',
	},
	scrollContainer: {
		flexGrow: 1,
	},
	buttonsContainer: {
		flex: 1,
		alignContent: 'flex-end',
		marginTop: 10,
	},
	buttonNoLine: {
		color: '#FFCE52',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textShadowColor: '#000',
		textShadowOffset: {
			width: 0.5,
			height: 0.5,
		},
		textShadowRadius: 2,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
	buttonOutlined: {
		margin: 10,
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},
	buttonGreenOutlined: {
		margin: 10,
		backgroundColor: '#155263',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},
	buttonNoColorOutlined: {
		margin: 10,
		backgroundColor: 'transparent',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},

	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
});
