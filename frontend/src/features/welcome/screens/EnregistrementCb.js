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
import { CustomTextInput } from '../components/CustomTextInput';
import formTheme from '../themes/FormTheme';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const EnregistrementCb = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.token);
	const userData = useSelector(selectUserData);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	
	  const handleValiderPaiement = () => {
		navigation.navigate('Confirmation'); 
	  };
	  const handleProductFormScreen = () => {
		navigation.navigate('ProductFormScreen'); 
	  };
	  
	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	
  
	const onSubmit = (data) => {
		if (!acceptedTerms) {
			alert("sauvegarder pour mes futurs paiements.");
			return;
		}

		// Objet user à envoyer au backend
		const requestData = {
			cardName: data.cardName,
			cardNumber: data.cardNumber,
			cardMonths: data.cardMonths,
			cardYears: data.cardYears,
			cardType: data.cardType,
			cvc: data.cvc,
		  };
	};

	const toggleTermsAcceptance = () => {
		setAcceptedTerms(!acceptedTerms);
	};


	const onReset = () => {
		reset();
	};


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
										label="Nom figurant sur la carte"
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
					
						{/* Pour pouvoir utiliser le composant TextInputMask et le theme Paper, nous avons créé un composant custom */}
						<Controller
  name="cardNumber"
  control={control}
  defaultValue=""
  rules={{
    required: 'Card number is required',
    pattern: {
      value: /\d{16}/, // Vérifie que le numéro de carte contient exactement 16 chiffres
      message: 'Invalid card number',
    },
  }}
  render={({ field }) => (
    <View>
      <TextInput
        style={styles.textInput}
        {...field}
        value={field.value}
        label="Numéro de carte"
        mode="outlined"
        keyboardType="numeric"
        error={errors.cardNumber}
        left={<TextInput.Icon icon="credit-card" />}
        onChangeText={(text) => field.onChange(text.replace(/\D/g, '').slice(0,16))} // Limiter à 16 chiffres
      />
      {errors.cardNumber && <HelperText type="error">{errors.cardNumber.message}</HelperText>}
    </View>
  )}
/>
<Controller
  name="cardMonths"
  control={control}
  defaultValue=""
  rules={{
    required: 'Le mois est obligatoire',
    pattern: {
      value: /\d{2}/,
      message: 'Mois invalide',
    },
  }}
  render={({ field }) => (
    <View style={styles.halfContainer}>
      <TextInput
        style={styles.halfTextInput}
        {...field}
        value={field.value}
        label="Mois"
        mode="outlined"
        keyboardType="numeric"
        error={errors.cardMonths}
        left={<TextInput.Icon icon="credit-card" />}
        onChangeText={(text) => field.onChange(text.replace(/\D/g, '').slice(0, 2))}
      />
      {errors.cardMonths && <HelperText type="error">{errors.cardMonths.message}</HelperText>}
    </View>
	
  )}
/>

<Controller
  name="cardYears"
  control={control}
  defaultValue=""
  rules={{
    required: 'L\'année est obligatoire',
    pattern: {
      value: /\d{4}/,
      message: 'Année invalide',
    },
  }}
  render={({ field }) => (
    <View style={styles.halfContainer}>
      <TextInput
        style={styles.halfTextInput}
        {...field}
        value={field.value}
        label="Année"
        mode="outlined"
        keyboardType="numeric"
        error={errors.cardYears}
        left={<TextInput.Icon icon="credit-card" />}
        onChangeText={(text) => field.onChange(text.replace(/\D/g, '').slice(0, 4))}
      />
      {errors.cardYears && <HelperText type="error">{errors.cardYears.message}</HelperText>}
    </View>
  )}
/>
<Controller
  name="cardType"
  control={control}
  defaultValue=""
  rules={{ required: 'Le type de carte est obligatoire' }}
  render={({ field }) => (
    <View>
      <TextInput
        style={styles.textInput}
        {...field}
        value={field.value}
        label="Type de carte"
        mode="outlined"
        error={errors.cardType}
        left={<TextInput.Icon icon="card" />}
        onChangeText={(text) => field.onChange(text)}
      />
      {errors.cardType && <HelperText type="error">{errors.cardType.message}</HelperText>}
    </View>
  )}
/>

<Controller
  name="CVC"
  control={control}
  defaultValue=""
  rules={{
    required: 'CVC is required',
    pattern: {
      value: /\d{3}/, // Vérifie que le numéro de carte contient exactement 16 chiffres
      message: 'Invalid cvc',
    },
  }}
  render={({ field }) => (
    <View>
      <TextInput
        style={styles.textInput}
        {...field}
        value={field.value}
        label="CVC"
        mode="outlined"
        keyboardType="numeric"
        error={errors.cardNumber}
        left={<TextInput.Icon icon="credit-card" />}
        onChangeText={(text) => field.onChange(text.replace(/\D/g, '').slice(0, 3))} // Limiter à 3 chiffres
      />
      {errors.cardNumber && <HelperText type="error">{errors.cardNumber.message}</HelperText>}
    </View>
  )}
/>
					
						<View style={styles.checkboxContainer}>
							<CheckBox value={acceptedTerms} onValueChange={toggleTermsAcceptance} />
							<Text style={styles.checkboxLabel}>
								Sauvegarder pour mes futurs paiements.
							</Text>
						</View>
						<View style={styles.buttonsContainer}>
							<Button style={styles.buttonOutlined} mode="outlined" onPress={handleValiderPaiement}>
								<Text style={styles.buttonText}>Valider paiement</Text>
							</Button>

							<Button mode="outlined" onPress={handleProductFormScreen}>
								Annuler
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

	halfContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	  },
	  halfTextInput: {
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
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
