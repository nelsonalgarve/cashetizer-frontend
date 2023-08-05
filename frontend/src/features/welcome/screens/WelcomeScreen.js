import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, List, Provider as PaperProvider, Searchbar, TextInput } from 'react-native-paper';
import FilterForm from '../../Items/components/FilterForm';
import { calculateDistance } from '../../helpers/calculateDistance';
import formTheme from '../themes/FormTheme';
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
// Replace with the user's actual latitude
const userLatitude = 37.7749;
const userLongitude = -122.4194;

const API_URL = `${SERVER_URL}/item/items/filter`;

export const WelcomeScreen = ({ navigation }) => {
	const [filteredItems, setFilteredItems] = useState([]);
	const [isVisibleCategory, setIsVisibleCategory] = useState(true);
	const [isFlatListVisible, setIsFlatListVisible] = useState(true);

	const hideFlatList = () => {
		setIsFlatListVisible(false);
	};

	const handleFilter = async (filterValue) => {
		try {
			const response = await fetch(`${API_URL}?keyword=${filterValue}`);
			console.log(filterValue);
			const data = await response.json();
			setIsVisibleCategory(false);
			const dataDistance = getDistancesToItems(userLatitude, userLongitude, data);

			setFilteredItems(dataDistance);
		} catch (error) {
			console.error('Error fetching filtered items:', error);
		}
	};

	// CALCUL DISTANCE ENTRE USER ET ITEMS
	function getDistancesToItems(userLatitude, userLongitude, itemsData) {
		const itemsWithDistances = itemsData.map((item, i) => {
			const { latitude, longitude } = item.localisation;
			const distance = calculateDistance(userLatitude, userLongitude, latitude, longitude);
			const formattedNumber = distance.toFixed(2);
			const distanceKm = parseFloat(formattedNumber);

			return {
				key: i,
				...item,
				distanceKm, // Add the calculated distance to the item object
			};
		});

		// Sort items by distance (nearest first)
		itemsWithDistances.sort((a, b) => a.distanceKm - b.distanceKm);

		return itemsWithDistances;
	}

	const renderItem = ({ item }) => {
		// Perform a conditional check to ensure the 'item' object and 'prices' property exist
		if (item && item.prices && item.prices.perDay && item.distanceKm) {
			return (
				<Card style={styles.card} mode="contained">
					<Card.Content>
						<Text style={styles.itemName}>{item.name}</Text>
						<Text style={styles.itemDetails}>{item.description.details} </Text>
						<Text style={styles.itemPrice}>
							Prix/Jour: {item.prices.perDay}€ - Prix/Sem: {item.prices.perWeek}€ - Prix/Mois: {item.prices.perMonth}€
						</Text>
						<Text style={styles.itemDistance}>Distance: {item.distanceKm} km</Text>
					</Card.Content>
				</Card>
			);
		} else {
			return null;
		}
	};
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

				<View style={styles.filterContainer}>
					<FilterForm onFilter={handleFilter} />
				</View>

				{isFlatListVisible && (
					<View style={styles.filteredItemsContainer}>
						<FlatList
							style={styles.flatList}
							windowSize={32}
							data={filteredItems}
							renderItem={renderItem}
							keyExtractor={(item) => item._id}
						/>
					</View>
				)}
				{isFlatListVisible && (
					<TouchableOpacity style={styles.closeButton} onPress={hideFlatList}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				)}
				{/* <View>
					<TextInput style={styles.textInput} label="Rechercher" mode="outlined" Left={<TextInput.Icon icon="search" />} />
				</View> */}
				<View style={styles.categoriesContainer}>
					{/* Affichage des boutons de catégorie */}
					<View style={styles.buttonCategorie}>
						{categories.map(
							(category, index) =>
								isVisibleCategory && (
									<TouchableOpacity key={index} style={styles.button}>
										<Text style={styles.buttonText}>{category}</Text>
									</TouchableOpacity>
								)
						)}
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
				{/* <View>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handlePressItemForm}>
						<Text>Items</Text>
					</Button>
				</View> */}

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
	card: {
		marginBottom: 16,
		backgroundColor: '#E8E8E8',
		borderRadius: 0,
		marginVertical: 0,
	},
	itemName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	itemPrice: {
		fontSize: 14,
		color: 'gray',
	},
	itemDetails: {
		fontSize: 14,
		color: 'gray',
	},
	itemDistance: {
		fontSize: 14,
		color: '#155263',
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
	filterContainer: {
		paddingHorizontal: 16,
		marginTop: 16,
	},

	flatList: {
		flexGrow: 1,
	},
	filteredItemsContainer: {
		flexGrow: 1,
		paddingHorizontal: 16,
	},
	closeButton: {
		position: 'absolute',
		top: 16,
		right: 16,
		backgroundColor: '#FFCE52',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
	},
	closeButtonText: {
		color: '#155263',
		fontSize: 14,
		fontWeight: 'bold',
	},
});
