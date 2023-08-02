// NumericInputWithMask.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import NumberFormat from 'react-number-format';

const NumericInputWithMask = ({ value, onChange, errors }) => {
	return (
		<View style={styles.container}>
			<NumberFormat
				value={value}
				displayType={'text'}
				thousandSeparator={'.'}
				decimalSeparator={','}
				prefix={'€'}
				onValueChange={(values) => onChange(values.value)}
				renderText={(formattedValue) => (
					<TextInput
						style={styles.textInput}
						value={formattedValue}
						maxLength={6}
						label="Prix"
						mode="outlined"
						error={errors && errors.price}
						left={<TextInput.Icon icon="currency-eur" />}
						keyboardType="numeric"
						onChangeText={(text) => onChange(text)}
					/>
				)}
			/>
			{errors && errors.price && <HelperText type="error">{errors.price.message}</HelperText>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
	},
	textInput: {
		padding: 10,
	},
});

export default NumericInputWithMask;
