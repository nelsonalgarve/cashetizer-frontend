import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, Searchbar, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';

export const WelcomeScreen = ({ navigation }) => {
	const handleSignUpPress = () => {
		navigation.navigate('SignUp');
	};

	const handleSignInPress = () => {
		navigation.navigate('SignIn');
	};

	const handlePressItemForm = () => {
		navigation.navigate('ItemForm');
	};

	// Définissez les catégories ici
	const categories = ['Bricolage', 'Sport', 'Musique', 'Multimédia'];

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={require('../../../../assets/LogoCash.png')} style={styles.image} />
				</View>
				{/* Barre de recherche */}
				<View>
					<TextInput style={styles.textInput} label="Rechercher" mode="outlined" Left={<TextInput.Icon icon="search" />} />
				</View>

				{/* Affichage des boutons de catégorie */}
				<View style={styles.buttonCategorie}>
					{categories.map((category, index) => (
						<TouchableOpacity key={index} style={styles.button}>
							<Text style={styles.buttonText}>{category}</Text>
						</TouchableOpacity>
					))}
				</View>
				<View>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handlePressItemForm}>
						<Text>Items</Text>
					</Button>
				</View>

				<View style={styles.buttonsContainer}>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignUpPress}>
						S'inscrire
					</Button>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignInPress}>
						Se connecter
					</Button>
				</View>

				<View style={styles.infoBar}>
					<Text style={styles.infoText}>Louez malin. Gagnez des € en chemin.</Text>
				</View>
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
	},
	image: {
		flex: 1,
		maxWidth: '100%',
	},
	buttonCategorie: {
		position: 'absolute',
		bottom: '40%', // Ajustez cette valeur pour déplacer les boutons vers le bas
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 200, // hauteur des boutons
	},

	button: {
		backgroundColor: '#155263',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 50,
		marginVertical: 8,
		alignItems: 'center',
		width: 200, //largeur des boutons
	},
	buttonText: {
		color: '#FFCE52',
		textAlign: 'center',
		fontSize: 18,
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

	buttonOutlined: {
		margin: 10,
		backgroundColor: '#FFCE52',
		borderWidth: 1,
		width: '45%',
		margin: 12,
		bottom: '10%',
	},

	infoBar: {
		backgroundColor: '#155263',
		paddingVertical: 8,
		paddingHorizontal: 16,
		position: 'absolute',
		bottom: '0%', // Ajustez cette valeur pour déplacer les boutons vers le bas
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoText: {
		color: '#F1F1F1',
		textAlign: 'center',
		fontSize: 16,
	},

	textInput: {
		marginTop: 110,
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
});
