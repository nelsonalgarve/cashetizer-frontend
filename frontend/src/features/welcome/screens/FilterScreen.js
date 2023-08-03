import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import formTheme from '../themes/FormTheme';

export const FiltrerScreen = ({ navigation }) => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [duration, setDuration] = useState('');
	const [renduHeure, setRenduHeure] = useState(null);
	const [retraitHeure, setRetraitHeure] = useState(null);

	const handleSignUpPress = () => {
		navigation.navigate('Filtrer');
	};

	const handleSignInPress = () => {
		navigation.navigate('Trier');
	};

	const handleDateSelect = (date) => {
		if (startDate && !endDate) {
			setEndDate(date.dateString);

			const start = new Date(startDate);
			const end = new Date(date.dateString);
			const diffInMilliseconds = Math.abs(end - start);
			const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
			setDuration(diffInDays + ' jours');
		} else {
			setStartDate(date.dateString);
			setEndDate('');
			setDuration('');
		}
	};

	const renderTimePicker = () => {
		const hours = Array.from({ length: 24 }, (_, i) => {
			const hour = i < 10 ? '0' + i : '' + i;
			return { label: hour + 'h', value: hour };
		});

		return (
			<RNPickerSelect
				onValueChange={(value) => setRenduHeure(value)}
				items={hours}
				value={renduHeure}
				placeholder={{ label: 'Rendu à', value: null }}
			/>
		);
	};

	const renderRetraitTimePicker = () => {
		const hours = Array.from({ length: 24 }, (_, i) => {
			const hour = i < 10 ? '0' + i : '' + i;
			return { label: hour + 'h', value: hour };
		});

		return (
			<RNPickerSelect
				onValueChange={(value) => setRetraitHeure(value)}
				items={hours}
				value={retraitHeure}
				placeholder={{ label: 'Retrait à', value: null }}
			/>
		);
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={require('../../../../assets/LogoCash.png')} style={styles.image} />
				</View>

				<View style={styles.calendarContainer}>
					<Calendar
						onDayPress={(date) => handleDateSelect(date)}
						markedDates={{
							[startDate]: {
								selected: true,
								selectedColor: '#155263',
							},
							[endDate]: {
								selected: true,
								selectedColor: '#155263',
							},
						}}
					/>
				</View>

				<View style={styles.pickerContainer}>
					<View style={styles.picker}>{renderRetraitTimePicker()}</View>
					<View style={styles.picker}>{renderTimePicker()}</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignUpPress}>
						<Text style={styles.infoText}>Filtrer</Text>
					</Button>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSignInPress}>
						<Text style={styles.infoText}>Trier</Text>
					</Button>
				</View>

				<View style={styles.infoJour}>
					<Text style={styles.infoJour}>{duration}</Text>
				</View>

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
		backgroundColor: '#155263',
		borderWidth: 1,
		width: '45%',
		margin: 12,
		bottom: '140%',
	},

	infoBar: {
		backgroundColor: '#155263',
		paddingVertical: 8,
		paddingHorizontal: 16,
		position: 'absolute',
		bottom: '0%', // Ajustez cette valeur pour déplacer les boutons vers le bas
		width: '100%',
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoText: {
		color: '#FFCE52',
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

	calendarContainer: {
		marginTop: 20,
		backgroundColor: '#FFFFFF',
		padding: 10,
		bottom: -140,
	},

	pickerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 20,
		bottom: -170,
	},

	picker: {
		width: '45%',
		backgroundColor: '#E8E8E8',
		borderRadius: 8,
		paddingHorizontal: 10,
	},
	infoJour: {
		color: '#FFCE52',
		textAlign: 'center',
		fontSize: 16,
		bottom: -40,
	},
});
