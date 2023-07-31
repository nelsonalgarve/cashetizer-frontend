import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const WelcomeScreen = ({ navigation }) => {
	const handleSignUpPress = () => {
		navigation.navigate('SignUp');
	};

	const handleSignInPress = () => {
		navigation.navigate('SignIn');
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={require('../../../../assets/LogoText.png')} style={styles.image} />
			</View>

			<View style={styles.authButtonsContainer}>
				<TouchableOpacity style={styles.authButton} onPress={handleSignUpPress}>
					<Text style={styles.authButtonText}>Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.authButton} onPress={handleSignInPress}>
					<Text style={styles.authButtonText}>Sign in</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#155263',
	},
	imageContainer: {
		marginTop: 0,
		alignItems: 'center',
	},
	searchBar: {
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginTop: 20,
		borderRadius: 25,
	},
	categoryButtons: {
		// A remplir plus tard
	},
	categoryButton: {
		// A remplir plus tard
	},
	categoryButtonText: {
		// A remplir plus tard
	},
	authButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
	authButton: {
		borderRadius: 25,
		backgroundColor: '#FFCE52',
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginVertical: 10,
	},
	authButtonText: {
		color: 'white',
		fontSize: 18,
	},
	image: {
		width: 400,
		height: 400,
		resizeMode: 'contain',
	},
});
