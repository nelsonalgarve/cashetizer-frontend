import React from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { CustomTextInput } from '../components/CustomTextInput';
import formTheme from '../themes/FormTheme';

export const SignInForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	const onSubmit = (data) => {
		// Handle form submission logic here
		console.log(data);
	};

	const onReset = () => {
		reset();
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				{/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={50}> */}
				<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
					<Controller
						name="email"
						control={control}
						defaultValue=""
						rules={{
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Invalid email address',
							},
						}}
						render={({ field }) => (
							<View>
								<TextInput
									{...field}
									style={styles.textInput}
									value={field.value}
									maxLength={50}
									label="Email"
									mode="outlined"
									error={errors.email}
									left={<TextInput.Icon icon="email" />}
									onChangeText={(text) => field.onChange(text)}
								/>
								{errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
							</View>
						)}
					/>

					{/* Pour pouvoir utiliser le composant TextInputMask et le theme Paper, nous avons créé un composant custom */}

					<Controller
						name="password"
						control={control}
						defaultValue=""
						rules={{
							required: 'Password is required',
						}}
						render={({ field }) => (
							<View>
								<TextInput
									{...field}
									style={styles.textInput}
									value={field.value}
									label="Password"
									secureTextEntry
									mode="outlined"
									error={errors.password}
									left={<TextInput.Icon icon="lock" />}
									onChangeText={(text) => field.onChange(text)}
								/>
								{errors.password && <HelperText type="error">{errors.password.message}</HelperText>}
							</View>
						)}
					/>

					<Button style={styles.buttonOutlined} mode="outlined" onPress={onReset}>
						Reset
					</Button>
					<Button style={styles.buttonOutlined} mode="outlined" onPress={handleSubmit(onSubmit)}>
						Sign Up
					</Button>
				</ScrollView>
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
	scrollContainer: {
		flexGrow: 1,
	},
	buttonsContainer: {
		flex: 1,
		alignContent: 'flex-end',
		marginTop: 10,
	},
	buttonOutlined: {
		margin: 10,
		backgroundColor: '#FFCE52',
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
		backgroundColor: '#E8E8E8',
	},
});
