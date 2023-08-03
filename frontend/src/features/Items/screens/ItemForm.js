import { Picker } from '@react-native-community/picker';
import CheckBox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInputMask } from 'react-native-masked-text';
import { Badge, Button, HelperText, IconButton, List, MD3Colors, Menu, Provider as PaperProvider, TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setToken, setUser } from '../../../../reducers/user';
import formTheme from '../../../features/welcome/themes/FormTheme';
import { parseAddress } from '../../helpers/addressHelper';
import { createNewItem } from '../../helpers/createNewItem';
import { fetchCategories } from '../../helpers/fetchCategories';
import { MapPicker } from '../components/MapPicker';

export const ItemForm = () => {
	// GOOGLE PLACES
	const [isMapVisible, setMapVisible] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
	// SELECT LIST ETAT
	const [selectedEtat, setSelectedEtat] = useState('');
	// SELECT LIST MODE DE REMISE
	const [selectedRemise, setSelectedRemise] = useState('');
	//
	const [category, setCategory] = useState([]);
	const [categories, setCategories] = useState([]);
	const [myAddressParsed, setMyAddressParsed] = useState({});
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.token);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');
	// Filter out objects with undefined values
	console.log('From the reducer ', token);
	// A DEPLACER DANS LE HELPER CategoriesAutocomplete
	const filteredCategories = categories.filter((category) => category.value !== undefined);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const data = await fetchCategories(); // Use the helper function
			console.log('from thefetch in form', data);
			setCategories(data);
		} catch (error) {
			// Handle the error if needed
		}
	};

	const handleSelectCategories = (suggestion) => {
		if (selectedCategory) {
			setCategory(suggestion);
			console.log('hello', category);
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

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		getValues,
		reset,
	} = useForm();
	// PARSE L ADRESSE DANS UN OBJET

	// --------------------------ENVOI DU FORMULAIRE --------------------------------
	const onSubmit = (data) => {
		const newItemData = {
			category: selectedCategory,
			name: data.name,
			description: {
				details: data.description,
				photos: data.photos,
				videos: data.videos,
			},

			etat: selectedEtat,
			localisation: selectedLocation.location,
			remise: selectedRemise,
		};

		console.log('newItemDataaaaa:', newItemData);
		// Call the helper function to create a new item
		// TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3YzUyYjRkNGFmNzIwNDY5OWM3ZjciLCJpYXQiOjE2OTA4MTM3Mzl9.B3ZGiXcBZHAK4JtH6ZfM3_PGxJhoxEdC3SSZmVztMdw
		// NE PAS OUBLIER DE RETIRER
		// token =
		// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3YzUyYjRkNGFmNzIwNDY5OWM3ZjciLCJpYXQiOjE2OTA4MTM3Mzl9.B3ZGiXcBZHAK4JtH6ZfM3_PGxJhoxEdC3SSZmVztMdw';
		console.log('token from create item', token);
		createNewItem(token, newItemData)
			.then((data) => {
				console.log('New item created:fffffffffffffffffffffffffffffffffffffff', data);
			})
			.catch((error) => {});
	};

	//Set The Location from the map
	const handleLocationSelected = (location, address) => {
		setSelectedLocation({ location, address });
		setMapVisible(false);
	};

	useEffect(() => {
		if (selectedLocation) {
			const parsedAddress = parseAddress(selectedLocation.address);
			setMyAddressParsed(parsedAddress);
			console.log('parsed address on map pick', parsedAddress);
		}
	}, [selectedLocation]);

	// AUTOCOMPLETE A A DEPLACER ICI
	const data = [
		{ name: 'Très usé', id: '1' },
		{ name: 'Usé', id: '2' },
		{ name: 'Bon état', id: '3' },
		{ name: 'Neuf', id: '4' },
	];

	const findItem = (query) => {
		if (query === '') {
			return [];
		}

		const regex = new RegExp(`${query.trim()}`, 'i');
		return data.filter((item) => item.name.search(regex) >= 0);
	};

	const dataSelectList = [
		{ key: 'bad', value: 'Très usé' },
		{ key: 'used', value: 'Usé' },
		{ key: 'good', value: 'Bon état' },
		{ key: 'new', value: 'Neuf' },
	];

	const dataModeRemise = [
		{ key: '1', value: 'Remise en main propre' },
		{ key: '2', value: 'A retirer sur place' },
		{ key: '3', value: 'Livraison' },
		// { key: '4', value: 'Neuf' },
	];

	return (
		<PaperProvider theme={formTheme}>
			<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
				<View style={styles.container}>
					{/* // CHAMP CATEGORIE -------------------------------------------------------------------- */}
					{/* <DropDownPicker
						items={filteredCategories}
						defaultValue={selectedCategory}
						containerProps={{ style: { height: 40, width: 200 } }}
						style={{ backgroundColor: '#fafafa' }}
						itemStyle={{ justifyContent: 'flex-start' }}
						dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
						onChangeItem={(item) => setSelectedCategory(item.value)}
						labelProps={{ style: { fontSize: 14, color: 'black' } }}
						selectedItemLabelProps={{ style: { color: 'red' } }}
						arrowIconStyle={{ tintColor: 'black' }}
					/> */}
					{/* //SELECTDOWN ---------------------------------------------------------------------- */}
					{/* <SelectDropdown
						data={filteredCategories}
						onSelect={(selectedItem, index) => {
							setSelectedCategory(selectedItem);
							console.log(selectedItem, index);
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							return selectedItem.value;
						}}
						rowTextForSelection={(item, index) => {
							return item.value;
						}}
					/> */}
					<View style={{ width: '90%', alignSelf: 'center' }}>
						<SelectList setSelected={setSelectedCategory} data={filteredCategories} value={selectedCategory} />
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
								label="Description"
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
					<View>
						<SelectList setSelected={setSelectedEtat} data={dataSelectList} value={selectedEtat} />
					</View>
					{/* // ROW CONTAINER -------------------------------------------------------------------- */}
					<View style={styles.rowContainer}>
						{/* // CHAMP PRIX ---------------------------------------------------------------- */}
						<Controller
							name="price"
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
										error={errors && errors.price}
										right={<TextInput.Icon icon="currency-eur" />}
										keyboardType="numeric"
										onChangeText={(text) => field.onChange(text)}
									/>
									{errors.price && <HelperText type="error">{errors.price.message}</HelperText>}
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
									error={errors.name ? true : false}
									left={<TextInput.Icon icon="camera" />}
								/>
							)}
							name="photos"
							rules={{ required: 'Vouds devez poster au moins une photo de votre objet' }}
							defaultValue=""
						/>
						{/* // CHAMP CALENDRIER ------------------------------------------------------------------ */}
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.textInput}
									label="Calendrier"
									mode="outlined"
									onChangeText={(text) => onChange(text)}
									onBlur={onBlur}
									value={value}
									error={errors.name ? true : false}
									left={<TextInput.Icon icon="calendar" />}
								/>
							)}
							name="calendrier"
							rules={{ required: '' }}
							defaultValue=""
						/>
					</View>

					{/* // CHAMP MAP --------------------------------------------------------------------- */}

					<View style={{ flex: 1 }}>
						{/* Button to open the MapPicker */}
						<Button title="Select Location" onPress={() => setMapVisible(true)} />
						{/* Show the selected location */}
						{selectedLocation && (
							<View>
								<Text>Latitude: {selectedLocation.location.latitude}</Text>
								<Text>Longitude: {selectedLocation.location.longitude}</Text>
							</View>
						)}
						{/* The MapPicker component */}
						{/* <MapPicker isVisible={isMapVisible} onLocationSelected={handleLocationSelected} onClose={() => setMapVisible(false)} /> */}
					</View>
					<View style={{ Flex: 1, fontSize: 25 }}>
						<View tyle={{ flex: 1, alignItems: 'center', fontSize: 25 }}>
							<Badge size="30" style={{ paddingHorizontal: 10, alignSelf: 'center', backgroundColor: '#FFCE52', color: '#155263' }}>
								Localisation de votre objet
							</Badge>
						</View>
					</View>
					<MapPicker isVisible={isMapVisible} onLocationSelected={handleLocationSelected} onClose={() => setMapVisible(false)} />
					<View style={{ flex: 1, alignSelf: 'center' }}>
						<IconButton icon="map" size={30} onPress={() => setMapVisible(true)} />
					</View>
					<View style={{ flex: 1, alignSelf: 'center' }}>
						{selectedLocation ? (
							<Badge size="30" style={{ paddingHorizontal: 20 }}>
								{selectedLocation.address}
							</Badge>
						) : (
							''
						)}
					</View>
				</View>

				{/* // CHAMP MODE DE REMISE ---------------------------------------------------------------- */}
				<View style={{ width: '90%', alignSelf: 'center' }}>
					<SelectList setSelected={setSelectedRemise} data={dataModeRemise} value={selectedRemise} />
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
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSubmit(onSubmit)}>
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

	selectList: {
		flex: 1,
		fontSize: 10,
		height: 25,
		backgroundColor: '#E8E8E8',
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
