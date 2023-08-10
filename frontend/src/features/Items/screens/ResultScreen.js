import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Button as RNButton, StyleSheet, Text, View } from 'react-native';
import { Button, Card, PaperProvider } from 'react-native-paper';
import { formTheme } from '../../../../src/infrastructure/theme/themePaper';
import { ItemCard } from '../components/ItemCard';

const EXPO_PUBLIC_SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const ResultScreen = ({ route }) => {
	const navigation = useNavigation();
	const [userLatitude, setUserLatitude] = useState(null);
	const [userLongitude, setUserLongitude] = useState(null);
	const categoryName = route.params.category.name;
	// console.log(route.params);
	const [items, setItems] = useState([]);

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);
	const [dateTolerance, setDateTolerance] = useState(0);
	const [currentPicker, setCurrentPicker] = useState(null);
	const formatDate = (date) => {
		return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
	};

	const onChangeStartDate = (event, selectedDate) => {
		const currentDate = selectedDate || startDate;
		setShowStartDatePicker(false);
		if (currentDate) setStartDate(currentDate);
	};

	const onChangeEndDate = (event, selectedDate) => {
		const currentDate = selectedDate || endDate;
		setShowEndDatePicker(false);
		if (currentDate) setEndDate(currentDate);
	};

	// RECUPERERE LA POSITION ET L'AUTORISATION d'utilisateur

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status === 'granted') {
				const location = await Location.getCurrentPositionAsync({});
				// console.log(location);
				setUserLatitude(location.coords.latitude);
				setUserLongitude(location.coords.longitude);
				// console.log(location.coords.latitude);
			}
		})();
	}, []);

	// FETCH ITEMS BY CATEGORY NAME
	useEffect(() => {
		fetchItemsByCategory(categoryName); // No date filter applied here
	}, [categoryName]);

	const fetchItemsByCategory = async (categoryName, applyDateFilter = false) => {
		try {
			const encodedCategoryName = encodeURIComponent(categoryName);
			const response = await fetch(`https://cashetizer-backend.vercel.app/item/items/categoryname/${encodedCategoryName}`);
			let data = await response.json();

			// If applyDateFilter is true, filter items based on the date range
			if (applyDateFilter) {
				const adjustedStartDate = new Date(startDate);
				adjustedStartDate.setDate(adjustedStartDate.getDate() - dateTolerance);

				const adjustedEndDate = new Date(endDate);
				adjustedEndDate.setDate(adjustedEndDate.getDate() + dateTolerance);

				data = data.filter((item) => {
					return item.periodes.some((periode) => {
						const itemStartDate = new Date(periode.start);
						const itemEndDate = new Date(periode.end);
						return itemStartDate <= adjustedEndDate && itemEndDate >= adjustedStartDate;
					});
				});
			}

			setItems(data);
		} catch (error) {
			console.error('Error fetching items by category:', error);
			setItems([]);
		}
	};

	// const fetchItemsByCategory = async (categoryName) => {
	// 	const encodedCategoryName = encodeURIComponent(categoryName);
	// 	try {
	// 		const response = await fetch(`https://cashetizer-backend.vercel.app/item/items/categoryname/${encodedCategoryName}`);
	// 		const data = await response.json();
	// 		console.log('searchData', data);
	// 		setItems(data);
	// 	} catch (error) {
	// 		console.error('Error fetching items by category:', error);
	// 		setItems([]);
	// 	}
	// };
	// console.log(items.description);
	console.log(items);
	const renderItem = ({ item }) => {
		return <ItemCard item={item} userLatitude={userLatitude} userLongitude={userLongitude} navigation={navigation} style={styles.card} />;
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.dateFilter}>
				{/* Start Date Picker */}
				<View style={styles.dateFilterRow}>
					<Button
						style={{ minWidth: '49%' }}
						borderColor="#FFCE50"
						compact="true"
						buttonColor="#FFCE52"
						textColor="#155263"
						// rippleColor="green"
						icon="calendar-range"
						onPress={() => setCurrentPicker('start')}>
						{`Du: ${formatDate(startDate)}`}
					</Button>

					<Button
						style={{ minWidth: '49%' }}
						borderColor="#FFCE50"
						compact="true"
						buttonColor="#FFCE52"
						textColor="#155263"
						// rippleColor="green"
						icon="calendar-range"
						onPress={() => setCurrentPicker('end')}>
						{`Au: ${formatDate(endDate)}`}
					</Button>
				</View>
				{/* Refresh items after date change */}
				<View style={styles.dateFilterRow2}>
					<View style={styles.rangePrecision}>
						<Button
							style={{ minWidth: '20%', marginLeft: 0 }}
							icon="calendar-minus"
							textColor="#155263"
							mode="outlined"
							compact="true"
							onPress={() => setDateTolerance((prev) => Math.max(0, prev - 1))}></Button>
						<Text style={{ margin: 5 }}>
							+/- {dateTolerance} jour{dateTolerance > 1 ? 's' : ''}
						</Text>
						<Button
							textColor="#155263"
							icon="calendar-plus"
							style={{ minWidth: '20%', marginLeft: 0 }}
							mode="outlined"
							compact="true"
							onPress={() => setDateTolerance((prev) => prev + 1)}></Button>
					</View>
					<View>
						<Button
							style={styles.buttonsOutlineGreen}
							icon="filter"
							textColor="white"
							mode="outlined"
							onPress={() => fetchItemsByCategory(categoryName, true)}>
							Filtrer
						</Button>
					</View>
				</View>
			</View>
			{/* Modal for DateTimePicker */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={currentPicker !== null}
				onRequestClose={() => {
					setCurrentPicker(null);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						{currentPicker === 'start' && (
							<DateTimePicker
								testID="startDatePicker"
								value={startDate}
								mode="date"
								is24Hour={true}
								display="default"
								onChange={onChangeStartDate}
							/>
						)}
						{currentPicker === 'end' && (
							<DateTimePicker
								testID="endDatePicker"
								value={endDate}
								mode="date"
								is24Hour={true}
								display="default"
								onChange={onChangeEndDate}
							/>
						)}
						<RNButton title="Done" onPress={() => setCurrentPicker(null)} />
					</View>
				</View>
			</Modal>

			{/* // LISTE DE RECHERCHE */}
			<View style={styles.container}>
				<FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item._id} />
			</View>
		</PaperProvider>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 7,
		backgroundColor: '#F1F1F1',
		padding: 10, // added padding
	},
	buttonsOutlineGreen: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#155263',
		borderWidth: 1,
		marginRight: 20,
		borderColor: '#FFFFFF',
		width: '100%',
		paddingHorizontal: 1,
		borderRadius: 20,
		shadowColor: 'rgba(0, 0, 0, 0.4)',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 1,
		shadowRadius: 3,
		elevation: 4,
	},
	modalView: {
		width: '40%',
		height: '20%',
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		marginBottom: 5,
		backgroundColor: 'red',
		borderRadius: 8, // rounded corners
		marginVertical: 5, // slight vertical margin for space between
		elevation: 3, // shadow for Android
		shadowColor: '#000', // shadow color for iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	dateFilter: {
		flex: 1,
		margin: 5,
		backgroundColor: 'white',
		borderRadius: 8,
		padding: 20,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	dateFilterRow: {
		// flex: 1,
		flexDirection: 'row',
		margin: 2,
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 5,
	},
	dateFilterRow2: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	rangePrecision: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// width: '50%', // take up 70% of the container width
		marginRight: 65,
	},
});
