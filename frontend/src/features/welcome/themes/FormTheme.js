// CustomPaperTheme.js

import { DefaultTheme } from 'react-native-paper';

const customTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#155263',
		secondary: 'black',
		accent: '#155263',
		error: '#155263',
	},

	roundness: 8,
	TextInput: {
		flat: {
			color: 'black',
			backgroundColor: '#EDEDED',
			paddingVertical: 8,
			paddingHorizontal: 12,
		},
		// For outlined mode
		outlined: {
			color: 'black',
			backgroundColor: 'red',
			borderRadius: 10,
			borderColor: 'gray',
			borderWidth: 2,
			paddingVertical: 10,
			paddingHorizontal: 16,
		},
		Checkbox: {
			color: 'blue',
			borderRadius: 4,
			borderWidth: 2,
			uncheckedColor: 'gray',
			checkedColor: 'blue',
		},
		witch: {
			color: 'blue',
			uncheckedColor: 'gray',
			disabledColor: 'lightgray',
		},
		Searchbar: {
			backgroundColor: '#EDEDED',
			borderRadius: 10,
			inputStyle: {
				color: 'black',
			},
			placeholderTextColor: 'gray',
		},
		button: {
			contained: {
				backgroundColor: 'blue',
				borderRadius: 8,
				paddingVertical: 12,
				paddingHorizontal: 24,
			},
			outlined: {
				borderColor: 'blue',
				borderWidth: 2,
				borderRadius: 8,
				paddingVertical: 12,
				paddingHorizontal: 24,
			},
			text: {
				color: 'blue',
				paddingVertical: 12,
				paddingHorizontal: 24,
			},
		},
	},
	// fonts: {
	// 	displaySmall: {
	// 		fontFamily: 'Font',
	// 		fontSize: 36,
	// 		fontWeight: '400',
	// 		letterSpacing: 0,
	// 		lineHeight: 44,
	// 	},

	// 	displayMedium: {
	// 		fontFamily: 'Font',
	// 		fontSize: 45,
	// 		fontWeight: '400',
	// 		letterSpacing: 0,
	// 		lineHeight: 52,
	// 	},

	// 	displayLarge: {
	// 		fontFamily: 'Font',
	// 		fontSize: 57,
	// 		fontWeight: '400',
	// 		letterSpacing: 0,
	// 		lineHeight: 64,
	// 	},
	// 	titleSmall: {
	// 		fontFamily: 'Font',
	// 		fontSize: 14,
	// 		fontWeight: '500',
	// 		letterSpacing: 0.1,
	// 		lineHeight: 20,
	// 	},

	// 	titleMedium: {
	// 		fontFamily: 'Font',
	// 		fontSize: 16,
	// 		fontWeight: '500',
	// 		letterSpacing: 0.15,
	// 		lineHeight: 24,
	// 	},

	// 	titleLarge: {
	// 		fontFamily: 'Font',
	// 		fontSize: 22,
	// 		fontWeight: '400',
	// 		letterSpacing: 0,
	// 		lineHeight: 28,
	// 	},
	// 	labelSmall: {
	// 		fontFamily: 'Font',
	// 		fontSize: 11,
	// 		fontWeight: '500',
	// 		letterSpacing: 0.5,
	// 		lineHeight: 16,
	// 	},

	// 	labelMedium: {
	// 		fontFamily: 'Font',
	// 		fontSize: 12,
	// 		fontWeight: '500',
	// 		letterSpacing: 0.5,
	// 		lineHeight: 16,
	// 	},

	// 	labelLarge: {
	// 		fontFamily: 'Font',
	// 		fontSize: 14,
	// 		fontWeight: '500',
	// 		letterSpacing: 0.1,
	// 		lineHeight: 20,
	// 	},
	// 	bodySmall: {
	// 		fontFamily: 'Font',
	// 		fontSize: 12,
	// 		fontWeight: '400',
	// 		letterSpacing: 0.4,
	// 		lineHeight: 16,
	// 	},

	// 	bodyMedium: {
	// 		fontFamily: 'Font',
	// 		fontSize: 14,
	// 		fontWeight: '400',
	// 		letterSpacing: 0.25,
	// 		lineHeight: 20,
	// 	},

	// 	bodyLarge: {
	// 		fontFamily: 'Font',
	// 		fontSize: 16,
	// 		fontWeight: '400',
	// 		letterSpacing: 0.15,
	// 		lineHeight: 24,
	// 	},
	// },
};

export default customTheme;
