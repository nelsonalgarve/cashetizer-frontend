import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, Searchbar, TextInput } from 'react-native-paper';
import FilterForm from '../../Items/components/FilterForm';
import formTheme from '../themes/FormTheme';
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const API_URL = `${SERVER_URL}/item/items/filter`;

export const WelcomeScreen = ({ navigation }) => {
	const [filteredItems, setFilteredItems] = useState([]);
	const [filterValue, setFilterValue] = useState('');

	const handleFilter = async (filterValue) => {
		try {
			const response = await fetch(`${API_URL}?keyword=${filterValue}`);
			const data = await response.json();
			setFilteredItems(data.items);
		} catch (error) {
			console.error('Error fetching filtered items:', error);
		}
	};

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<Text>{item.name}</Text>
			<Text>{item.details}</Text>
		</View>
	);

	// NAVIGATION ----------------------------------------------------------------
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
	const categories = ['Bricolage', 'Sport', 'Musique', 'Multimédia', 'Famille'];

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={require('../../../../assets/LogoCash.png')} style={styles.image} />
				</View>
				{/* Barre de recherche */}
				<View style={styles.filterContainer}>
					<FilterForm onFilter={handleFilter} />
					<FlatList data={filteredItems} renderItem={renderItem} keyExtractor={(item) => item._id} />
				</View>
				{/* <View>
					<TextInput style={styles.textInput} label="Rechercher" mode="outlined" Left={<TextInput.Icon icon="search" />} />
				</View> */}
				<View style={styles.categoriesContainer}>
					{/* Affichage des boutons de catégorie */}
					<View style={styles.buttonCategorie}>
						{categories.map((category, index) => (
							<TouchableOpacity key={index} style={styles.button}>
								<Text style={styles.buttonText}>{category}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignUpPress}>
						S'inscrire
					</Button>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignInPress}>
						Se connecter
					</Button>
				</View>
				<View>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handlePressItemForm}>
						<Text>Items</Text>
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
		flex: 1,
		top: 0,
		left: 0,
		right: 0,
		bottom: '80%',
	},
	image: {
		flex: 1,
		maxWidth: '100%',
	},
	filterContainer: {
		flex: 1,
	},
	buttonCategorie: {
		position: 'absolute',
		bottom: '40%', // Ajustez cette valeur pour déplacer les boutons vers le bas
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 200, // hauteur des boutons
	},
	categoriesContainer: {
		flex: 2,
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
	filter: {
		flex: 1,
		paddingVertical: 40,
	},
});
