import { Picker, View } from '@react-native-picker/picker'; // Import the Picker component from the correct package
import React from 'react';

export const SelectListCustom = ({ setSelected, data, value, onChange }) => (
	<View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
		<Picker
			selectedValue={value}
			onValueChange={(itemValue) => {
				setSelected(itemValue);
				// Call the onChange function passed as a prop to update the form state
				onChange(itemValue);
			}}>
			{data.map((item) => (
				<Picker.Item key={item.value} label={item.label} value={item.value} />
			))}
		</Picker>
	</View>
);
