import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export const CategoriesAutocomplete = () => {
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
			<TextInput value={input} onChangeText={handleInputChange} />
			{suggestions.map((suggestion, i) => (
				<TouchableOpacity key={i} onPress={() => handleSelect(suggestion)}>
					<Text>{suggestion}</Text>
				</TouchableOpacity>
			))}
		</View>

		// <View>
		// 	<TextInput value={input} onChangeText={handleInputChange} />
		// 	{suggestions.map((suggestion, i) => (
		// 		<Text key={i}>{suggestion}</Text>
		// 	))}
		// </View>
	);
};
