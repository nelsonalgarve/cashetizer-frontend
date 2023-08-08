import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Button, Card, Chip, Divider, Text } from 'react-native-paper';
import { calculateDistance } from '../../helpers/calculateDistance';
import { SingleItem } from '../screens/SingleItem';

function limitTextLength(text, maxLength) {
	if (text.length <= maxLength) {
		return text;
	}

	return text.substring(0, maxLength) + '...'; // adds '...' at the end
}

export const ItemCard = ({ item, userLatitude, userLongitude, navigation }) => {
	const [distanceKm, setDistanceKm] = useState(0);

	const toSingleItemPage = () => {
		navigation.navigate('SingleProduct', {
			item: item,
			userLatitude: userLatitude,
			userLongitude: userLongitude,
			distanceKm: distanceKm,
			// periodes: item.periodes,
		});
	};

	const toProductForm = () => {
		navigation.navigate('ProductForm', {
			item: item,
			userLatitude: userLatitude,
			userLongitude: userLongitude,
			distanceKm: distanceKm,
			// periodes: item.periodes,
		});
	};

	moment.locale('fr');

	useEffect(() => {
		setDistanceKm(calculateDistance(userLatitude, userLongitude, item.localisation.latitude, item.localisation.longitude));
	}),
		[];

	const Dispos = item.periodes.map((periode, index) => {
		console.log(periode);
		// const start = moment(periode.start).format('DD MMMM YYYY, h:mm:ss a');
		// const end = moment(periode.end).format('DD MMMM YYYY, h:mm:ss a');

		return (
			<View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
				<Chip
					icon="calendar-alert"
					onPress={() => console.log('Pressed')}
					compact={true}
					textStyle={{ fontSize: 8 }}
					style={styles.chipStyle}>
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
					<View style={styles.buttonsInRow}>
						<Button icon="camera" mode="contained" onPress={toSingleItemPage}>
							Press me
						</Button>
						<Button icon="camera" mode="contained" onPress={toProductForm}>
							Press me
						</Button>
					</View>
				</Card.Content>
			</Card>
		);
	} else {
		return null;
	}
};
