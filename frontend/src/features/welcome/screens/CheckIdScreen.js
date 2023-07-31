import React, {useState} from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { CustomTextInput } from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import formTheme from '../themes/FormTheme';

export const CheckIdScreen = () => {
	/* const navigation = useNavigation();
	const handleSignUpPress = () => {
		navigation.navigate('SignUpScreen');
	}; */


	const [sendRecto, setSendRecto] = useState(false);
	const [sendVerso, setSendVerso] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	const onSubmit = (data) => {
		// Handle form submission logic here
		console.log(data);
	};

	const onReset = () => {
		reset();
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				{/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={50}> */}
				<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
					<Controller
						name="rectoID"
						control={control}
						defaultValue=""
						rules={{
							required: "Le recto de votre pièce d'identité est obligatoire",
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
									label="Recto de votre pièce d'identité"
									mode="outlined"
									error={errors.email}
									right={<TextInput.Icon icon="plus" onPress={() => setSendRecto(sendRecto)}/>}
									onChangeText={(text) => field.onChange(text)}
								/>
								{errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
							</View>
						)}
					/>

					{/* Pour pouvoir utiliser le composant TextInputMask et le theme Paper, nous avons créé un composant custom */}

					<Controller
						name="versoID"
						control={control}
						defaultValue=""
						rules={{
							required: "Le verso de votre pièce d'identité est obligatoire",
						}}
						render={({ field }) => (
							<View>
								<TextInput
									{...field}
									style={styles.textInput}
									value={field.value}
									label="Verso de votre pièce d'identité"
									secureTextEntry
									mode="outlined"
									error={errors.versoID}
									right={<TextInput.Icon icon="plus" onPress={() => setSendVerso(sendVerso)}/>}
									onChangeText={(text) => field.onChange(text)}
								/>
								{errors.versoID && <HelperText type="error">{errors.versoID.message}</HelperText>}
							</View>
						)}
					/>

					
					<Button style={styles.buttonOutlined}>
					<Text style={styles.buttonText}>Créer un compte</Text>
					</Button>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={onReset}>
						Reset
					</Button>
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
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
});
