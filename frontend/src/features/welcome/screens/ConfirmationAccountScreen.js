import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { CustomTextInput } from '../components/CustomTextInput';
import formTheme from '../themes/FormTheme';

export const ConfirmationAccountScreen = () => {
	const navigation = useNavigation();
	const WelcomeScreen = () => {
		navigation.navigate('TabNavigator');
	};
	const handleNotificationPermission = async () => {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus === 'granted') {
			console.log('Notification permission granted!');
		}
	};

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
				<View style={styles.textContainer}>
					<Text style={styles.emoji}>🥳</Text>
					<Text style={styles.title}> Félicitations ! </Text>

					<Text style={styles.text}>
						Votre compte est en cours de validation.{'\n'}
						{'\n'}
						Vous recevrez une notification
						{'\n'}et un email une fois votre compte confirmé.{'\n'}
						{'\n'}
						Pensez à vérifier votre boite email
						{'\n'}et à activer les notifications.
					</Text>
				</View>
				<Button style={styles.buttonOutlined} mode="outlined" onPress={handleNotificationPermission}>
					<Text style={styles.buttonText}>J'active les notifications</Text>
				</Button>

				<View style={styles.textContainer}>
					<Text style={styles.text}>
						Vous pouvez dès à présent {'\n'}
						commencer à louer à petits prix {'\n'}
						ou à générer un revenu {'\n'}
						en mettant vos produits en location!!
					</Text>
				</View>
				<Button style={styles.buttonOutlined} mode="outlined" onPress={() => navigation.navigate('ItemForm')}>
					<Text style={styles.buttonText}>Je commence l'aventure</Text>
				</Button>
			</View>
			<View style={[styles.imageContainer, { zIndex: -1 }]}>
				<Image source={require('../../../../assets/LogoShortUp.png')} style={styles.image} />
			</View>
			<View style={styles.greenRectangle}>
				<Text style={styles.rectangleText}>
					Economies futées,{'\n'}
					Des revenus assurés !{' '}
				</Text>
			</View>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	imageContainer: {
		width: '100%',
		marginBottom: -18,
	},
	image: {
		width: '100%',
		resizeMode: 'contain',
		height: 215,
	},
	textContainer: {
		alignItems: 'center',
		marginBottom: 10,
	},
	title: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 10,
		color: '#155263',
	},
	greenRectangle: {
		weight: 40,
		backgroundColor: '#155263',
		paddingVertical: 2,
		paddingHorizontal: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	rectangleText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
	},
	emoji: {
		fontSize: 60,
		marginTop: 25,
		marginBottom: 25,
	},
	text: {
		fontSize: 16,
		marginTop: 10,
		textAlign: 'center',
		color: '#155263',
		fontWeight: '400',
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
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '80%',
		alignSelf: 'center',
		margin: 10,
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
