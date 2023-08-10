import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';

const RentalInformationCard = ({ title, rentalPeriod, pricePerDay, totalPrice, depositPrice, paymentMethod }) => {
	return (
		<View style={styles.cardContainer}>
			<Text style={styles.title1}>Resumé de Location</Text>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.info}>Période de location: {rentalPeriod}</Text>
			<Text style={styles.info}>Prix par jour: {pricePerDay}€</Text>
			<Text style={styles.info}>Prix total: {totalPrice}€</Text>
			<Text style={styles.info}>Prix de caution: {depositPrice}€</Text>
			<Text style={styles.info}>Mode de paiement: {paymentMethod}</Text>
			<Text style={styles.title2}>Etat de la demande : Demande acceptée par le propriétaire.</Text>
		</View>
	);
};

export const LocationSuccessful = ({ navigation }) => {
	const handleContractPress = () => {
		// Navigate to the "Contrat de location" screen
		navigation.navigate('ContratDeLocationScreen');
	};

	const handleChecklistPress = () => {
		// Navigate to the "Outils d'état des lieux" screen
		navigation.navigate('OutilsDEtatDesLieuxScreen');
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				<View style={styles.imageContainer}></View>
			</View>

			{/* Your component logic here */}
			<View>
				{/* Render other UI components here */}
				<RentalInformationCard
					title="Tondeuse"
					rentalPeriod="10 days"
					pricePerDay="50"
					totalPrice="500"
					depositPrice="100"
					paymentMethod="Credit Card"
				/>
				<Button style={styles.button1} onPress={handleContractPress} labelStyle={styles.buttonText1}>
					Contrat de location
				</Button>
				<Button style={styles.button2} onPress={handleChecklistPress} labelStyle={styles.buttonText2}>
					Outils d'état des lieux
				</Button>
			</View>
			<View style={[styles.imageContainer, { zIndex: -1 }]}>
				<Image source={require('../../../../assets/LogoShortUp.png')} style={styles.image} />
			</View>
			<View style={styles.greenRectangle}>
				<Text style={styles.rectangleText}>
					Economies futées,{'\n'}
					Des revenus assurés !{' '}
				</Text>
			</View>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: '#ffffff',
		padding: 16,
		borderRadius: 8,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 4,
		bottom: '10%',
	},

	imageContainer: {
		width: '100%',
		marginBottom: -18,
	},
	image: {
		width: '100%',
		resizeMode: 'contain',
		height: 210,
	},

	title1: {
		fontSize: 29,
		fontWeight: 'bold',
		marginBottom: 12,
		textAlign: 'center',
	},

	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	title2: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	info: {
		fontSize: 16,
		marginBottom: 4,
	},
	container: {
		flex: 1,
		backgroundColor: '#F1F1F1',
	},

	button1: {
		backgroundColor: '#155263',
		fontColor: 'black',
		borderWidth: 1,
		width: '80%',
		alignSelf: 'center',
		margin: 12,
		bottom: '-10%',
	},

	buttonText1: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
	},

	button2: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFCE52',
		borderWidth: 1,
		borderColor: 'black', // Change the border color to black
		width: '80%',
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
		bottom: '-10%',
		left: 40,
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

	buttonsOutlineYellow: {
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
});
