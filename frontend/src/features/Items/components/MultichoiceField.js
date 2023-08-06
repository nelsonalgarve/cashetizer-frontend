import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Divider, FlatList, HelperText } from 'react-native-paper';

export const MultichoiceField = () => {
	const [choices, setChoices] = useState([
		{ label: 'perDay', value: '' },
		{ label: 'perWeek', value: '' },
		{ label: 'perMonth', value: '' },
	]);

	const handleInputChange = (index, value) => {
		const updatedChoices = [...choices];
		updatedChoices[index].value = value;
		setChoices(updatedChoices);
	};

	const handleAddChoice = () => {
		setChoices([...choices, { label: '', value: '' }]);
	};

	const handleRemoveChoice = (index) => {
		const updatedChoices = [...choices];
		updatedChoices.splice(index, 1);
		setChoices(updatedChoices);
	};

	const renderItem = ({ item, index }) => (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<TextInput
				style={{ flex: 1, marginRight: 8 }}
				value={item.value}
				onChangeText={(text) => handleInputChange(index, text)}
				placeholder={`Enter ${item.label} price`}
			/>
			{choices.length > 1 && <Button onPress={() => handleRemoveChoice(index)}>Remove</Button>}
		</View>
	);

	return (
		<View>
			<FlatList
				data={choices}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				ItemSeparatorComponent={() => <Divider />}
			/>
			<Button onPress={handleAddChoice}>Add Price Option</Button>
		</View>
	);
};
