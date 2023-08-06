import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { calculateDistance } from '../../helpers/calculateDistance';

export const ItemCard = ({ item, userLatitude, userLongitude }) => {
	const distanceKm = calculateDistance(
		userLatitude, // Replace with the user's latitude
		userLongitude, // Replace with the user's longitude
		item.localisation.latitude, // Replace with the item's latitude
		item.localisation.longitude // Replace with the item's longitude
	);
	// Perform a conditional check to ensure the 'item' object and 'prices' property exist
	function limitTextLength(text, maxLength) {
		if (text.length <= maxLength) {
			return text;
		}

		return text.substring(0, maxLength) + '...'; // adds '...' at the end
	}

	const Disponibilités = item.periodes.map((periode, index) => {
		return (
			<Text key={index} style={styles.itemDistance}>
				Disponibilités: {item.periodes.start}
			</Text>
		);
	});
	const date = new Date(item.periodes.start);
	console.log('FROM ITEM CARD', item);
	if (item) {
		return (
			<Card style={styles.card} mode="contained">
				<Card.Cover source={{ uri: item.description.photos[0] }} style={styles.cardImage} />
				<Card.Content>
					<Text> {item.isAvailable}</Text>
					<Text style={styles.itemName}>{item.name}</Text>
					<Text style={styles.itemDetails}>{limitTextLength(item.description.details, 150)}</Text>
					<Text style={styles.itemPrice}>
						Prix/Jour: {item.prices.perDay}€ - Prix/Sem: {item.prices.perWeek}€ - Prix/Mois: {item.prices.perMonth}€
					</Text>
					{/* <Text style={styles.itemPrice}>
						Prix/Jour: {item.periode}€ - Prix/Sem: {item.prices.perWeek}€ - Prix/Mois: {item.prices.perMonth}€
					</Text> */}
					{/* <Disponibilités /> */}
					<Text style={styles.itemDistance}>Distance: {distanceKm.toFixed(2)} km</Text>
				</Card.Content>
			</Card>
		);
	} else {
		return null;
	}
};
const styles = StyleSheet.create({
	card: {
		marginBottom: 16,
		backgroundColor: '#E8E8E8',
		borderRadius: 0,
		marginVertical: 0,
	},
	cardImage: {
		// width: '100%',
		// height: 150, // or whatever height you want
		objectFit: 'contain',
	},
	itemName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	itemPrice: {
		fontSize: 14,
		color: 'gray',
	},
});
