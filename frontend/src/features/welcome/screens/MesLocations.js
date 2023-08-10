import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';

export const MesLocations = () => {
	const navigation = useNavigation();

	const handleHomeScreen = () => {
		navigation.navigate('HomeScreen');
	};
	const persons = [
		{
			name: 'Appareil Photo Lumix',
			surname: 'bon état',
			date: 'du 10/08/2023 au 18/08/2023',
			statut: 'à venir',
			image: require('../../../../assets/camera.png'),
		},
		{
			name: 'McBook',
			surname: 'usé',
			date: 'du 07/08/2023 au 12/09/2023',
			statut: 'en cours',
			image: require('../../../../assets/macbook.png'),
		},
		{
			name: 'play',
			surname: 'bon etat',
			date: 'du 08/08/2023 au 30/09/2023',
			statut: 'en cours',
			image: require('../../../../assets/play.png'),
		},
		{
			name: 'Vélo électrique',
			surname: 'bon etat',
			date: 'du 08/08/2023 au 30/09/2023',
			statut: 'en cours',
			image: require('../../../../assets/velo.png'),
		},
	];

	const handleContractPress = () => {
		// Navigate to the "Contrat de location" screen
		navigation.navigate('ContratDeLocationScreen');
	};

	const profilePhotoUri = require('../../../../assets/SuperM.png');

	return (
		<PaperProvider theme={formTheme}>
			{/* Your component logic here */}
			{persons.map((person, index) => (
				<View key={index} style={styles.itemContainer}>
					<View style={styles.imageContainer}></View>
					<View style={styles.infoContainer}>
						<Image source={person.image} style={styles.profileImage} />
						<Text style={styles.label}>Titre produit: {person.name}</Text>
						<Text style={styles.label}>Etat produit: {person.surname}</Text>
						<Text style={styles.label}>Date de location: {person.date}</Text>
						<Text style={styles.label}>Statut location: {person.statut}</Text>
					</View>
				</View>
			))}

			<Button style={styles.button1} onPress={handleContractPress} labelStyle={styles.buttonText1}>
				Retour Page Produit
			</Button>
			<Button style={styles.button2} onPress={handleHomeScreen} labelStyle={styles.buttonText2}>
				Home
			</Button>

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
	itemContainer: {
		backgroundColor: '#F1F1F1',
		padding: 9,
		borderRadius: 7,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 4,
		bottom: '-2%',
	},

	infoContainer: {
		backgroundColor: '#ffffff',
		padding: 9,
		borderRadius: 8,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 4,
		bottom: '3%',
	},

	label: {
		fontSize: 13,
		fontWeight: 'bold',
		marginBottom: 8,
		textAlign: 'justify',
		left: 80,
	},

	value: {
		fontSize: 15,
		fontWeight: 'bold',
		marginBottom: 8,
		textAlign: 'right',
		color: '#FFCE52',
	},

	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},

	container: {
		flex: 1,
		backgroundColor: '#F1F1F1',
	},
	imageContainer: {
		position: 'absolute',
		top: 0,
		left: 15,
		right: 0,
		bottom: '80%',
	},
	image: {
		flex: 1,
		maxWidth: '100%',
	},

	button1: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#155263',
		borderWidth: 1,
		borderColor: '#FFFFFF',
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
		bottom: '-3%',
		left: '12%', // Ajustez cette valeur pour déplacer les boutons vers la gauche
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
		left: 40,
		bottom: '-4%',
		left: '12%', // Ajustez cette valeur pour déplacer les boutons vers la gauche
	},

	buttonText2: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
	},

	infoBar: {
		backgroundColor: '#155263',
		paddingVertical: 8,
		paddingHorizontal: 16,
		position: 'absolute',
		bottom: '-10%', // Ajustez cette valeur pour déplacer les boutons vers le bas
		width: '100%',
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},

	profileImage: {
		width: 60, // Adjust the size of the profile photo as needed
		height: 60,
		borderRadius: 2, // Set the borderRadius to half of the width and height to create a circle
		borderWidth: 0,
		borderColor: '#fff', // Optionally, you can set a border color for the profile photo
		position: 'absolute',
		top: 16,
		left: 16,
	},

	labelImage: {
		width: 30, // Ajustez la taille de l'image du label selon vos besoins
		height: 30,
		marginRight: 35, // Ajoutez une marge à droite pour séparer l'image du texte
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
});
