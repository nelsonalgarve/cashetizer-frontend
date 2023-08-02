import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const CategoriesAutocomplete = ({ handleSelectCategories }) => {
	const [input, setInput] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	const handleInputChange = (text) => {
		setInput(text);
		if (text === '') {
			setSuggestions([]);
		} else {
			// fetch(`http://192.168.0.15:3000/category/autocomplete?q=${encodeURIComponent(text)}`)
			fetch(`http://192.168.0.15:3000/category/autocomplete?q=${text}`)
				.then((response) => response.json())
				.then((data) => {
					if (Array.isArray(data)) {
						setSuggestions(data);
					} else {
						console.error('Data is not an array:', data);
						setSuggestions([]);
					}
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					setSuggestions([]);
				});
		}
	};

	return (
		<View>
			<TextInput style={styles.textInput} value={input} onChangeText={handleInputChange} />
			{suggestions.map((suggestion, i) => (
				<TouchableOpacity key={i} onPress={() => handleSelectCategories(suggestion)}>
					<Text>{suggestion}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};
const styles = StyleSheet.create({
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
});
