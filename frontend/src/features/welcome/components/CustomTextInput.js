import React from 'react';
import { View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, TextInput } from 'react-native-paper';

export const CustomTextInput = ({ style, label, mode, error, leftIconName, maskType, maskOptions, keyboardType, value, onChangeText, maxLength }) => {
	return (
		<View>
			<TextInput
				label={label}
				style={style}
				mode={mode}
				maxLength={maxLength}
				error={error}
				left={<TextInput.Icon icon={leftIconName} />}
				value={value}
				onChangeText={onChangeText}
				keyboardType={keyboardType}
			/>
			{maskType && (
				<TextInputMask type={maskType} options={maskOptions} keyboardType={keyboardType} value={value} onChangeText={onChangeText} />
			)}
			{error && <HelperText type="error">{error.message}</HelperText>}
		</View>
	);
};
