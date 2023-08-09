import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const PeriodsPicker = ({ periods, onDateSelect }) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [currentPeriod, setCurrentPeriod] = useState(null);

	const showDatePickerForPeriod = (period) => {
		setCurrentPeriod(period);
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		const selectedDate = new Date(date);
		if (selectedDate >= new Date(currentPeriod.start) && selectedDate <= new Date(currentPeriod.end)) {
			onDateSelect(currentPeriod, selectedDate);
			hideDatePicker();
		} else {
			// Handle date outside the range, maybe show an error message or just ignore.
			hideDatePicker();
		}
	};

	return (
		<View style={styles.container}>
			{periods.map((period) => (
				<TouchableOpacity
					key={period._id}
					onPress={() => showDatePickerForPeriod(period)}
					style={{ ...styles.badge, backgroundColor: '#EAEAEA' }}
				>
					<Text>{`Du: ${new Date(period.start).toLocaleDateString('fr-FR')} Au: ${new Date(period.end).toLocaleDateString('fr-FR')}`}</Text>
				</TouchableOpacity>
			))}
			<DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	badge: {
		backgroundColor: '#EAEAEA',
		padding: 10,
		margin: 10,
		borderRadius: 5,
	},
});
