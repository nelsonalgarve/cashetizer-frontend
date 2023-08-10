import { Picker } from '@react-native-community/picker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import CheckBox from 'expo-checkbox';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInputMask } from 'react-native-masked-text';

import { Ionicons } from '@expo/vector-icons';
import {
	Badge,
	Button,
	Divider,
	HelperText,
	IconButton,
	List,
	MD3Colors,
	Menu,
	Provider as PaperProvider,
	Surface,
	TextInput,
} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setToken, setUser } from '../../../../reducers/user';
import formTheme from '../../../features/welcome/themes/FormTheme';
import PhotoViewerModal from '../../helpers/PhotoViewerModal';
import { parseAddress } from '../../helpers/addressHelper';
import { createNewItem } from '../../helpers/createNewItem';
import { fetchCategories } from '../../helpers/fetchCategories';
import DatePicker from '../components/DatePicker';
import { MapPicker } from '../components/MapPicker';
const SERVER_URL = process.env.SERVER_URL;

export const ItemForm = () => {
	// GOOGLE PLACES
	const [isMapVisible, setMapVisible] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
	// SELECT LIST ETAT
	const [selectedEtat, setSelectedEtat] = useState('');
	// DATE PICKER
	const [isDatePickerVisible, setDatePickerVisible] = useState(false);
	const [periods, setPeriods] = useState([]);
	moment.locale('fr');
	const addPeriod = (period) => {
		// Prevent adding a period if the start date is later than the end date
		if (period.start > period.end) {
			alert('Invalid period. The start date should be earlier than the end date.');
			return;
		}

		setPeriods((oldPeriods) => [...oldPeriods, period]);
	};

	const deletePeriod = (index) => {
		setPeriods((oldPeriods) => oldPeriods.filter((_, i) => i !== index));
	};
	// SELECT LIST MODE DE REMISE
	const [selectedRemise, setSelectedRemise] = useState('');
	//
	const [category, setCategory] = useState([]);
	const [categories, setCategories] = useState([]);
	const [myAddressParsed, setMyAddressParsed] = useState({});
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.tokenValue);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [cameraType, setCameraType] = useState(CameraType.front);
	const [hasPermission, setHasPermission] = useState(false);
	const [showCamera, setShowCamera] = useState(false);
	const [livePhoto, setLivePhoto] = useState('');
	const isFocused = useIsFocused();
	const cameraRef = useRef(null);
	console.log('tokenUseSelector_________________________________________________', token);
	// USESTATE PHOTOS
	const [photos, setPhotos] = useState([]);
	const [photoViewerVisible, setPhotoViewerVisible] = useState(false);
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

	// Filter out objects with undefined values

	// A DEPLACER DANS LE HELPER CategoriesAutocomplete
	const filteredCategories = categories.filter((category) => category.value !== undefined);
	const showAlert = (message) => {
		alert(message);
	};

	useEffect(() => {
		fetchData();
	}, []);

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
			if (photos.length >= 3) {
				showAlert('Vous êtes limités à 3 photos maximum');
				return;
			}

			const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
			setPhotos([...photos, photo.uri]);
			if (photos.length === 3) {
				await uploadPhotos();
			}
		}
	};

	const handleSubmit = async () => {
		console.log('Uploading');
		setIsButtonClicked(true);
		await uploadPhotos();
	};

	const toggleCamera = () => {
		setShowCamera((prevShowCamera) => !prevShowCamera);
		if (showCamera) {
			takePhoto();
		}
	};

	const toggleCameraType = () => {
		setCameraType((prevCameraType) => (prevCameraType === CameraType.front ? CameraType.back : CameraType.front));
	};

	const fetchData = async () => {
		try {
			const data = await fetchCategories(); // Use the helper function
			// console.log('from thefetch in form', data)
			setCategories(data);
		} catch (error) {
			// Handle the error if needed
		}
	};

	const handleSelectCategories = (suggestion) => {
		if (selectedCategory) {
			setCategory(suggestion);
			setSelectedCategory(null);
		}
	};

	const onSubmitTerms = (data) => {
		if (!acceptedTerms) {
			alert("Veuillez accepter les termes d'utilisation avant de vous inscrire.");
			return;
		}
	};

	const toggleTermsAcceptance = () => {
		setAcceptedTerms(!acceptedTerms);
	};

	const onReset = () => {
		reset();
	};

	// useForm hook RECUPERE LES DONNÉES DU FORMULAIRE
	const {
		control,
		setValue,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	// --------------------------ENVOI DU FORMULAIRE --------------------------------
	// A L'AIDE DU HELPER createNewItem.js--------------------------------------------

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();

			// VERIFIE SI ARRAY PHOTOS EXISTE
			if (photos && Array.isArray(photos)) {
				for (let i = 0; i < photos.length; i++) {
					formData.append('photoFromFront', {
						uri: photos[i],
						name: `photo_${i}.jpg`,
						type: 'image/jpeg',
					});
				}
			} else {
				console.log('pas de photos:', photos);
			}
			console.log('photos----------------------------------------------', photos);
			// Récupère les données du formulaire------------------------------
			console.log('data----------------', getValues());
			/// A faire attribuer
			const { name, description, prices, caution } = getValues();

			const payload = {
				// ...data,

				// name: data,
				name,
				description,
				category: selectedCategory,
				etat: selectedEtat,
				localisation: selectedLocation.location,
				remise: selectedRemise,
				periodes: periods,
				prices: prices,
				caution: caution,
			};

			delete payload.photos;
			console.log('payload--------------------------------', token);
			for (const key in payload) {
				formData.append(key, typeof payload[key] === 'object' ? JSON.stringify(payload[key]) : payload[key]);
			}

			//token provisoire pour tests
			// const token =
			// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzZDlkN2I3Y2U5MmI2NWMwNDc5MGEiLCJpYXQiOjE2OTE2MjIxMTJ9.E1876ldSYf4atZDU1NMqrlte_rk89ObCUgR9slSmUno';

			// Submit main payload
			createNewItem(token, formData)
				.then((data) => {
					console.log('New item created:', data);
				})
				.catch((error) => {
					console.error('Error in createNewItem:', error);
				});
		} catch (error) {
			console.error('Error in onSubmit:', error);
		}
	};

	//Set The Location from the map
	const handleLocationSelected = (location, address) => {
		setSelectedLocation({ location, address });
		setMapVisible(false);
	};

	// UseEffect qui sert à parser l'adresse récupérée en un objet{number, street, city, zipCode}

	useEffect(() => {
		if (selectedLocation) {
			const parsedAddress = parseAddress(selectedLocation.address);
			setMyAddressParsed(parsedAddress);
			// console.log('parsed address on map pick', parsedAddress);
		}
	}, [selectedLocation]);

	// AUTOCOMPLETE A A DEPLACER ICI
	const data = [
		{ name: 'Neuf', id: '1' },
		{ name: 'Bon état', id: '2' },
		{ name: 'Acceptable', id: '3' },
		{ name: 'Usé', id: '4' },
		{ name: 'Très usé', id: '5' },
	];

	const findItem = (query) => {
		if (query === '') {
			return [];
		}

		const regex = new RegExp(`${query.trim()}`, 'i');
		return data.filter((item) => item.name.search(regex) >= 0);
	};

	const dataSelectList = [
		{ key: 'new', value: 'Neuf' },
		{ key: 'good', value: 'Bon état' },
		{ key: 'ok', value: 'Acceptable' },
		{ key: 'used', value: 'Usé' },
		{ key: 'veryused', value: 'Très usé' },
	];

	const dataModeRemise = [
		{ key: '1', value: 'Remise en main propre' },
		{ key: '2', value: 'A retirer sur place' },
		{ key: '3', value: 'Livraison' },
		// { key: '4', value: 'Neuf' },
	];

	const deletePhoto = (index) => {
		const updatedPhotos = [...photos];
		updatedPhotos.splice(index, 1);
		setPhotos(updatedPhotos);
	};

	const openPhotoViewer = (index) => {
		setCurrentPhotoIndex(index);
		setPhotoViewerVisible(true);
	};

	const closePhotoViewer = () => {
		setPhotoViewerVisible(false);
	};

	const handleNext = () => {
		setCurrentPhotoIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
	};

	const handlePrev = () => {
		setCurrentPhotoIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
	};

	/* 	 const renderPhotos = () => {
    return photos.map((photo, index) => (
      <TouchableOpacity key={index} onPress={() => openPhotoViewer(index)}>
        <Image source={{ uri: photo }} style={{ width: 100, height: 100, marginBottom: 10 }} />
      </TouchableOpacity>
    ));
  }; */
	const renderPhotos = () => {
		return photos.map((photo, index) => (
			<TouchableOpacity key={index} onPress={() => openPhotoViewer(index)}>
				<Image source={{ uri: photo }} style={{ width: 100, aspectRatio: 2 / 3, marginBottom: 10 }} />
				<TouchableOpacity onPress={() => deletePhoto(index)}>
					<Ionicons style={{ color: 'red', textAlign: 'center', marginTop: -5, marginBottom: 10 }} name="trash-bin-outline" size={20} />
				</TouchableOpacity>
			</TouchableOpacity>
		));
	};

	return (
		<PaperProvider theme={formTheme}>
			<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
				<View style={styles.container}>
					<View style={{ width: '100%', alignSelf: 'center' }}>
						<SelectList
							setSelected={setSelectedCategory}
							data={filteredCategories}
							value={selectedCategory}
							placeholder="Choisissez une catégorie"
						/>
					</View>

					{/* // CHAMP TITRE -------------------------------------------------------------------- */}
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								label="Titre"
								mode="outlined"
								onChangeText={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
								error={errors.name ? true : false}
							/>
						)}
						name="name"
						rules={{ required: "Le titre de l/'annonce est obligatoire" }}
						defaultValue=""
					/>
					{/* // CHAMP DESCRIPTION ------------------------------------------------------------------- */}
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								label="Décrivez votre objet ici en quelques mots"
								mode="outlined"
								multiline={true}
								numberOfLines={5}
								style={{ height: 100, paddingVertical: 10 }}
								onChangeText={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
								error={errors.name ? true : false}
							/>
						)}
						name="description"
						rules={{ required: 'La description est obligatoire' }}
						defaultValue=""
					/>
					{/* // CHAMP ETAT DE L'OBJET --------------------------------------------------------------------- */}
					<View style={styles.etatContainer}>
						<SelectList
							setSelected={setSelectedEtat}
							data={dataSelectList}
							value={selectedEtat}
							placeholder="Dans quel état est votre objet?"
						/>
					</View>
					{/* // ROW CONTAINER -------------------------------------------------------------------- */}
					<View style={styles.rowContainer}>
						{/* // CHAMP PRIX ---------------------------------------------------------------- */}
						<Controller
							name="prices"
							control={control}
							defaultValue=""
							rules={{ required: 'Price is required' }}
							render={({ field }) => (
								<View style={{ flex: 1 }}>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										maxLength={6}
										label="Prix"
										mode="outlined"
										error={errors && errors.prices}
										right={<TextInput.Icon icon="currency-eur" />}
										keyboardType="numeric"
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.prices && <HelperText type="error">{errors.prices.message}</HelperText>}
								</View>
							)}
						/>
						{/* //CHAMP CAUTION ----------------------------------------------------------------- */}
						<Controller
							name="caution"
							control={control}
							defaultValue=""
							rules={{ required: 'Caution is required' }}
							render={({ field }) => (
								<View style={{ flex: 1 }}>
									<TextInput
										style={styles.textInput}
										{...field}
										value={field.value}
										maxLength={6}
										label="Caution"
										mode="outlined"
										error={errors && errors.caution}
										right={<TextInput.Icon icon="currency-eur" />}
										keyboardType="numeric"
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.caution && <HelperText type="error">{errors.caution.message}</HelperText>}
								</View>
							)}
						/>
					</View>
					{/* Affichez la caméra uniquement si showCamera est true */}
					{showCamera && (
						<Modal animationType="slide" transparent={false} visible={showCamera} onRequestClose={() => setShowCamera(false)}>
							<View style={{ flex: 1 }}>
								<Camera type={cameraType} ref={cameraRef} style={{ flex: 1 }} />
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
									<IconButton icon="close" size={30} onPress={() => setShowCamera(false)} />
									<IconButton icon="camera-switch" size={30} onPress={toggleCameraType} />
									<IconButton icon="camera" size={30} onPress={toggleCamera} />
								</View>
							</View>
						</Modal>
					)}
					<View>
						{/* // CHAMP PHOTOS A IMPORTER ------------------------------------------------------------------ */}
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.textInput}
									label="Photos"
									mode="outlined"
									onChangeText={(text) => onChange(text)}
									onBlur={onBlur}
									value={value}
									editable={false}
									error={errors.name ? true : false}
									right={<TextInput.Icon icon="camera" onPress={toggleCamera} />}
								/>
							)}
							name="photos"
							// rules={{ required: 'Vous devez poster au moins une photo de votre objet' }}
							defaultValue=""
						/>
						<View style={styles.photosContainer}>
							{/* Display the existing photos */}
							{renderPhotos()}
							<Button title="Prendre une photo" onPress={takePhoto} />

							{/* PhotoViewerModal */}
							<PhotoViewerModal
								visible={photoViewerVisible}
								photos={photos}
								currentIndex={currentPhotoIndex}
								onClose={closePhotoViewer}
								onNext={handleNext}
								onPrev={handlePrev}
								onDelete={deletePhoto}
								setPhotos={setPhotos}
								showDeleteIcon={true}
							/>
						</View>
						{/* // CHAMP CALENDRIER ------------------------------------------------------------------ */}
						<Surface style={styles.surface} elevation={1}>
							{/* // CHAMP CALENDRIER ------------------------------------------------------------------ */}

							<View
								style={{
									flex: 1,
									marginTop: -10,
									minWidth: '100%',
									backgroundColor: '#FFCE52',
									justifyContent: 'center',
									alignItems: 'center',
									paddingTop: 5,
									borderRadius: 50,
								}}>
								<Badge
									size={30}
									icon="calendar"
									style={{
										paddingHorizontal: 5,
										alignSelf: 'center',
										backgroundColor: '#FFCE52',
										color: '#155263',
										fontWeight: 500,
									}}
									onPress={() => setDatePickerVisible(true)}>
									<Icon name="calendar" size={20} /> Remplissez le calendrier de disponibilité
								</Badge>

								<DatePicker isVisible={isDatePickerVisible} onClose={() => setDatePickerVisible(false)} onAddPeriod={addPeriod} />
								<ScrollView style={{ marginTop: 20, width: '80%' }}></ScrollView>
							</View>
							{periods.map((period, index) => (
								<View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
									<Divider />
									<Badge
										icon="camera"
										size="30"
										style={{
											paddingHorizontal: 5,
											alignSelf: 'center',
											// backgroundColor: '#FFCE52',

											fontSize: 12,
											color: 'white',
											minHeight: '100%',
										}}>
										Période {index + 1}: {moment(period.start).format('L')} - {moment(period.end).format('L')}
									</Badge>
									<Divider />

									<Button
										icon="delete"
										mode="oulined"
										compact="false"
										style={{ paddingHorizontal: 0 }}
										onPress={() => deletePeriod(index)}></Button>
								</View>
							))}
						</Surface>
					</View>

					{/* // CHAMP MAP --------------------------------------------------------------------- */}

					<View style={{ flex: 1 }}>
						{/* Button to open the MapPicker */}
						<Button title="Select Location" onPress={() => setMapVisible(true)} />
						{/* Show the selected location */}
						{/* {selectedLocation && (
							// <View>
							// 	<Text>Latitude: {selectedLocation.location.latitude}</Text>
							// 	<Text>Longitude: {selectedLocation.location.longitude}</Text>
							// </View>
						)} */}
						{/* The MapPicker component */}
						{/* <MapPicker isVisible={isMapVisible} onLocationSelected={handleLocationSelected} onClose={() => setMapVisible(false)} /> */}
					</View>
					<View style={{ Flex: 1, fontSize: 25, marginTop: -30 }}>
						<View style={{ flex: 1, alignItems: 'center', fontSize: 25 }}>
							<Badge
								size={30}
								style={{
									height: 40,
									width: '100%',
									alignSelf: 'center',
									backgroundColor: '#FFCE52',
									color: '#155263',
									fontWeight: 500,
								}}
								onPress={() => setMapVisible(true)}>
								<Ionicons style={{ marginTop: 5 }} name="location" size={20} />
								Cliquez ici pour géolocaliser votre objet
							</Badge>
						</View>
					</View>
					<MapPicker isVisible={isMapVisible} onLocationSelected={handleLocationSelected} onClose={() => setMapVisible(false)} />
					<View style={{ flex: 1, alignSelf: 'center', marginTop: 10 }}>
						{selectedLocation ? (
							<Badge size={30} style={{ paddingHorizontal: 20, fontSize: 13 }}>
								{selectedLocation.address}
							</Badge>
						) : (
							''
						)}
					</View>
				</View>

				{/* // CHAMP MODE DE REMISE ---------------------------------------------------------------- */}
				<View style={{ width: '90%', alignSelf: 'center' }}>
					<SelectList
						setSelected={setSelectedRemise}
						data={dataModeRemise}
						value={selectedRemise}
						placeholder="Choisissez le(s) mode(s) de remise?"
					/>
				</View>

				<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
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
				{/* // CONDITIONS ET SUBMIT BUTTON - */}
				<View style={styles.checkboxContainer}>
					<CheckBox value={acceptedTerms} onValueChange={toggleTermsAcceptance} />
					<Text style={styles.checkboxLabel}>
						J'accepte les conditions d'utilisation de Cashetizer et la politique de confidentialité de Cashetizer industry.
					</Text>
				</View>
				<View style={styles.buttonsContainer}>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={onSubmit}>
						<Text style={styles.buttonText}>Poster l'annonce</Text>
					</Button>

					{/* <Button mode="outlined" onPress={onReset}>
						Mot de passe oublié ?
					</Button> */}
				</View>
			</ScrollView>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	camera: {
		flex: 1,
		width: 100,
		height: 500,
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		padding: 25,
		justifyContent: 'space-between',
	},
	rowContainer: {
		// flex: 1,
		flexDirection: 'row',
		alignItems: 'space-between',
		justifyContent: 'flex-start',
	},
	etatContainer: {
		marginTop: 5,
	},
	pickerSelect: {
		height: 150,
		fontSize: 8,
	},
	inputInRow: {
		flex: 1,
		marginRight: 10,
		marginLeft: 10,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
	uttonsContainer: {
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
	surface: {
		backgroundColor: 'transparent',
	},
	selectList: {
		flex: 1,
		fontSize: 10,
		height: 25,
		backgroundColor: '#E8E8E8',
	},
	photosContainer: {
		marginTop: 10,
		marginLeft: 30,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#ccc',
		padding: 0,
	},
	photoViewerModalContainer: {
		width: 100,
		height: 400,
		alignItems: 'center',
		justifyContent: 'center',
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
