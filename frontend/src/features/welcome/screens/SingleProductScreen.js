import { Ionicons } from '@expo/vector-icons';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IconButton, Modal, Portal } from 'react-native-paper';
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

function formatDateInFrench(dateString) {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export const SingleProductScreen = ({ route }) => {
	const navigation = useNavigation();

	function convert(date) {
		if (date) {
			return date.toISOString();
		} else {
			return '';
		}
	}

	const validateChoice = () => {
		navigation.navigate('ProductForm', {
			item: initialItem,
			startDate: convert(selectedStartDate),
			endDate: convert(selectedEndDate),
			price: calculatedPrice,
			days: numberOfDays,
			ownerUsername: ownerUsername,
			photo: photo,
			address: address,
		});
	};

	// const sortedPrices = Object.entries(item.prices).sort((a, b) => a[1] - b[1]);
	const initialItem = {
		name: route.params.item.name,
		ownerId: route.params.item.ownerId._id,
		ownerUSername: route.params.item.ownerId.username,
		prices: route.params.item.prices,
		caution: route.params.item.caution,
		periodes: route.params.item.periodes,
		photos: route.params.item.description.photos,
		description: route.params.item.description.details,
		etat: route.params.item.description.etat,
		category: route.params.item.category.name,
		distance: route.params.distanceKm,
		localisation: {
			latitude: parseFloat(route.params.item.localisation.latitude),
			longitude: parseFloat(route.params.item.localisation.longitude),
		},
	};

	const [ownerUsername, setOwnerUsername] = useState(initialItem.ownerUSername);
	const [photo, setPhoto] = useState(initialItem.photos[0]);
	const [item, setItem] = useState(route.params.item);
	const perDayPrice = initialItem.prices.perDay;
	let perWeekPrice = initialItem.prices.perWeek;
	let perMonthPrice = initialItem.prices.perMonth;

	// FAKE PRICES ____________________________________________
	if (!perWeekPrice) {
		perWeekPrice = perDayPrice * 7 * 0.95;
	}

	if (!perMonthPrice) {
		perMonthPrice = perDayPrice * 30 * 0.9;
	}
	item.prices = { perDay: perDayPrice, perWeek: perWeekPrice, perMonth: perMonthPrice };

	// const item = route.params.item;
	const sortedPrices = Object.entries(item.prices).sort((a, b) => a[1] - b[1]);
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [formItem, setFormItem] = useState(initialItem);
	const [address, setAddress] = useState(null);
	const [isModalVisible2, setModalVisible2] = useState(false);
	const toggleModal2 = () => {
		setModalVisible2(!isModalVisible2);
	};
	const [isModalVisible3, setModalVisible3] = useState(false);
	const toggleModal3 = () => {
		setModalVisible3(!isModalVisible3);
	};
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
		setTimeout(() => {
			setEndDatePickerVisibility(true);
		}, 500);
	};

	const numberOfStars = '3';

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

	const PeriodButton = ({ period }) => {
		return (
			<TouchableOpacity style={styles.periodButton} icon="calendar-check" onPress={() => showDatePicker(period)}>
				<Text>
					<Ionicons style={styles.icon} name="calendar" size={20} mode="contained" color="#155263" /> {formatDateInFrench(period.start)} -{' '}
					{formatDateInFrench(period.end)}
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

	const pricePerDay = perDayPrice;
	const pricePerWeek = pricePerDay * 7 * 0.95;
	const pricePerMonth = pricePerDay * 30 * 0.9;
	const pricePerDayWeek = pricePerDay * 0.95;
	const pricePerDayMonth = pricePerDay * 0.9;

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

	function limitTextLength(text, maxLength) {
		if (text.length <= maxLength) {
			return text;
		}

		return text.substring(0, maxLength) + '...'; // adds '...' at the end
	}

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
			<Portal>
				<Modal visible={isModalVisible2} onDismiss={toggleModal2} contentContainerStyle={styles.modalContainer2}>
					<Text style={styles.modalTitle2}>Plus je loue, moins je paye 😀</Text>
					<Text style={styles.modalText2}>
						Prix par jour: {'\n'} {Number(pricePerDay).toFixed(2)}€/J {'\n'}
					</Text>
					<Text style={styles.modalText2}>
						Prix par semaine: {'\n'} {Number(pricePerWeek).toFixed(2)}€ soit {Number(pricePerDayWeek).toFixed(2)}€/J {'\n'}
					</Text>
					<Text style={styles.modalText2}>
						Prix par mois: {'\n'} {Number(pricePerMonth).toFixed(2)}€ soit {Number(pricePerDayMonth).toFixed(2)}€/J
					</Text>
					<TouchableOpacity
						style={{ marginTop: 20, alignItems: 'center', backgroundColor: '#155263', color: 'white', borderRadius: 10, width: '20%' }}
						mode="outlined"
						onPress={toggleModal2}>
						<Text style={{ fontWeight: 600, color: 'white' }}> Fermer</Text>
					</TouchableOpacity>
				</Modal>
			</Portal>

			<Portal>
				<Modal visible={isModalVisible3} onDismiss={toggleModal3} contentContainerStyle={styles.modalContainer3}>
					<Text style={styles.modalTitle3}>Protégez comme la prunelle de vos yeux </Text>
					<Text style={styles.modalText3}>
						Une usure normale est acceptable mais un dommage du bien d'autrui demande compensation. C'est pourquoi cette caution vous sera
						restitué lors de l'inspection du retour de matériel, entre vous et le propriétaire.
					</Text>

					<TouchableOpacity
						style={{ marginTop: 20, alignItems: 'center', backgroundColor: '#155263', color: 'white', borderRadius: 10, width: '20%' }}
						mode="outlined"
						onPress={toggleModal3}>
						<Text style={{ fontWeight: 600, color: 'white' }}> Fermer</Text>
					</TouchableOpacity>
				</Modal>
			</Portal>

			<View style={styles.greyRectangle}>
				<TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Search')}>
					<Ionicons name="arrow-back" size={25} color="#FFCE52" style={styles.backIcon} />
					<Text style={styles.resultsText}>Nouvelle recherche</Text>
				</TouchableOpacity>
				<Text style={styles.name}>
					{limitTextLength(item.name, 25)} à {calculatedPrice} €
				</Text>
				<View style={styles.periodesContainer}>
					<Text style={styles.periodes}>Périodes disponibles:</Text>
					{item.periodes.map((period, index) => (
						<PeriodButton key={index} period={period} />
					))}
				</View>
				{/*DATES RANGE DISPLAY ------------- */}

				<TouchableOpacity style={styles.buttonOutlined} mode="outlined" onPress={validateChoice} disabled={calculatedPrice === 0}>
					<Text style={styles.buttonText}>Valider la location</Text>
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.buttonCategorie}>
				<View style={styles.emptyRectangle}></View>

				<View>
					<TouchableOpacity onPress={toggleModal} style={{ backgroundColor: 'white', borderRadius: 15 }}>
						<Image source={{ uri: item.description.photos[0] }} style={styles.image} resizeMode="contain" />
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
					<View>
						<Text style={{ color: 'black', fontWeight: 600 }}>36 évaluations</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{Array.from({ length: numberOfStars }).map((_, index) => (
								<Ionicons key={index} name={'star'} size={20} color={'gold'} />
							))}
						</View>
					</View>
					<View style={{ marginTop: -10 }}>
						<Text>
							{' '}
							<Ionicons name={'location'} color={'#FFCE52'} size={20} /> À {Number(initialItem.distance).toFixed(2)} km
						</Text>
						<Text style={{ color: 'green', fontWeight: 500, textAlign: 'right' }}> Disponible</Text>
					</View>
				</View>
				<Text style={styles.itemName}>{item.name}</Text>
				<Text style={styles.itemDetails}>{limitTextLength(item.description.details)}</Text>
				<Modal animationType="slide" transparent={false} visible={isModalVisible} onRequestClose={toggleModal}>
					<View style={styles.modalContainer}>
						<ScrollView contentContainerStyle={styles.scrollContainer}>
							{item.description.photos.map((photo, index) => (
								<Image key={index} source={{ uri: item.description.photos[0] }} style={styles.modalImage} resizeMode="contain" />
							))}
						</ScrollView>
						<TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
							<Text>Close</Text>
						</TouchableOpacity>
					</View>
				</Modal>

				<View style={styles.infoContainer}>
					{calculatedPrice !== 0 && (
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Prix de la location: </Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={styles.infoText}>
									{calculatedPrice !== null ? `${calculatedPrice}€` : '0€'}
									{calculatedPrice !== null && (
										<Ionicons name="information-circle-outline" size={20} color="blue" onPress={toggleModal2} />
									)}
								</Text>
							</View>
						</View>
					)}
					{calculatedPrice !== 0 && (
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Durée de location: </Text>
							<Text style={styles.infoText}>{numberOfDays !== null && `${numberOfDays} jour${numberOfDays > 1 ? 's' : ''}`}</Text>
						</View>
					)}
					{calculatedPrice !== 0 && (
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Début de location:</Text>
							{selectedStartDate && (
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text style={styles.infoText}>{formatDateInFrench(selectedStartDate)}</Text>
								</View>
							)}
						</View>
					)}

					{calculatedPrice !== 0 && (
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Fin de location:</Text>
							{selectedEndDate && (
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text style={styles.infoText}>{formatDateInFrench(selectedEndDate)}</Text>
								</View>
							)}
						</View>
					)}
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>État: </Text>
						<Text style={styles.infoText}>{item.description.etat}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Caution:</Text>
						<Text style={styles.infoText}>
							{item.caution}€ <Ionicons name="information-circle-outline" size={20} color="blue" onPress={toggleModal3} />
						</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Mode de remise:</Text>
						<Text style={styles.infoText}>En personne</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Propriétaire:</Text>
						<TouchableOpacity onPress={() => console.log('Nelson clicked')}>
							<Text style={styles.linkText}>{item.ownerId.username} </Text>
						</TouchableOpacity>
					</View>
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

				{/* DATE START PICKER -------------------------------- */}
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode="date"
					display="inline"
					confirmTextIOS="Date de début de location"
					onConfirm={handleStartDatePicked}
					onCancel={() => setDatePickerVisibility(false)}
					minimumDate={new Date(activePeriod?.start)}
					maximumDate={new Date(activePeriod?.end)}
				/>
				{/* DATE END PICKER -------------------------------- */}
				<DateTimePickerModal
					isVisible={isEndDatePickerVisible}
					mode="date"
					display="inline"
					confirmTextIOS="Date de fin de location"
					onConfirm={handleEndDatePicked}
					onCancel={() => setEndDatePickerVisibility(false)}
					minimumDate={selectedStartDate} // The end date shouldn't be before the selected start date
					maximumDate={new Date(activePeriod?.end)}
				/>
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#F1F1F1',
	},
	name: {
		marginTop: 0,
		color: '#155263',
		fontWeight: 'bold',
		fontSize: 18,
		textAlign: 'center',
	},
	periodes: {
		fontWeight: 'bold',
		fontSize: 14,
	},
	periodesContainer: {
		marginTop: 7,
		alignItems: 'center',
	},
	periodButton: {
		padding: 3,
		marginTop: -5,
		// borderWidth: 2,
		borderColor: '#155263',
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
	buttonOutlined: {
		marginTop: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFCE52',
		borderWidth: 1,
		borderColor: '#E6E6E6',
		width: '80%',
		paddingHorizontal: 1,
		borderWidth: 1,
		borderColor: '#E6E6E6',
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
		fontSize: 22,
	},
	itemName: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#155263',
		textAlign: 'center',
		marginBottom: 10,
		marginTop: 5,
	},
	itemDetails: {
		marginBottom: 5,
		textAlign: 'justify',
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	infoLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
		textAlign: 'right',
	},
	infoContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5,
		marginTop: 10,
	},
	infoText: {
		fontSize: 16,
		color: '#555',
		marginLeft: 10,
	},
	greyRectangle: {
		height: 170,
		backgroundColor: '#ECECEC',
		paddingVertical: 2,
		paddingHorizontal: 20,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#E6E6E6',
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
	emptyRectangle: {
		height: 300,
		backgroundColor: 'transparent',
		paddingVertical: 2,
		paddingHorizontal: 20,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,

		alignItems: 'center',
		justifyContent: 'center',
	},

	ownerUsername: {
		textAlign: 'center',
	},
	image: {
		width: '100%',
		height: 240,
		marginTop: 150,
		borderRadius: 15,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	modalContainer2: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'right',
	},
	modalTitle2: {
		color: '#155263',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	modalText2: {
		fontSize: 14,
		fontWeight: '600',
		textAlign: 'center',
	},
	scrollContainer: {
		alignItems: 'center',
	},
	modalImage: {
		width: '20%',
		height: 200,
		marginBottom: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalTitle3: {
		color: '#155263',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	modalText3: {
		fontSize: 14,
		fontWeight: '600',
	},
	modalContainer3: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
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
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: -170,
	},
	backIcon: {
		marginRight: 5,
	},
	resultsText: {
		color: '#FFCE52',
		fontSize: 14,
		fontWeight: '800',
	},
});
