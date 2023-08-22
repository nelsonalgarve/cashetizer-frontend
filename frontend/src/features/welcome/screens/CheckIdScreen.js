import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import CheckBox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, handleSubmit, useController, useForm } from 'react-hook-form';
import { Alert, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import placeholderImage from '../../../../assets/Vacant.png';
import { CustomTextInput } from '../components/CustomTextInput';
import formTheme from '../themes/FormTheme';
const SERVER_URL = process.env.SERVER_URL;

export const CheckIdScreen = () => {
	const navigation = useNavigation();
	const [livePhoto, setLivePhoto] = useState('');
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [cameraType, setCameraType] = useState(CameraType.front);
	const [hasPermission, setHasPermission] = useState(false);
	const [showCamera, setShowCamera] = useState(true);

	const isFocused = useIsFocused();

	const cameraRef = useRef(null);

	const pickImageFromGallery = async (field) => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status === 'granted') {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled && result.assets.length > 0) {
				field.onChange(result.assets[0].uri);
			}
		} else {
			console.log('Permission not granted');
		}
	};

	useEffect(() => {
		const requestCameraPermission = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		if (isFocused) {
			requestCameraPermission();
		}
	}, [isFocused]);

	const takePhoto = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync({ quality: 0.1 });
			setLivePhoto(photo.uri);
			setShowCamera(false);
			const formData = new FormData();
			formData.append('photoFromFront', {
				uri: photo.uri,
				name: 'photo.jpg',
				type: 'image/jpeg',
			});
			/* const response = await fetch('http://172.20.10.4:3000/testUpload', {
        method: 'POST',
        body: formData,
      });

	  const data = await response.json();

	  if (data.result && data.url) {
        setLivePhoto(data.url);
        console.log('Image téléchargée avec succès:', data.url);
		} else {
		  console.log('Référence à la caméra invalide.');
		} */
		}
	};
	const toggleCamera = () => {
		setShowCamera(!showCamera);
	};

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	const toggleTermsAcceptance = () => {
		setAcceptedTerms(!acceptedTerms);
	};

	const onSubmit = async () => {
		try {
			console.log('step1');
			const data = getValues();

			const formData = new FormData();
			formData.append('rectoID', {
				uri: data.rectoID,
				name: 'recto.jpg',
				type: 'image/jpeg',
			});
			formData.append('versoID', {
				uri: data.versoID,
				name: 'verso.jpg',
				type: 'image/jpeg',
			});
			formData.append('livePhoto', {
				uri: livePhoto,
				name: 'live.jpg',
				type: 'image/jpeg',
			});
			console.log('step2');
			if (data.rectoID && data.versoID && livePhoto && acceptedTerms) {
				navigation.navigate('ConfirmationAccount');
			} else {
				Alert.alert('Attention', 'Veuillez remplir tous les champs et cocher la case avant de valider votre compte.');
				return;
			}

			const response = await fetch(`${SERVER_URL}/checkId/IDCheck`, {
				method: 'POST',
				body: formData,
			});

			const responseData = await response.json();
			if (responseData.result && responseData.rectoIdUrl && responseData.versoIdUrl && responseData.livePhotoUrl) {
				console.log('URL du recto:', responseData.rectoIdUrl);
				console.log('URL du verso:', responseData.versoIdUrl);
				console.log('URL de la photo en direct:', responseData.livePhotoUrl);
			} else {
				console.error("Erreur lors de l'enregistrement des images:", responseData.error);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const onReset = () => {
		reset();
	};

	return (
		<PaperProvider theme={formTheme}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					{/* Affichez la caméra uniquement si showCamera est true */}
					{showCamera && (
						<>
							<Camera type={cameraType} ref={cameraRef} style={styles.camera} />
							<Button style={styles.buttonOutlined} onPress={takePhoto}>
								Prendre la photo
							</Button>
						</>
					)}
					{/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={50}> */}
					<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
						<Controller
							name="rectoID"
							control={control}
							defaultValue=""
							rules={{
								required: "Le recto de votre pièce d'identité est obligatoire",
							}}
							render={({ field }) => (
								<View>
									<TextInput
										{...field}
										style={styles.textInput}
										value={field.value ? 'Le recto de votre ID est enregistrée :)' : ''}
										label="Recto de votre pièce d'identité"
										mode="outlined"
										right={<TextInput.Icon icon="plus" onPress={() => pickImageFromGallery(field)} />}
										editable={false}
									/>
									{errors.rectoID && <HelperText type="error">{errors.rectoID.message}</HelperText>}
								</View>
							)}
						/>

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
										style={styles.textInput}
										value={field.value ? 'Le verso de votre ID est enregistrée :)' : ''}
										label="Verso de votre pièce d'identité"
										mode="outlined"
										error={errors.versoID}
										right={<TextInput.Icon icon="plus" onPress={() => pickImageFromGallery(field)} />}
										editable={false}
									/>
									{errors.versoID && <HelperText type="error">{errors.versoID.message}</HelperText>}
								</View>
							)}
						/>

						<Controller
							name="livePhoto"
							control={control}
							defaultValue=""
							rules={{
								required: 'Une photo immédiate est requise',
							}}
							render={({ field }) => (
								<View>
									<TextInput
										{...field}
										style={styles.textInput}
										value={livePhoto ? 'Votre photo est enregistrée :)' : "Appuyez sur l'appareil photo et souriez :)"}
										mode="outlined"
										error={errors.livePhoto}
										right={<TextInput.Icon icon="camera" onPress={toggleCamera} />}
										editable={false}
									/>
									{errors.livePhoto && <HelperText type="error">{errors.livePhoto.message}</HelperText>}
								</View>
							)}
						/>
						{/* ... */}
						{/* Image placeholder */}
						{!livePhoto && <Image source={placeholderImage} style={styles.placeholderImage} />}
						<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="never">
							{/* Affichez la "livePhoto" conditionnellement */}
							{livePhoto ? <Image source={{ uri: livePhoto }} style={styles.image} /> : null}
						</ScrollView>
						{!showCamera && livePhoto && (
							<Button style={styles.buttonNewPhoto} mode="outlined" onPress={toggleCamera}>
								Prendre une nouvelle photo
							</Button>
						)}

						<View style={styles.checkboxContainer}>
							<CheckBox value={acceptedTerms} onValueChange={toggleTermsAcceptance} />
							<Text style={styles.checkboxLabel}>
								Je reconnais avoir pris connaissance du réglement et je certifie la conformité des informations soumises.
							</Text>
						</View>
						<Button style={styles.buttonOutlined} onPress={() => cameraRef && onSubmit()}>
							<Text style={styles.buttonText}>Valider mon compte</Text>
						</Button>
						<Button style={styles.buttonReset} onPress={onReset}>
							Reset
						</Button>
					</ScrollView>
				</View>
			</TouchableWithoutFeedback>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	buttonNewPhoto: {
		marginTop: 15,
	},
	camera: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
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

	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 5,
	},
	checkboxLabel: {
		marginLeft: 8,
		fontSize: 14,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
	buttonOutlined: {
		margin: 5,
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
	},
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
	image: {
		width: 300,
		height: 300,
		borderRadius: 8,
		resizeMode: 'cover',
		alignSelf: 'center',
		marginTop: 20,
	},
	scrollContainer: {
		flex: 1,
	},
	placeholderImage: {
		width: 300,
		height: 300,
		borderRadius: 8,
		resizeMode: 'cover',
		alignSelf: 'center',
		marginTop: 20,
	},
});
