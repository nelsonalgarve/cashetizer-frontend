import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Modal, Provider as PaperProvider, Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';
const moment = require('moment');
moment.locale('fr');

export const ProductFormScreen = ({ route, item }) => {
	// const buyer = useSelector(() => state.user.value);
	console.log(route.params.item.name);
	const navigation = useNavigation();
	const SignInScreen = () => {
		navigation.navigate('SignIn');
	};

	const user = useSelector((state) => state.user.value);
	console.log('__________________', user);

	const order = {
		ownerId: route.params.ownerId,
		ownerUsername: route.params.ownerUsername,
		itemLocalisation: route.params.item.localisation,
		distance: route.params.item.distance,
		itemName: route.params.item.name,
		etat: route.params.item.etat,
		address: route.params.address,
		caution: route.params.item.caution,
		startDate: moment(route.params.startDate).format('DD/MM/YYYY'),
		endDate: moment(route.params.endDate).format('DD/MM/YYYY'),
		totalPrice: route.params.price,
		totalRentDays: route.params.days,
	};

	const fakeItem = {
		ownerId: order.ownerId,
		name: order.itemName,
		description: 'item.description',
		photos: ['/Users/meon/Downloads/Cashetizer/cashetizer-frontend/frontend/assets/fakeImage.jpg'],
		etat: order.etat,
		prices: {
			day: 15,
			week: 90,
			month: 300,
		},
		caution: 50,
		category: 'Electronics',
		localisation: order.address,
		periodes: [{ start: order.startDate, end: order.endDate }],
	};

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
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const toggleTermsAcceptance = () => {
		setAcceptedTerms(!acceptedTerms);
	};
	const handlePeriodChange = (index) => {
		setSelectedPeriodIndex(index);
	};
	const numberOfStars = '3';
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const selectedPeriod = fakeItem.periodes[selectedPeriodIndex];
	const totalCost = calculateTotalCost(fakeItem.prices.day, selectedPeriod.start, selectedPeriod.end);
	const [photoViewerVisible, setPhotoViewerVisible] = useState(false);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

	const openPhotoViewer = (index) => {
		setSelectedPhotoIndex(index);
		setPhotoViewerVisible(true);
	};

	const closePhotoViewer = () => {
		setPhotoViewerVisible(false);
	};
	const openPrivacyPolicyPage = () => {
		console.log('openPrivacyPolicyPage');
	};
	const openTermsPage = () => {
		console.log('openTermsage');
	};

	return (
		<PaperProvider>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<View style={styles.container}>
					{/*  <Modal visible={photoViewerVisible} transparent={true}>
        <PhotoViewerModal
          visible={photoViewerVisible}
          photos={fakeItem.photos}
          currentIndex={selectedPhotoIndex}
          onClose={closePhotoViewer}
          onNext={() => setSelectedPhotoIndex(selectedPhotoIndex + 1)}
          onPrev={() => setSelectedPhotoIndex(selectedPhotoIndex - 1)}
          showDeleteIcon={false} 
        />
      </Modal> */}
					<View style={styles.greyRectangle}>
						<Text style={styles.name}>
							{order.itemName} à {order.totalPrice}€
						</Text>
						<View style={styles.periodesContainer}>
							<Text style={styles.periodes}>
								Location du {order.startDate} au {order.endDate}
							</Text>
						</View>
						{/*  <Button style={styles.buttonOutlined} mode="outlined" onPress={SignInScreen}>
                <Text style={styles.buttonText}>Valider la location</Text>
              </Button> */}
					</View>
					<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
						<View style={styles.contentContainer}>
							<View style={styles.imageContainer}>
								{/* <TouchableOpacity onPress={() => openPhotoViewer(0)}>
                <Image source={require('../../../../assets/fakeImage.jpg')} style={styles.image} />
      </TouchableOpacity> */}

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
								</View>

								<View style={styles.infoContainer}>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Locataire:</Text>
										<Text style={styles.infoText}> {user.username}</Text>
									</View>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Durée de location:</Text>
										<Text style={styles.infoText}>{order.totalRentDays} jours</Text>
									</View>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Prix par jour :</Text>
										<Text style={styles.infoText}>{order.totalPrice / order.totalRentDays}€ </Text>
									</View>

									<Portal>
										<Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalContainer}>
											<Text style={styles.modalTitle}>Protégez comme la prunelle de vos yeux </Text>
											<Text style={styles.modalText}>
												Une usure normale est acceptable mais un dommage du bien d'autrui demande compensation. C'est pourquoi
												cette caution vous sera restituée lors de l'inspection du retour de matériel, entre vous et le
												propriétaire.
											</Text>

											<Button
												style={{ marginTop: 20, alignItems: 'center', backgroundColor: '#155263', color: 'white' }}
												mode="outlined"
												onPress={toggleModal}
											>
												<Text style={{ fontWeight: 600, color: 'white' }}> Fermer</Text>
											</Button>
										</Modal>
									</Portal>

									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Prix total:</Text>
										<Text style={styles.infoText}>{order.totalPrice}€</Text>
									</View>

									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Caution:</Text>
										<Text style={styles.infoText}>
											{order.caution}€
											<Ionicons name="information-circle-outline" size={20} color="blue" onPress={toggleModal} />
										</Text>
									</View>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Mode de remise:</Text>
										<Text style={styles.infoText}>En personne</Text>
									</View>
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Loueur:</Text>
										<Text style={styles.infoText}>{order.ownerUsername}</Text>
									</View>
									<View style={styles.infoRowAddress}>
										<Text style={styles.infoLabelAddress}>Localisation:</Text>
										<TouchableOpacity onPress={() => console.log('Nelson lives in Paris')}>
											<Text style={styles.infoText}>
												<Ionicons name={'location'} color={'#FFCE52'} size={20} /> {order.address}
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>

						<View style={styles.checkboxContainer}>
							<CheckBox value={acceptedTerms} onValueChange={toggleTermsAcceptance} />
							<Text style={styles.checkboxLabel}>
								{" J'accepte les "}
								<TouchableOpacity onPress={openTermsPage}>
									<Text style={styles.clickableText}>conditions de location</Text>
								</TouchableOpacity>
								{' et le '}
								<TouchableOpacity onPress={openPrivacyPolicyPage}>
									<Text style={styles.clickableText}>réglement d'utilisation</Text>
								</TouchableOpacity>
								{'de Cashetizer industry.'}
							</Text>
						</View>
						<View style={styles.buttonContainer}>
							<Button style={[styles.buttonOutlined, styles.paypalButton]} mode="outlined" onPress={SignInScreen}>
								<Image source={require('../../../../assets/paypalLogo.png')} style={styles.paypalLogo} />
							</Button>
							<Button style={[styles.buttonOutlined, styles.cbButton]} mode="outlined" onPress={SignInScreen}>
								<Image source={require('../../../../assets/LogoCB.png')} style={styles.paypalLogo} />
							</Button>
						</View>
						<Button style={styles.buttonOutlined} mode="outlined" onPress={SignInScreen}>
							<Text style={styles.buttonText}>Confirmer la location</Text>
						</Button>
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
	clickableText: {
		color: 'blue',
		textDecorationLine: 'underline',
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20,
		marginBottom: 10,
	},
	checkboxLabel: {
		margin: 5,
		marginRight: 10,
		fontSize: 14,
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
		marginTop: 0,
		alignSelf: 'center',
	},
	image: {
		width: '20%',
		resizeMode: 'contain',
	},
	infoRowAddress: {
		flexWrap: 'wrap',
	},
	infoLabelAddress: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
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
		marginTop: 240,
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
		marginTop: 40,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
	},
	buttonOutlined: {
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '80%',
		alignSelf: 'center',
		margin: 10,
	},
	paypalButton: {
		backgroundColor: 'white',
		borderColor: '#155263',
		width: '40%',
	},
	cbButton: {
		backgroundColor: '#155263',
		borderColor: '#155263',
		width: '40%',
	},

	paypalLogo: {
		width: 90,
		height: 50,
		// resizeMode: 'contain',
	},

	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		marginTop: 10,
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
