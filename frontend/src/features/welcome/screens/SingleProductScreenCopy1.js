import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Button, Modal, Provider as PaperProvider, Portal } from 'react-native-paper';
import PhotoViewerModal from '../../helpers/PhotoViewerModal';

export const SingleProductScreen = ({ route }) => {
	console.log('photos---------------------', route.params.item.localisation);
	const item = {
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
		localisation: route.params.item.localisation,
	};

	// FROM ITEM CARD
	// const [item, setItem] = useState(route.params);
	// console.log(item.periodes);

	// // const periodes = item.periodes.map((item) => {
	// // 	{
	// // 		start: item.periode.start;
	// // 		end: item.periode.end;
	// // 	}
	// });
	// console.log('useState ---------------------------', item);
	const navigation = useNavigation();

	const SignInScreen = () => {
		navigation.navigate('SignIn');
	};
	const fakeItem = {
		ownerId: '12345',
		name: item.name,
		// description: item.item.description,

		photos: [item.photos],
		etat: item.etat,
		prices: item.prices,
		caution: item.caution,
		category: item.category.name,
		localisation: 'Paris, France',
		periodes: [item.periodes],
	};

	console.log(item.periodes);

	const periodes = item.periodes.map((periode, index) => {
		const startDate = new Date(periode.start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
		const endDate = new Date(periode.end).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

		return (
			<Text key={index} style={styles.periode}>
				{startDate} à {endDate}
			</Text>
		);
	});

	const calculateDays = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const timeDifference = end.getTime() - start.getTime();
		const days = timeDifference / (1000 * 3600 * 24);
		return Math.ceil(days);
	};
	const calculateTotalCost = (pricePerDay, startDate, endDate) => {
		const days = calculateDays(startDate, endDate);
		return pricePerDay * days;
	};
	const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);

	const handlePeriodChange = (index) => {
		setSelectedPeriodIndex(index);
	};
	const numberOfStars = '3';
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const selectedPeriod = fakeItem.periodes[selectedPeriodIndex];
	const totalCost = calculateTotalCost(item.prices.perDay, selectedPeriod.start, selectedPeriod.end);
	const [photoViewerVisible, setPhotoViewerVisible] = useState(false);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

	const openPhotoViewer = (index) => {
		setSelectedPhotoIndex(index);
		setPhotoViewerVisible(true);
	};

	const closePhotoViewer = () => {
		setPhotoViewerVisible(false);
	};

	return (
		<PaperProvider>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<View style={styles.container}>
					<Modal visible={photoViewerVisible} transparent={true}>
						<PhotoViewerModal
							visible={photoViewerVisible}
							photos={item.photos}
							currentIndex={selectedPhotoIndex}
							onClose={closePhotoViewer}
							onNext={() => setSelectedPhotoIndex(selectedPhotoIndex + 1)}
							onPrev={() => setSelectedPhotoIndex(selectedPhotoIndex - 1)}
							showDeleteIcon={false}
						/>
					</Modal>
					<View style={styles.greyRectangle}>
						<Text style={styles.name}>
							{fakeItem.name} à {totalCost}€
						</Text>
						<View style={styles.periodesContainer}>
							<Text style={styles.periodes}>Périodes de location:</Text>
							{periodes}
						</View>
						<Button style={styles.buttonOutlined} mode="outlined" onPress={SignInScreen}>
							<Text style={styles.buttonText}>Valider la location</Text>
						</Button>
					</View>
					<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
						<View style={styles.contentContainer}>
							<View style={styles.imageContainer}>
								<TouchableOpacity onPress={() => openPhotoViewer(0)}>
									<Image
										source={{
											uri: item.photos[0],
											width: 200,
											height: 200,
										}}
										style={styles.image}
									/>
								</TouchableOpacity>

								{/* <Image source={{ uri: fakeItem.photos[0] }} style={styles.image} /> */}

								<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -130 }}>
									<View>
										<Text style={{ color: 'black', fontWeight: 600 }}>36 évaluations</Text>
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											{Array.from({ length: numberOfStars }).map((_, index) => (
												<Ionicons key={index} name={'star'} size={25} color={'gold'} />
											))}
										</View>
									</View>
									<View style={{ marginTop: -10 }}>
										<Text>À {Number(item.distance).toFixed(2)} km</Text>
										<Text style={{ color: 'green', fontWeight: 500 }}>Disponible</Text>
									</View>
								</View>
								<Text style={styles.description}>{fakeItem.description}</Text>

								<View style={styles.infoContainer}>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Prix:</Text>
										<Text style={styles.infoText}>
											{item.prices.perDay}€ par jour{' '}
											<Ionicons name="information-circle-outline" size={20} color="blue" onPress={toggleModal} />
										</Text>
									</View>
									<Portal>
										<Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalContainer}>
											<Text style={styles.modalTitle}>Plus je loue, moins je paye 😀</Text>
											<Text style={styles.modalText}>Prix par jour: {item.prices.perDay}€</Text>
											<Text style={styles.modalText}>Prix par semaine: {fakeItem.prices.week}€</Text>
											<Text style={styles.modalText}>Prix par mois: {fakeItem.prices.month}€</Text>
											<Button
												style={{ marginTop: 20, alignItems: 'center', backgroundColor: '#155263', color: 'white' }}
												mode="outlined"
												onPress={toggleModal}>
												<Text style={{ fontWeight: 600, color: 'white' }}> Fermer</Text>
											</Button>
										</Modal>
									</Portal>

									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>État:</Text>
										<Text style={styles.infoText}>{fakeItem.etat}</Text>
									</View>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Caution:</Text>
										<Text style={styles.infoText}>{fakeItem.caution}€</Text>
									</View>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Mode de remise:</Text>
										<Text style={styles.infoText}>En personne</Text>
									</View>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Vendeur:</Text>
										<TouchableOpacity onPress={() => console.log('Nelson clicked')}>
											<Text style={styles.linkText}>{item.ownerUSername} </Text>
										</TouchableOpacity>
									</View>

									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Localisation:</Text>
										<TouchableOpacity onPress={() => console.log('Nelson lives in Paris')}>
											<Text style={styles.infoText}>
												{' '}
												<Ionicons name={'location'} color={'#FFCE52'} size={20} /> Paris
											</Text>
										</TouchableOpacity>
									</View>
								</View>
								<View style={{ flex: 1 }}>
									{/* <MapView
										style={{ flex: 1, width: '100%', height: 200 }}
										initialRegion={{
											latitude: 48.8566,
											longitude: 2.3522,
											latitudeDelta: 0.0922,
											longitudeDelta: 0.0421,
										}}>
										<MapView.Marker
											coordinate={{ latitude: 48.8566, longitude: 2.3522 }}
											title={item.name}
											description={item.localisation}
										/>
									</MapView> */}
								</View>
							</View>
						</View>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	modalTitle: {
		color: '#155263',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	modalText: {
		fontSize: 14,
		fontWeight: '600',
	},
	modalContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	greyRectangle: {
		backgroundColor: '#E2E2E2',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		marginTop: 0,
		height: '20%',
		alignContent: 'flex-start',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1,
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 16,
		alignSelf: 'center',
		color: '#155263',
	},

	imageContainer: {
		width: '85%',
		marginTop: 30,
		alignSelf: 'center',
	},
	image: {
		width: '100%',
		resizeMode: 'contain',
	},
	textContainer: {
		alignItems: 'center',
		marginBottom: 10,
	},
	title: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 10,
		color: '#155263',
	},
	description: {
		textAlign: 'justify',
	},

	greenRectangle: {
		weight: 40,
		backgroundColor: '#155263',
		paddingVertical: 2,
		paddingHorizontal: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	rectangleText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
	},
	emoji: {
		fontSize: 60,
		marginTop: 25,
		marginBottom: 10,
	},
	linkText: {
		color: 'blue',
		textDecorationLine: 'underline',
		fontSize: 16,
	},
	infoContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5,
		marginTop: 10,
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
	infoText: {
		fontSize: 16,
		color: '#555',
		marginLeft: 10,
	},
	infoClickableText: {
		color: 'blue',
		textDecorationLine: 'underline',
	},
	text: {
		fontSize: 16,
		marginTop: 10,
		textAlign: 'center',
		color: '#155263',
		fontWeight: '400',
	},
	buttonsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 60,
	},
	buttonsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 60,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 22,
	},
	buttonOutlined: {
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '80%',
		alignSelf: 'center',
		margin: 10,
	},
	buttonGreenOutlined: {
		margin: 10,
		backgroundColor: '#155263',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},
	buttonNoColorOutlined: {
		margin: 10,
		backgroundColor: 'transparent',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},
	periodes: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
		marginTop: 5,
	},
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
	scrollContainer: {
		flex: 1,
		marginTop: 10,
	},
});
