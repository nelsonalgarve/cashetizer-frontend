import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, Searchbar, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const WelcomeScreen = ({ navigation }) => {
	const [categories, setCategories] = useState([]);
	const [userLatitude, setUserLatitude] = useState(null);
	const [userLongitude, setUserLongitude] = useState(null);
	
	
	const handleSignUpPress = () => {
		navigation.navigate('SignUp');
	};

	const handleSignInPress = () => {
		navigation.navigate('SignIn');
	};

	// RECUPERERE LA POSITION ET L'AUTHORISATION d'utilisateur

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status === 'granted') {
				const location = await Location.getCurrentPositionAsync({});
				console.log(location);
				setUserLatitude(location.coords.latitude);
				setUserLongitude(location.coords.longitude);
				console.log(location.coords.latitude);
			}
		})();
	}, []);



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
					<Image source={require('../../../../assets/LogoShortUpMarg.png')} style={styles.image} resizeMode="center" />
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
				<View style={styles.buttonsContainer}>
						<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignUpPress}>
							S'inscrire
						</Button>
						<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignInPress}>
							Se connecter
						</Button>
					</View>
				
				<View style={styles.greenRectangle}>
					<Text style={styles.rectangleText}>
						Louez malin.{'\n'}
						Gagnez des € en chemin!{' '}
					</Text>
				</View>
				
			</View>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	buttonsContainer: {
		position: 'absolute',
		bottom: 20,
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
		width: '40%',
		margin: 12,
		bottom: '10%',
		borderWidth: 0.25,
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

	container: {
		flex: 1,
		backgroundColor: '#F1F1F1',
	},
	imageContainer: {
		position: 'absolute',
		top: -20,
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
		marginTop: 30,
	},
	button: {
		backgroundColor: '#155263',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 50,
		marginVertical: 8,
		alignItems: 'center',
		justifyContent: 'center',
		width: 300,
		height: 60,
		borderWidth: 0.25, 
        borderColor: '#FFFFFF',
        borderRadius: 40,
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
		fontSize: 18,
		fontWeight: '500',
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
	textInput: {
		marginTop: 127,
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
});

export default WelcomeScreen;