import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const FilterForm = ({ onFilter }) => {
	const [filterValue, setFilterValue] = useState('');

	const handleFilterChange = (text) => {
		setFilterValue(text);
	};

	const handleFilterSubmit = () => {
		onFilter(filterValue);
	};

	return (
		<View style={{ paddingHorizontal: 16, marginTop: 16 }}>
			<TextInput
				label="Enter filter keyword"
				value={filterValue}
				onChangeText={handleFilterChange}
				mode="outlined"
				style={{ marginBottom: 16 }}
			/>
			<Button mode="contained" onPress={handleFilterSubmit}>
				Filter
			</Button>
		</View>
	);
};

export default FilterForm;
