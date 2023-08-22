import React, { useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUserData, setError, setToken, setUser } from '../../../../reducers/user';
import { CustomTextInput } from '../components/CustomTextInput';
import formTheme from '../themes/FormTheme';
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const SignOut = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.token);

	const onSubmitLogout = () => {
		// Adresse du backend pour Fetch POST logout
		const logout = `${SERVER_URL}/user/users/logoutAll`;

		// Token récupéré depuis le reducer user
		const bearerToken = token;
		console.log(bearerToken);
		fetch(logout, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				// 'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				// setData(data);
				dispatch(clearUser());
				// dispatch(setToken());
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				{/* <Button style={styles.buttonOutlined} mode="outlined" onPress={onReset}>
					Reset
				</Button> */}
				{token && (
					<Button style={styles.buttonOutlined} mode="Outlined" onPress={() => onSubmitLogout()}>
						Logout
					</Button>
				)}
			</View>
			{/* </KeyboardAvoidingView> */}
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
		justifyContent: 'space-between',
	},

	buttonsContainer: {
		flex: 1,
		alignContent: 'flex-end',
		marginTop: 10,
	},
	buttonOutlined: {
		margin: 10,
		backgroundColor: 'red',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		color: '#000000',
		backgroundColor: '#E8E8E8',
	},
});
