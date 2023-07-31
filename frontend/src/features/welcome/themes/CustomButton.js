import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const CustomButton = ({ mode, style, children, ...props }) => {
	return (
		<Button mode={mode} style={[styles.button, style]} {...props}>
			{children}
		</Button>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 24,
	},
});

export default CustomButton;
