import { Ionicons } from '@expo/vector-icons';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { PeriodsPicker } from '../components/PeriodsPicker';

export const SingleProductScreen = ({ route }) => {
	console.log(route.params.item.localisation);
	const initialItem = {
		name: route.params.item.name,
		ownerId: route.params.item.ownerId._id,
		ownerUSername: route.params.item.ownerId.username,
		prices: route.params.item.prices,
		caution: route.params.item.caution,
		periodes: route.params.item.periodes,
		photos: route.params.item.description.photos,
		etat: route.params.item.description.etat,
		category: route.params.item.category.name,
		distance: route.params.distanceKm,
		localisation: {
			latitude: parseFloat(route.params.item.localisation.latitude),
			longitude: parseFloat(route.params.item.localisation.longitude),
		},
	};
	const item = route.params.item;
	const sortedPrices = Object.entries(item.prices).sort((a, b) => a[1] - b[1]);
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [formItem, setFormItem] = useState(initialItem);
	const [address, setAddress] = useState(null);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const [selectedDates, setSelectedDates] = useState({ period1: {}, period2: {} });

	const [currentPeriod, setCurrentPeriod] = useState(null);

	const [selectedPeriod, setSelectedPeriod] = useState(null);

	useEffect(() => {
		(async () => {
			const addr = await fetchAddress(formItem.localisation.latitude, formItem.localisation.longitude);
			setAddress(addr);
		})();
	}, []);

	const handleDateSelect = (selectedPeriod, selectedDate) => {
		console.log('Selected Date:', selectedDate, 'in the period:', selectedPeriod);
		// Handle the selected date here, maybe update the state or do other logic
	};
	const handlePeriod1Change = (startDate, endDate) => {
		console.log('Period 1 Dates:', startDate, endDate);
	};

	const handlePeriod2Change = (startDate, endDate) => {
		console.log('Period 2 Dates:', startDate, endDate);
	};

	const handlePeriodPress = (period) => {
		setSelectedPeriod(period);
		showDatePicker('start');
	};
	const GOOGLE_API_KEY = 'AIzaSyCKVV2S52hUifM6pOSiTVzj2MoAI4jccqw'; // Replace this with your Google API key

	const fetchAddress = async (latitude, longitude) => {
		try {
			const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`);
			const data = await response.json();
			if (data.results && data.results.length > 0) {
				return data.results[0].formatted_address;
			}
			return null;
		} catch (error) {
			console.error('Error fetching address:', error);
			return null;
		}
	};

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const getPriceLabel = (key) => {
		switch (key) {
			case 'perDay':
				return 'Prix/Jour';
			case 'perWeek':
				return 'Prix/Semaine';
			case 'perMonth':
				return 'Prix/Mois';
			default:
				return '';
		}
	};

	const Badge = ({ text, color = '#155263' }) => (
		<View style={{ ...styles.badge, backgroundColor: color }}>
			<Text style={styles.badgeText}>{text}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleModal}>
				<Image source={{ uri: item.description.photos[0] }} style={styles.image} resizeMode="contain" />
			</TouchableOpacity>
			<Text style={styles.itemName}>{item.name}</Text>
			<Modal animationType="slide" transparent={false} visible={isModalVisible} onRequestClose={toggleModal}>
				<View style={styles.modalContainer}>
					<ScrollView contentContainerStyle={styles.scrollContainer}>
						{item.description.photos.map((photo, index) => (
							<Image key={index} source={{ uri: photo }} style={styles.modalImage} resizeMode="contain" />
						))}
					</ScrollView>
					<TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
						<Text>Close</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<View style={styles.ownerUsername}>
				<Text>
					Propiétaire: {item.ownerId.username} - {address} à {Number(initialItem.distance).toFixed(2)}km
				</Text>
			</View>
			<View style={styles.badgesInlineContainer}>
				<Badge text={item.description.etat} color="#FFCE52" />
				<Badge text={`Caution: ${item.caution}€`} color="#D0421B" />
			</View>
			<View style={styles.badgesInlineContainer}>
				{sortedPrices.map(([key, value]) => (
					<Badge style={styles.badgePrices} key={key} text={`${getPriceLabel(key)}: ${value}€`} />
				))}
			</View>
			{formItem.periodes.map((period, index) => (
				<TouchableOpacity key={period._id} onPress={() => showDatePicker(period)} style={{ ...styles.badge, backgroundColor: '#EAEAEA' }}>
					<Text>{`Du: ${new Date(period.start).toLocaleDateString('fr-FR')} Au: ${new Date(period.end).toLocaleDateString('fr-FR')}`}</Text>
				</TouchableOpacity>
			))}

			{formItem.localisation.latitude && formItem.localisation.longitude && (
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: formItem.localisation.latitude,
						longitude: formItem.localisation.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					<Marker
						coordinate={{
							latitude: formItem.localisation.latitude,
							longitude: formItem.localisation.longitude,
						}}
						title={formItem.name}
						description={address}
					/>
				</MapView>
			)}
			<PeriodsPicker
				periodes={formItem.periodes}
				onDatesChange={(dates) => {
					console.log(dates); // Or handle the dates as needed in your logic
				}}
			/>
			<PeriodsPicker periods={formItem.periodes} onDateSelect={handleDateSelect} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	itemName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		textAlign: 'center',
		marginVertical: 10,
	},
	ownerUsername: {
		textAlign: 'center',
	},
	image: {
		width: '100%',
		height: 200,
		marginBottom: 15,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollContainer: {
		alignItems: 'center',
	},
	modalImage: {
		width: '90%',
		height: 200,
		marginBottom: 15,
	},
	closeButton: {
		position: 'absolute',
		top: 40,
		right: 20,
		padding: 10,
		backgroundColor: '#ddd',
		borderRadius: 5,
	},
	badgesInlineContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 10,
		flexWrap: 'wrap',
	},
	badge: {
		backgroundColor: '#155263',
		paddingHorizontal: 10,
		margin: 5,
		padding: 7,
		borderRadius: 5,
		alignSelf: 'flex-start',
	},
	badgeText: {
		color: 'white',
		fontWeight: '500',
		textAlign: 'center',
		fontSize: 12,
	},
	badgePrices: {
		fontSize: 12,
	},
	periodeBadge: {
		backgroundColor: '#ccc',
		padding: 5,
		margin: 5,
		borderRadius: 5,
	},
	map: {
		width: '100%',
		height: 200,
	},
});
