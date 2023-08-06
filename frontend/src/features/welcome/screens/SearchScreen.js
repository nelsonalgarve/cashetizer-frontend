import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, Searchbar, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const SearchScreen = ({ navigation }) => {
	const [categories, setCategories] = useState([]);
	const handleSignUpPress = () => {
		navigation.navigate('SignUp');
	};

	const handleSignInPress = () => {
		navigation.navigate('SignIn');
	};

	// FETCH CATEGORIES SORTED BY ITEMS COUNT
	const fetchCategories = async () => {
		try {
			const response = await fetch(`https://cashetizer-backend.vercel.app/category/categories/sorted-by-items`);
			const data = await response.json();
			setCategories(data);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, [categories]);

	const handleCategoryPress = (category) => {
		// Navigate to the ResultScreen and pass the selected category as a parameter
		// console.log('category in search', category);
		navigation.navigate('Results', { category });
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={require('../../../../assets/LogoCash.png')} style={styles.image} />
				</View>

				<View>
					<TextInput style={styles.textInput} label="Rechercher" mode="outlined" Left={<TextInput.Icon icon="search" />} />
				</View>

				<ScrollView contentContainerStyle={styles.buttonCategorie}>
					{categories.map((category, index) => (
						<TouchableOpacity key={index} style={styles.button} onPress={() => handleCategoryPress(category)}>
							<Text style={styles.buttonText}>
								{category.name} ({category.itemCount})
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
				<View style={styles.infoBar}></View>
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
		flexGrow: 1,
		paddingBottom: 20,
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#155263',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 50,
		marginVertical: 8,
		alignItems: 'center',
		width: 300,
	},
	buttonText: {
		color: '#FFCE52',
		textAlign: 'center',
		fontSize: 18,
	},
	infoBar: {
		backgroundColor: '#155263',
		paddingVertical: 8,
		paddingHorizontal: 16,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
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

export default SearchScreen;
