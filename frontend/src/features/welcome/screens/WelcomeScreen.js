import React from 'react';
import { Image, Searchbar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
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

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={require('../../../../assets/LogoCash.png')} style={styles.image} />
				</View>
				<View style={styles.buttonCategorie}>
					<Text>test</Text>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Bricolage</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Sport</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Musique</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Multimédia</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonsContainer}>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignUpPress}>
						Sign Up
					</Button>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignInPress}>
						Sign In
					</Button>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handlePressItemForm}>
						ItemForm
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
		position: 'absolute', // Use absolute positioning for the image container
		top: 0, // Position the image container at the top edge of the screen
		left: 0, // Position the image container at the left edge of the screen
		right: 0, // Position the image container at the right edge of the screen
		bottom: '80%', // Set the bottom edge of the image container to be at 50% of the screen height
	},
	image: {
		flex: 1,
		maxWidth: '100%', // Let the width of the image fill the image containe
		// resizeMode: 'contain',
	},
	buttonCategorie: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#155263',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		marginVertical: 8,
		alignItems: 'center',
		/*marginTop: '50%',*/
	},

	buttonText: {
		color: '#FFCE52',
		textAlign: 'center',
		fontSize: 18,
	},
	bottomContainer: {
		flexDirection: 'row',
		/*justifyContent: 'space-between',*/
		marginVertical: 16,
	},

	buttonsContainer: {
		position: 'absolute', // Use absolute positioning for the buttons container
		bottom: 0, // Position the buttons container at the bottom edge of the screen
		left: 0, // Position the buttons container at the left edge of the screen
		right: 0, // Position the buttons container at the right edge of the screen
		paddingBottom: 20, // Add padding at the bottom to create space between the buttons and the bottom edge
		flexDirection: 'row',
		justifyContent: 'center',
	},
	buttonOutlined: {
		margin: 10,
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '45%',
		margin: 12,
	},
	infoBar: {
		backgroundColor: '#FFCE52',
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	infoText: {
		color: '#F1F1F1',
		textAlign: 'center',
		fontSize: 16,
	},
});
