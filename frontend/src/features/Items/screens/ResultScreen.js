import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, PaperProvider } from 'react-native-paper';
import { formTheme } from '../../../../src/infrastructure/theme/themePaper';
import { ItemCard } from '../components/ItemCard'; // Import the ItemCard component
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const ResultScreen = ({ route }) => {
	const [userLatitude, setUserLatitude] = useState(null);
	const [userLongitude, setUserLongitude] = useState(null);
	const categoryName = route.params.category.name;
	// console.log(route.params);
	const [items, setItems] = useState([]);

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

	useEffect(() => {
		fetchItemsByCategory(categoryName);
	}, [categoryName]);

	const fetchItemsByCategory = async (categoryName) => {
		const encodedCategoryName = encodeURIComponent(categoryName);
		try {
			const response = await fetch(`${SERVER_URL}/item/items/categoryname/${encodedCategoryName}`);
			const data = await response.json();
			// console.log('searchData', data);
			setItems(data);
		} catch (error) {
			console.error('Error fetching items by category:', error);
			setItems([]);
		}
	};
	// console.log(items.description);
	const renderItem = ({ item }) => {
		return <ItemCard item={item} userLatitude={userLatitude} userLongitude={userLongitude} />;
	};

	return (
		<PaperProvider theme={formTheme}>
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
