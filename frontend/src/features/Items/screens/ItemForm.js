import { Picker } from '@react-native-community/picker';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, Menu, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setToken, setUser } from '../../../../reducers/user';
import formTheme from '../../../features/welcome/themes/FormTheme';
import { CategoriesAutocomplete } from '../components/CategoriesAutocomplete';

export const ItemForm = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.token);
	const userData = useSelector(selectUserData);
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const handleOptionSelect = (value) => {
		setSelectedOption(value);
		setValue('dropdown', value);
		setModalVisible(false);
	};

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	const onSubmit = (data) => {
		if (!acceptedTerms) {
			alert("Veuillez accepter les termes d'utilisation avant de vous inscrire.");
			return;
		}

		// Adresse du backend pour Fetch POST signup
		const signUpEndpoint = 'http://192.168.0.15:3000/items';

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
					// affichage du reducer user
					console.log('userfromreducer', user);
					console.log('tokenFormReducer', token);
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

	const toggleTermsAcceptance = () => {
		setAcceptedTerms(!acceptedTerms);
	};

	const onReset = () => {
		reset();
	};

	const dropdownCategories = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' },
		// Add more options as needed
	];
	const dropdownOptions = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' },
		// Add more options as needed
	];

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<PaperProvider theme={formTheme}>
				<View style={styles.container}>
					{/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={50}> */}
					<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
						<CategoriesAutocomplete />
						<View style={styles.container}>
							<Text style={styles.label}>Choisir une Catégorie</Text>

							<Controller
								control={control}
								render={({ field: { onChange, value } }) => (
									<Picker
										selectedValue={value}
										onValueChange={(itemValue) => {
											onChange(itemValue);
											setValue('dropdown', itemValue); // This is required to update the form value
										}}>
										{dropdownOptions.map((option) => (
											<Picker.Item key={option.value} label={option.label} value={option.value} />
										))}
									</Picker>
								)}
								name="dropdown"
								defaultValue={dropdownOptions[0].value} // Set the default value here
							/>
						</View>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							rules={{ required: "La description de l'objet est obligatoire" }}
							render={({ field }) => (
								<View>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										maxLength={250}
										multiline
										numberOfLines={5}
										label="Description"
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
							control={control}
							render={({ field: { onChange, value } }) => (
								<Picker
									selectedValue={value}
									onValueChange={(itemValue) => {
										onChange(itemValue);
										setValue('dropdown', itemValue); // This is required to update the form value
									}}>
									{dropdownOptions.map((option) => (
										<Picker.Item key={option.value} label={option.label} value={option.value} />
									))}
								</Picker>
							)}
							name="dropdown"
							defaultValue={dropdownOptions[0].value} // Set the default value here
						/>

						<Controller
							name="price"
							control={control}
							defaultValue=""
							rules={{ required: 'Address is required' }}
							render={({ field }) => (
								<View>
									<TextInput style={styles.textInput} {...field} value={field.value} label="Adresse" mode="outlined" error={errors.address} left={<TextInput.Icon icon="map-marker" />} onChangeText={(text) => field.onChange(text)} />
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
									<TextInput style={styles.textInput} {...field} value={field.value} label="Ville" mode="outlined" error={errors.city} left={<TextInput.Icon icon="city" />} onChangeText={(text) => field.onChange(text)} />
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
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.checkboxLabelExpress}>
								Mode Express <MaterialCommunityIcons name="help-circle-outline" size={16} />
							</Text>
							<View style={{ padding: 16 }}>
								<Controller
									control={control}
									render={({ field: { onChange, value } }) => (
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<CheckBox value={value} onValueChange={(newValue) => onChange(newValue)} />
											<Text>Oui</Text>
										</View>
									)}
									name="checkboxExpressYes"
									defaultValue={false}
								/>
							</View>
							<View style={{ padding: 16 }}>
								<Controller
									control={control}
									render={({ field: { onChange, value } }) => (
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<CheckBox value={value} onValueChange={(newValue) => onChange(newValue)} />
											<Text>Non</Text>
										</View>
									)}
									name="checkboxExpressNo"
									defaultValue={false}
								/>
							</View>
						</View>

						<View style={styles.checkboxContainer}>
							<CheckBox value={acceptedTerms} onValueChange={toggleTermsAcceptance} />
							<Text style={styles.checkboxLabel}>J'accepte les conditions d'utilisation de Cashetizer et la politique de confidentialité de Cashetizer industry.</Text>
						</View>
						<View style={styles.buttonsContainer}>
							<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSubmit(onSubmit)}>
								<Text style={styles.buttonText}>Créer un compte</Text>
							</Button>

							<Button mode="outlined" onPress={onReset}>
								Mot de passe oublié ?
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
	checkboxLabelExpress: {
		fontSize: 20,
		paddingRight: 20,
		paddingTop: 10,
		justifyContent: 'center',
		color: '#3A6673',
	},
});
