import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

export default function DatePicker(props) {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [isStartPickerVisible, setIsStartPickerVisible] = useState(false);
	const [isEndPickerVisible, setIsEndPickerVisible] = useState(false);

	const dateToFrench = (date) => {
		return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
	};

	const handleConfirm = () => {
		if (startDate && endDate && startDate < endDate) {
			props.onAddPeriod({ start: startDate, end: endDate });
			props.onClose();
		} else {
			alert('La période selectionnée est invalide');
		}
	};

	return (
		<Modal visible={props.isVisible} transparent={true} onRequestClose={props.onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.header}>Select the start and end dates</Text>

					<View style={styles.datePickerContainer}>
						<Button color="#841584" title={`Début: ${dateToFrench(startDate)}`} onPress={() => setIsStartPickerVisible(true)} />
						{isStartPickerVisible && (
							<DateTimePicker
								value={startDate}
								onChange={(event, date) => {
									setStartDate(date);
									setIsStartPickerVisible(false);
								}}
							/>
						)}
					</View>

					<View style={styles.datePickerContainer}>
						<Button color="#841584" title={`Fin: ${dateToFrench(endDate)}`} onPress={() => setIsEndPickerVisible(true)} />
						{isEndPickerVisible && (
							<DateTimePicker
								value={endDate}
								onChange={(event, date) => {
									setEndDate(date);
									setIsEndPickerVisible(false);
								}}
							/>
						)}
					</View>

					<Button color="#841584" title="Confirmer" onPress={handleConfirm} />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
	},
	header: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	datePickerContainer: {
		marginVertical: 10,
	},
});
