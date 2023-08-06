import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, PaperProvider } from 'react-native-paper';
import { formTheme } from '../../../../src/infrastructure/theme/themePaper';
import { ItemCard } from '../components/ItemCard';

const EXPO_PUBLIC_SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const ResultScreen = ({ route }) => {
	const [userLatitude, setUserLatitude] = useState(null);
	const [userLongitude, setUserLongitude] = useState(null);
	const categoryName = route.params.category.name;
	// console.log(route.params);
	const [items, setItems] = useState([]);

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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

	// RECUPERERE LA POSITION ET L'AUTHORISATION d'utilisateur

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
				data = data.filter((item) => {
					return item.periodes.some((periode) => {
						const itemStartDate = new Date(periode.start);
						const itemEndDate = new Date(periode.end);
						return itemStartDate <= endDate && itemEndDate >= startDate;
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

	const renderItem = ({ item }) => {
		return <ItemCard item={item} userLatitude={userLatitude} userLongitude={userLongitude} />;
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.dateFilter}>
				{/* Start Date Picker */}
				<Button title={`Start Date: ${startDate ? startDate.toDateString() : 'Not Set'}`} onPress={() => setShowStartDatePicker(true)} />
				{showStartDatePicker && (
					<DateTimePicker
						testID="startDatePicker"
						value={startDate}
						mode="date"
						is24Hour={true}
						display="default"
						onChange={onChangeStartDate}
					/>
				)}

				{/* End Date Picker */}
				<Button title={`End Date: ${endDate ? endDate.toDateString() : 'Not Set'}`} onPress={() => setShowEndDatePicker(true)} />
				{showEndDatePicker && (
					<DateTimePicker testID="endDatePicker" value={endDate} mode="date" is24Hour={true} display="default" onChange={onChangeEndDate} />
				)}
				{/* Refresh items after date change */}
				<Button title="Refresh Items" onPress={() => fetchItemsByCategory(categoryName, true)} />
			</View>
			{/* // LISTE DE RECHERCHE */}
			<View style={styles.container}>
				<FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item._id} />
			</View>
		</PaperProvider>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F1F1F1',
	},
	card: {
		marginBottom: 16,
		backgroundColor: '#E8E8E8',
		borderRadius: 0,
		marginVertical: 0,
	},
});
