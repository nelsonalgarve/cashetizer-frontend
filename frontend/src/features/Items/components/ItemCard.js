import moment from 'moment';
import 'moment/locale/fr';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Card, Chip, Divider, Text } from 'react-native-paper';
import { calculateDistance } from '../../helpers/calculateDistance';

export const ItemCard = ({ item, userLatitude, userLongitude }) => {
	moment.locale('fr');
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

	const Dispos = item.periodes.map((periode, index) => {
		console.log(periode);
		// const start = moment(periode.start).format('DD MMMM YYYY, h:mm:ss a');
		// const end = moment(periode.end).format('DD MMMM YYYY, h:mm:ss a');

		return (
			<View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
				<Chip
					icon="calendar-alert"
					onPress={() => console.log('Pressed')}
					compact="true"
					textStyle={{ fontSize: 8 }}
					style={styles.chipStyle}
				>
					Période {index + 1}: {moment(periode.start).format('L')} - {moment(periode.end).format('L')}
				</Chip>
			</View>
		);
	});
	const date = new Date(item.periodes.start);
	console.log('FROM ITEM CARD', item.periodes[0].start);
	if (item) {
		return (
			<Card style={styles.card} mode="contained">
				<Card.Cover source={{ uri: item.description.photos[0] }} style={styles.cardImage} />
				<Card.Content style={styles.cardContent}>
					<Text> {item.isAvailable}</Text>
					<Text style={styles.itemName}>{item.name}</Text>
					<Text style={styles.itemDetails}>{limitTextLength(item.description.details, 150)}</Text>
					<Text style={styles.itemPrice}>
						Prix/Jour: {item.prices.perDay}€ - Prix/Sem: {item.prices.perWeek}€ - Prix/Mois: {item.prices.perMonth}€
					</Text>

					{Dispos}
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
		fontSize: 10,
		fontWeight: 'bold',
	},
	itemPrice: {
		fontSize: 10,
		color: 'gray',
	},
	itemDetails: {
		fontSize: 8,
		color: 'gray',
	},
	chipStyle: {
		fontSize: 8,
		backgroundColor: 'white',
	},
	cardContent: {
		backgroundColor: 'white',
	},
});
