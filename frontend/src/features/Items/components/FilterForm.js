import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Searchbar } from 'react-native-paper';

const FilterForm = ({ onFilter }) => {
	const [filterValue, setFilterValue] = useState('');
	const [menuVisible, setMenuVisible] = useState(false);

	const handleFilterChange = (text) => {
		setFilterValue(text);
	};

	const handleFilterSubmit = () => {
		onFilter(filterValue);
	};

	const handleMenuToggle = () => {
		setMenuVisible(!menuVisible);
	};

	const handleMenuItemSelect = (selectedValue) => {
		setFilterValue(selectedValue);
		setMenuVisible(false);
		onFilter(selectedValue);
	};

	const handleIconPress = () => {
		// This function will be called when the magnifying glass icon is pressed
		// Perform the search using the current filterValue
		handleFilterSubmit();
	};

	return (
		<View style={styles.container}>
			<Searchbar
				placeholder="Search by name or details"
				onChangeText={handleFilterChange}
				onIconPress={handleIconPress} // Add this line to handle the icon press
				value={filterValue}
				style={styles.searchbar}
			/>
			{/* <Menu visible={menuVisible} onDismiss={handleMenuToggle} anchor={<Button onPress={handleMenuToggle}>Select Search Option</Button>}>
				<Menu.Item onPress={() => handleMenuItemSelect('Option 1')} title="Option 1" />
				<Menu.Item onPress={() => handleMenuItemSelect('Option 2')} title="Option 2" />
				Add more options as needed
			</Menu> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E8E8E8',
		paddingHorizontal: 16,
		marginTop: 16,
	},
	searchbar: {
		marginBottom: 16,
		backgroundColor: '#E8E8E8',
	},
});

export default FilterForm;
