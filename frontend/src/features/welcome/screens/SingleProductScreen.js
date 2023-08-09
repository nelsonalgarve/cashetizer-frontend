import { Ionicons } from '@expo/vector-icons';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { PeriodsPicker } from '../components/PeriodsPicker';
function formatDateInFrench(dateString) {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export const SingleProductScreen = ({ route }) => {
	const navigation = useNavigation();
	const validateChoice = () => {
		navigation.navigate('ProductForm', {
			// item: initialItem,
			startDate: selectedStartDate,
			endDate: selectedEndDate,
			price: calculatedPrice,
			days: numberOfDays,
		});
	};

	// console.log(route.params.item.periodes);
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

	const perDayPrice = initialItem.prices.perDay;
	let perWeekPrice = initialItem.prices.perWeek;
	let perMonthPrice = initialItem.prices.perMonth;
	const item = route.params.item;

	// FAKE PRICES ________________________________________________________________________________________________
	if (!perWeekPrice) {
		perWeekPrice = perDayPrice * 7 * 0.95;
	}

	if (!perMonthPrice) {
		perMonthPrice = perDayPrice * 30 * 0.9;
	}
	item.prices = { perDay: perDayPrice, perWeek: perWeekPrice, perMonth: perMonthPrice };

	const sortedPrices = Object.entries(item.prices).sort((a, b) => a[1] - b[1]);
	console.log('-------------------------', item.prices);
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [formItem, setFormItem] = useState(initialItem);
	const [address, setAddress] = useState(null);
	// const [selectedDates, setSelectedDates] = useState(route.params.item.periodes || []);

	// DATE PICKER STATES ___________________________________________________________________
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	const [activePeriod, setActivePeriod] = useState(null);

	// CALCUL DES JOURS
	const [numberOfDays, setNumberOfDays] = useState(null);

	// POUR CALCUL DU PRIX

	const [calculatedPrice, setCalculatedPrice] = useState(0);

	// DATE PICKER FUNCTIONS ______________________________________________________________________
	const showDatePicker = (period) => {
		setActivePeriod(period);
		setDatePickerVisibility(true);
	};

	const handleStartDatePicked = (date) => {
		setSelectedStartDate(date);
		setDatePickerVisibility(false);
		// After selecting start date, prompt for end date.
		setEndDatePickerVisibility(true);
	};

	const handleEndDatePicked = (date) => {
		setSelectedEndDate(date);
		setEndDatePickerVisibility(false);
	};

	const onSelectDate = (date) => {
		if (!startDate) {
			setStartDate(date);
		} else {
			setEndDate(date);
			const start = new Date(startDate);
			const end = new Date(date);
			const diffTime = Math.abs(end - start);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			setNumberOfDays(diffDays);
			setDatePickerVisibility(false);
		}
	};
	// const handleDatePicked = (date) => {
	// 	if (!selectedStartDate) {
	// 		setSelectedStartDate(date);
	// 	} else if (!selectedEndDate) {
	// 		setSelectedEndDate(date);
	// 		setDatePickerVisibility(false);
	// 	}
	// };

	const PeriodButton = ({ period }) => {
		return (
			<TouchableOpacity onPress={() => showDatePicker(period)}>
				<Text>
					{formatDateInFrench(period.start)} - {formatDateInFrench(period.end)}
				</Text>
			</TouchableOpacity>
		);
	};

	// CALCUL DU NOMBRE DE JOURS ENTRE LES DATES SELECTIONNEES
	const onDateChange = (event, selectedDate) => {
		if (currentPeriod === 'period1Start' || currentPeriod === 'period2Start') {
			setSelectedStartDate(selectedDate);
		} else if (currentPeriod === 'period1End' || currentPeriod === 'period2End') {
			setSelectedEndDate(selectedDate);
		}
	};

	const getDifferenceInDays = (date1, date2) => {
		const diffInTime = date2.getTime() - date1.getTime();
		return Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
	};

	// const numberOfDays = selectedStartDate && selectedEndDate ? getDifferenceInDays(new Date(selectedStartDate), new Date(selectedEndDate)) : null;

	// NUMBER OF DAYS useEffect
	useEffect(() => {
		if (selectedStartDate && selectedEndDate) {
			const days = getDifferenceInDays(new Date(selectedStartDate), new Date(selectedEndDate));
			setNumberOfDays(days);
		} else {
			setNumberOfDays(null);
		}
	}, [selectedStartDate, selectedEndDate]);

	// CALCUL DU PRIX useEffect

	useEffect(() => {
		if (numberOfDays < 8 && numberOfDays > 0) {
			const dayRate = Number(numberOfDays * perDayPrice).toFixed(2);
			setCalculatedPrice(dayRate);
		} else if (numberOfDays > 7 && numberOfDays < 30) {
			const weekRate = perWeekPrice / 7;
			const weekPrice = Number(numberOfDays * weekRate).toFixed(2);
			setCalculatedPrice(weekPrice);
		} else {
			const monthRate = Number(perMonthPrice / 30).toFixed(2);
			setCalculatedPrice(numberOfDays * monthRate);
		}
	}, [numberOfDays]);

	// LOCATION useEffect ________________________________________________________________________________

	useEffect(() => {
		(async () => {
			const addr = await fetchAddress(formItem.localisation.latitude, formItem.localisation.longitude);
			setAddress(addr);
		})();
	}, []);

	const PeriodBadge = ({ period }) => {
		if (!period.start || !period.end) return null;

		return (
			<View style={styles.periodeBadge}>
				<Text style={styles.badgeText}>
					Du: {formatDateInFrench(period.start)} - au: {formatDateInFrench(period.end)}
				</Text>
			</View>
		);
	};

	const formatDate = (isoString) => {
		const date = new Date(isoString);
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	};

	const GOOGLE_API_KEY = 'AIzaSyCKVV2S52hUifM6pOSiTVzj2MoAI4jccqw';

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
			{/* PERIODES RENDER   ----------------------------------------------------------------------------------------------- */}
			{item.periodes.map((period, index) => (
				<PeriodButton key={index} period={period} />
			))}
			{/* DATE START PICKER -------------------------------- */}
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleStartDatePicked}
				onCancel={() => setDatePickerVisibility(false)}
				minimumDate={new Date(activePeriod?.start)}
				maximumDate={new Date(activePeriod?.end)}
			/>
			{/* DATE END PICKER -------------------------------- */}
			<DateTimePickerModal
				isVisible={isEndDatePickerVisible}
				mode="date"
				onConfirm={handleEndDatePicked}
				onCancel={() => setEndDatePickerVisibility(false)}
				minimumDate={selectedStartDate} // The end date shouldn't be before the selected start date
				maximumDate={new Date(activePeriod?.end)}
			/>
			{/*DATES RANGE DISPLAY ------------- */}
			{selectedStartDate && <Text>Début de location: {formatDateInFrench(selectedStartDate)}</Text>}
			{selectedEndDate && <Text>Fin de location {formatDateInFrench(selectedEndDate)}</Text>}
			{/* NOMBRE DE JOURS */}
			<View style={styles.container}>
				{/* {numberOfDays !== null ? <Text>Selected Range: {numberOfDays} days</Text> : <Text>No days selected</Text>} */}

				{numberOfDays !== null && <Text>Selected Range: {numberOfDays || 'No days selected'} days</Text>}
				<Text>Price: {calculatedPrice}€</Text>
				<Button title="Valider" onPress={validateChoice} disabled={calculatedPrice === 0} />
			</View>

			{/* MAP RENDER   ----------------------------------------------------------------------------------------------- */}
			{formItem.localisation.latitude && formItem.localisation.longitude && (
				<View style={styles.container}>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: formItem.localisation.latitude,
							longitude: formItem.localisation.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}>
						<Marker
							coordinate={{
								latitude: formItem.localisation.latitude,
								longitude: formItem.localisation.longitude,
							}}
							title={formItem.name}
							description={address}
						/>
					</MapView>
				</View>
			)}
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
		paddingHorizontal: 5,
		margin: 5,
		padding: 7,
		borderRadius: 5,
		alignSelf: 'flex-start',
	},
	badgeText: {
		color: 'white',
		fontWeight: '400',
		textAlign: 'center',
	},
	badgePrices: {
		fontSize: 12,
	},
	badgesInlineContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 10,
		flexWrap: 'wrap',
	},
	periodeBadge: {
		backgroundColor: '#155263',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 5,
		margin: 5,
		alignSelf: 'flex-start',
	},
	map: {
		width: '100%',
		height: 200,
	},
});
