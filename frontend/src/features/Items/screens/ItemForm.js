import { Picker } from '@react-native-community/picker';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, IconButton, Menu, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setToken, setUser } from '../../../../reducers/user';
import formTheme from '../../../features/welcome/themes/FormTheme';
import { CategoriesAutocomplete } from '../components/CategoriesAutocomplete';
import { MapPicker } from '../components/MapPicker';
import { ModalMap } from '../components/ModalMap';

export const ItemForm = () => {
	const [isMapVisible, setMapVisible] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.token);

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	// On Form Submit
	const onSubmit = (data) => {
		// Handle form submission here
		console.log(data);
	};

	//Set The Location from the map
	const handleLocationSelected = (location, address) => {
		console.log('Selected location:', location);
		console.log('Selected address:', address);
		setSelectedLocation({ location, address });
		setMapVisible(false);
	};

	// AUTOCOMPLETE A A DEPLACeR ICI
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

	const [selected, setSelected] = React.useState('');
	const [categories, setCategories] = React.useState([]);

	const dataSelectList = [
		{ key: 'bad', value: 'Très usé' },
		{ key: 'used', value: 'Usé' },
		{ key: 'good', value: 'Bon état' },
		{ key: 'new', value: 'Neuf' },
	];

	return (
		<PaperProvider theme={formTheme}>
			<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
				<View style={styles.container}>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Autocomplete
								data={findItem(value)}
								defaultValue={value}
								onChangeText={(text) => onChange(text)}
								onBlur={onBlur}
								placeholder="Choix de section..."
								renderItem={({ item }) => (
									<TouchableOpacity onPress={() => onChange(item.name)}>
										<Text>{item.name}</Text>
									</TouchableOpacity>
								)}
							/>
						)}
						name="selectedFruit"
						defaultValue=""
					/>
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

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<SelectList setSelected={setSelected} data={dataSelectList} />
							// <Picker selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
							// 	<Picker.Item label="Quel est l'état de l'objet ?" value="" />
							// 	<Picker.Item label="Mauvais état" value="bad" />
							// 	<Picker.Item label="Usé" value="used" />
							// 	<Picker.Item label="Bon état" value="good" />
							// 	<Picker.Item label="Neuf" value="new" />
							// </Picker>
						)}
						name="selectOption"
						rules={{ required: 'Please select an option' }}
						defaultValue=""
					/>
					<View style={styles.rowContainer}>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.inputInRow}
									label="Prix"
									mode="outlined"
									onChangeText={(text) => onChange(text)}
									onBlur={onBlur}
									value={value}
									error={errors.name ? true : false}
								/>
							)}
							name="Prix"
							rules={{ required: 'Le prix est obligatoire.' }}
							defaultValue=""
						/>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.inputInRow}
									label="Caution"
									mode="outlined"
									onChangeText={(text) => onChange(text)}
									onBlur={onBlur}
									value={value}
									error={errors.name ? true : false}
								/>
							)}
							name="caution"
							rules={{ required: 'Le montant de la caution est obligatoire.' }}
							defaultValue=""
						/>
					</View>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.inputInRow}
									label="Photos"
									mode="outlined"
									onChangeText={(text) => onChange(text)}
									onBlur={onBlur}
									value={value}
									error={errors.name ? true : false}
								/>
							)}
							name="photos"
							rules={{ required: '' }}
							defaultValue=""
						/>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.inputInRow}
									label="Calendrier"
									mode="outlined"
									onChangeText={(text) => onChange(text)}
									onBlur={onBlur}
									value={value}
									error={errors.name ? true : false}
								/>
							)}
							name="calendrier"
							rules={{ required: '' }}
							defaultValue=""
						/>
					</View>

					<View style={{ Flex: 1, flexDirection: 'row' }}>
						<Text>Select Location</Text>
						<IconButton icon="map" size={40} onPress={() => setMapVisible(true)} />
						<MapPicker isVisible={isMapVisible} onLocationSelected={handleLocationSelected} onClose={() => setMapVisible(false)} />
						{/* <Text>{selectedLocation}</Text> */}
					</View>
				</View>

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
