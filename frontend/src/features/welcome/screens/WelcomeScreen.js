import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, Searchbar, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUserData, setToken, setUser } from '../../../../reducers/user';
import formTheme from '../themes/FormTheme';
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const WelcomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.tokenValue);
	const [categories, setCategories] = useState([]);
	const [userLatitude, setUserLatitude] = useState(null);
	const [userLongitude, setUserLongitude] = useState(null);

	const handleSignUpPress = () => {
		navigation.navigate('SignUp');
	};

	const handleSignInPress = () => {
		navigation.navigate('SignIn');
	};

	// RECUPERERE LA POSITION ET L'AUTORISATION d'utilisateur

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
			const response = await fetch(`${SERVER_URL}/category/categories/sorted-by-items`);
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

	const onSubmitLogout = () => {
		dispatch(clearUser());
		// Adresse du backend pour Fetch POST logout
		const logout = `${SERVER_URL}/users/logoutAll`;

		// Token récupéré depuis le reducer user
		const bearerToken = token;
		console.log('-----------beresr', bearerToken);
		fetch(logout, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				// 'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				dispatch(clearUser());

				console.log(data);
			})
			.catch((error) => {
				// setError(error.message);
			});
	};
	const onReset = () => {
		reset();
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

				<ScrollView contentContainerStyle={styles.buttonCategorie} keyboardShouldPersistTaps="handled">
					{categories.map((category, index) => (
						<TouchableOpacity key={index} style={styles.button} onPress={() => handleCategoryPress(category)}>
							<Text style={styles.buttonText}>
								{category.name} ({category.itemCount})
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
				{!token && (
					<View style={styles.buttonsContainer}>
						<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignUpPress}>
							S'inscrire
						</Button>
						<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignInPress}>
							Se connecter
						</Button>
					</View>
				)}
				{/* If token exists, show the logout button */}
				{token && (
					<View style={styles.buttonsContainer}>
						<Button style={styles.buttonOutlined} mode="Outlined" onPress={onSubmitLogout}>
							Logout {user.username}
						</Button>
					</View>
				)}

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
		backgroundColor: '#F1F1F1',
		height: 90,
		position: 'absolute',
		bottom: 35,
		left: 0,
		right: 0,
		paddingBottom: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},

	buttonOutlined: {
		backgroundColor: '#FFCE52',
		borderWidth: 1,
		width: '45%',
		marginTop: 10,
		marginHorizontal: 5,
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
		marginTop: 5,
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
