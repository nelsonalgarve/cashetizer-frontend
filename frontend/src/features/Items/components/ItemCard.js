import { Ionicons } from '@expo/vector-icons';
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
			<View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
				<Chip
					icon={() => <Ionicons name="calendar" size={16} color="white" />}
					onPress={() => console.log('Pressed')}
					compact={true}
					textStyle={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}
					style={styles.chipStyle}>
					Période {index + 1}: {moment(periode.start).format('L')} - {moment(periode.end).format('L')}
				</Chip>
			</View>
		);
	});
	const date = new Date(item.periodes.start);
	console.log('FROM ITEM CARD', item.periodes[0].start);
	if (item) {
		// Calcul des prix pour la semaine et le mois
		const pricePerDay = item.prices.perDay;
		const pricePerWeek = pricePerDay * 7 * 0.95;
		const pricePerMonth = pricePerDay * 30 * 0.9;
		const priceStartFrom = pricePerMonth / 30;

		return (
			<Card style={styles.card} mode="contained">
				<Card.Cover source={{ uri: item.description.photos[0] }} style={styles.cardImage} />
				<Text style={styles.distanceOverlay}>Distance: {distanceKm.toFixed(2)} km</Text>
				<Text style={styles.priceOverlay}>À partir de {priceStartFrom} € par jour</Text>
				<Card.Content style={styles.cardContent}>
					<Text> {item.isAvailable}</Text>
					<Text style={styles.itemName}>{limitTextLength(item.name, 38)}</Text>
					<Text style={styles.itemDetails}>{limitTextLength(item.description.details, 120)}</Text>

					{Dispos}
					<View style={styles.buttonsInRow}>
						<Button style={styles.buttonsOutlineGreen} onPress={toSingleItemPage}>
							<Ionicons style={styles.icon} name="eye" size={23} mode="contained" color="white" />
						</Button>
						<Button style={styles.buttonsOutline} icon="calendar-check" mode="contained" onPress={toProductForm}>
							Réserver
						</Button>
					</View>
				</Card.Content>
			</Card>
		);
	} else {
		return null;
	}
};

const styles = StyleSheet.create({
	card: {
		marginBottom: 2,
		backgroundColor: '#E2E2E2',
		borderRadius: 15, // rounded corners
		marginVertical: 5, // slight vertical margin for space between
		elevation: 3, // shadow for Android
		shadowColor: '#000', // shadow color for iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	itemName: {
		fontWeight: '600',
		fontSize: 16,
	},
	priceOverlay: {
		position: 'absolute',
		left: 10,
		backgroundColor: 'rgba(21, 82, 99, 0.7)',
		color: '#FFCE52',
		padding: 5,
		borderRadius: 30,
		fontWeight: '900',
		opacity: 0.9,
	},
	distanceOverlay: {
		position: 'absolute',
		right: 10,
		top: 168,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		color: 'white',
		padding: 5,
		borderRadius: 5,
		fontWeight: 'bold',
	},
	buttonsOutline: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFCE52',
		borderWidth: 1,
		borderColor: '#E6E6E6',
		width: '40%',
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
	buttonsOutlineGreen: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#155263',
		borderWidth: 1,
		borderColor: '#FFFFFF',
		width: '40%',
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

	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
	},
	icon: {
		marginTop: 12,
		alignSelf: 'center',
	},

	buttonsInRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		marginTop: 10,
	},
	chipStyle: {
		backgroundColor: '#FFCE52',
		shadowColor: 'rgba(0, 0, 0, 0.2)', // Shadow color
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 1,
		shadowRadius: 3,
		elevation: 4, // Android shadow elevation
	},
});
