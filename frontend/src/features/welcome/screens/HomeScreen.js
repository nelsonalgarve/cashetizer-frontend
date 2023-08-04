import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';


export const HomeScreen = ({ nav}) => {
   
	const handleSignUpPress = () => {
		navigation.navigate('SignUp');
	};

	// Définissez les catégories ici
	const categories = ['Mettre un objet en location', 'Louer un objet', 'Mes locations', 'Mes annonces'];

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={require('../../../../assets/LogoCash.png')} style={styles.image} />
				</View>

				{/* Affichage des boutons de catégorie */}
				<View style={styles.buttonCategorie}>
					{categories.map((category, index) => (
						<TouchableOpacity key={index} style={styles.button}>
							<Text style={styles.buttonText}>{category}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.yellowBar}></View>

				<Text style={styles.annonce}>Annonce sponsorisées</Text>

				
                
			</View>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F1F1F1',
	},
	imageContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: '80%',
        marginTop:-35,
	},
	image: {
		flex: 1,
		maxWidth: '100%',
	},
	buttonCategorie: {
		position: 'absolute',
		bottom: '50%', // Ajustez cette valeur pour déplacer les boutons vers le bas
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 130, // hauteur des boutons
        marginTop: 80,
	},

	button: {
		backgroundColor: '#155263',
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginVertical: 8,
		alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        height: 70, 
		width: 350, //largeur des boutons
		borderRadius: 50, //  pour des bords arrondis
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
        fontWeight: '500',
	},

	buttonsContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingBottom: 20,
		flexDirection: 'row',
		justifyContent: 'center',
	},

	annonce: {
		color: '#155263',
		textAlign: 'center',
		fontSize: 16,
		marginTop: 490, //Position revoir le style
	},

	yellowBar: {
		backgroundColor: '#FFCE52',
        alignSelf: 'center',
		height: 2, // hauteur de la barre comme souhaité
		width: '60%',
		position: 'absolute',
		bottom: '31%', //position de la barre
	},
});

export default HomeScreen; 