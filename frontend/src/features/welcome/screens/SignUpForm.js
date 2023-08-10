import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setToken, setUser } from '../../../../reducers/user';
import GooglePlacesInput from '../../Items/components/GooglePlacesInput';
import { CustomTextInput } from '../components/CustomTextInput';
import formTheme from '../themes/FormTheme';

export const SignUpForm = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.tokenValue);
	const userData = useSelector(selectUserData);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	const onSubmit = (data) => {
		if (!acceptedTerms) {
			alert("Veuillez accepter les termes d'utilisation avant de vous inscrire.");
			return;
		}

		// Objet user à envoyer au backend
		const requestData = {
			username: data.username,
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email,
			password: data.password,
			number: data.number,
			street: data.address,
			city: data.city,
			zipCode: data.zipCode,
			phone: data.phone,
			cardName: data.cardName,
			cardNumber: data.cardNumber,
			cardType: data.cardType,
			expDate: data.expDate,
			isVendor: data.isVendor,
			notifications: data.notifications,
		};

		// Adresse du backend pour Fetch POST signup
		const signUpEndpoint = `https://cashetizer-backend.vercel.app/users`;

		fetch(signUpEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData),
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log('data', userData);

				// Réponse du backend { user: {...}, token: "..." }
				if (data.user && data.token) {
					console.log('Succes loggedIn', data);
					dispatch(setToken(data.token));
					dispatch(setUser(data.user));

					navigation.navigate('CheckId');
				} else {
					console.log('Error', data.message || 'Sign-up failed');
				}
			})
			.catch((error) => {
				console.error('Error signing up:', error);
				// erreur lors de la procédure d'inscription
				console.log('Error', 'An error occurred while signing up. Please try again later.');
			});
	};

	const onTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleTermsAcceptance = () => {
		setAcceptedTerms(!acceptedTerms);
	};

	const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	const onReset = () => {
		reset();
	};

	function formatPhoneNumber(phoneNumber) {
		const cleaned = ('' + phoneNumber).replace(/\D/g, '');
		const match = cleaned.match(/^(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
		if (match) {
			return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]} ${match[6]} ${match[7]}`;
		}
		return phoneNumber;
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<PaperProvider theme={formTheme}>
				<View style={styles.container}>
					{/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={50}> */}
					<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
						<Controller
							name="username"
							control={control}
							defaultValue=""
							rules={{ required: 'Username is required' }}
							render={({ field }) => (
								<View>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										maxLength={32}
										label="Nom d'utilisateur"
										mode="outlined"
										autoCapitalize="none"
										error={errors.username}
										left={<TextInput.Icon icon="account" />}
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.username && <HelperText type="error">{errors.username.message}</HelperText>}
								</View>
							)}
						/>
						<Controller
							name="firstname"
							control={control}
							defaultValue=""
							rules={{ required: 'First name is required' }}
							render={({ field }) => (
								<View>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										maxLength={32}
										label="Prénom"
										mode="outlined"
										error={errors.firstname}
										left={<TextInput.Icon icon="account-outline" />}
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.firstname && <HelperText type="error">{errors.firstname.message}</HelperText>}
								</View>
							)}
						/>
						<Controller
							name="lastname"
							control={control}
							defaultValue=""
							rules={{ required: 'Last name is required' }}
							render={({ field }) => (
								<View>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										maxLength={32}
										label="Nom de famille"
										mode="outlined"
										error={errors.lastname}
										left={<TextInput.Icon icon="account-outline" />}
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.lastname && <HelperText type="error">{errors.lastname.message}</HelperText>}
								</View>
							)}
						/>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							rules={{
								required: "L'email est obligatoire",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Adresse email incorrecte',
								},
							}}
							render={({ field }) => (
								<View>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										maxLength={50}
										label="Email"
										mode="outlined"
										autoCapitalize="none"
										error={errors.email}
										left={<TextInput.Icon icon="email" />}
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
								</View>
							)}
						/>

						{/* Pour pouvoir utiliser le composant TextInputMask et le theme Paper, nous avons créé un composant custom */}
						<Controller
							name="phone"
							control={control}
							defaultValue=""
							rules={{
								// required: 'Numéro de téléphone est obligatoire',
								pattern: {
									value: /\B(?=(\d{2})+(?!\d))(?<!\+3)|\B(?<=\+33)/g,
									message: 'Invalid Phone number',
								},
							}}
							render={({ field }) => (
								<TextInput
									style={styles.textInput}
									label="Numéro de téléphone"
									mode="outlined"
									maxLength={25}
									error={errors.phone}
									left={<TextInput.Icon icon="phone" />}
									autoCapitalize="none"
									keyboardType="numeric"
									value={field.value.replace(/\D/g, '')} // Remove non-numeric characters
									onChangeText={(text) => field.onChange(text.replace(/\D/g, ''))} // Remove non-numeric characters
								/>
							)}
						/>
						<Controller
							name="address"
							control={control}
							defaultValue=""
							rules={{ required: 'Address is required' }}
							render={({ field }) => (
								<View>
									{/* <GooglePlacesInput></GooglePlacesInput> */}
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										label="Adresse"
										mode="outlined"
										error={errors.address}
										left={<TextInput.Icon icon="map-marker" />}
										onChangeText={(text) => field.onChange(text)}
									/>

									{errors.address && <HelperText type="error">{errors.address.message}</HelperText>}
								</View>
							)}
						/>
						<Controller
							name="city"
							control={control}
							defaultValue=""
							rules={{ required: 'La ville est obligatoire.' }}
							render={({ field }) => (
								<View>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										label="Ville"
										mode="outlined"
										error={errors.city}
										left={<TextInput.Icon icon="city" />}
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.city && <HelperText type="error">{errors.city.message}</HelperText>}
								</View>
							)}
						/>
						<Controller
							name="zipCode"
							control={control}
							defaultValue=""
							rules={{ required: 'Zip Code is required' }}
							render={({ field }) => (
								<View>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										label="Code postal"
										mode="outlined"
										keyboardType="numeric"
										error={errors.zipCode}
										left={<TextInput.Icon icon="map" />}
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.zipCode && <HelperText type="error">{errors.zipCode.message}</HelperText>}
								</View>
							)}
						/>
						<Controller
							style={styles.textInput}
							name="password"
							control={control}
							defaultValue=""
							rules={{
								required: 'Entrez votre mot de passe',
								pattern: {
									value: passwordPattern,
									message:
										'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
								},
							}}
							render={({ field }) => (
								<View>
									<View>
										<TextInput
											style={styles.textInput}
											{...field}
											value={field.value}
											label="Mot de passe"
											secureTextEntry={!showPassword}
											mode="outlined"
											error={errors.password}
											left={<TextInput.Icon icon="lock" />}
											right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
											onChangeText={(text) => field.onChange(text)}
										/>
									</View>
									{errors.password && <HelperText type="error">{errors.password.message}</HelperText>}
								</View>
							)}
						/>
						<Controller
							name="confirmPassword"
							control={control}
							defaultValue=""
							rules={{
								required: 'Please confirm your password',
								validate: (value) => value === getValues('password') || 'Passwords do not match',
							}}
							render={({ field }) => (
								<View>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										label="Confirmer mot de passe"
										secureTextEntry
										mode="outlined"
										error={errors.confirmPassword}
										left={<TextInput.Icon icon="lock" />}
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.confirmPassword && <HelperText type="error">{errors.confirmPassword.message}</HelperText>}
								</View>
							)}
						/>
						<View style={styles.checkboxContainer}>
							<CheckBox value={acceptedTerms} onValueChange={toggleTermsAcceptance} />
							<Text style={styles.checkboxLabel}>
								J'accepte les conditions d'utilisation de Cashetizer et la politique de confidentialité de Cashetizer industry.
							</Text>
						</View>
						<View style={styles.buttonsContainer}>
							<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSubmit(onSubmit)}>
								<Text style={styles.buttonText}>Créer un compte</Text>
							</Button>

							<Button mode="outlined" onPress={onReset}>
								Mot de passe oublié?
							</Button>
						</View>
					</ScrollView>
				</View>
			</PaperProvider>
		</KeyboardAvoidingView>
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
	buttonOutlined: {
		margin: 10,
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: -10,
	},
	checkboxLabel: {
		marginLeft: 8,
		fontSize: 14,
	},
	passwordContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	passwordInput: {
		flex: 1,
		height: 40,
		fontSize: 16,
		padding: 0,
	},
	showButton: {
		paddingHorizontal: 10,
	},
	showButtonText: {
		fontSize: 16,
		color: 'blue',
	},
});
