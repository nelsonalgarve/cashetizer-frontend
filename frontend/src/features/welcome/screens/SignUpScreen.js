import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, TextInput } from 'react-native-paper';

export const SignUpScreen = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const token = useSelector((state) => state.user.token);
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const handleSecureTextEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};
	const {
		register,
		setValue,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			address: '',
			city: '',
			postalCode: '',
			phoneNumber: '',
		},
	});
	const onSubmit = (data) => {
		console.log('data', data);
	};

	const onChange = (arg) => {
		return {
			value: arg.nativeEvent.text,
		};
	};

	console.log('errors', errors);
	return (
		<View style={styles.container}>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder="Entrez votre nom d'utilisateur"
						left={<TextInput.Icon icon="account" />}
					/>
				)}
				name="username"
				rules={{ required: true, maxLength: 12 }}
			/>
			{errors.username && <Text style={styles.error}>Le username est obligatoire</Text>}

			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder="Entrez votre prénom"
						left={<TextInput.Icon icon="account-details" />}
					/>
				)}
				name="firstname"
				rules={{ required: true }}
			/>

			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder="Entrez votre nom"
						left={<TextInput.Icon icon="account-check" />}
					/>
				)}
				name="lastname"
				rules={{ required: true }}
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder="Entrez votre adresse mail"
						left={<TextInput.Icon icon="email" />}
					/>
				)}
				name="email"
				rules={{ required: true }}
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder="Entrez votre adresse"
						left={<TextInput.Icon icon="map-search" />}
					/>
				)}
				name="address"
				rules={{ required: true }}
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder="Entrez votre ville"
						left={<TextInput.Icon icon="city" />}
					/>
				)}
				name="city"
				rules={{ required: true }}
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						placeholder="Entrez votre code postal"
						left={<TextInput.Icon icon="map" />}
						// value={value}
						// onChangeText={value => onChange(value)}
						render={(props) => (
							<TextInputMask
								{...props}
								value={value}
								type="cpf"
								mask="+1 (999) 999-9999"
								//   ref={ref}
								onChangeText={(value) => onChange(value)}
							/>
						)}
					/>
				)}
				name="postalCode"
				rules={{ required: true }}
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<TextInput
							style={styles.input}
							// mode='outlined'
							onBlur={onBlur}
							value={value}
							onChangeText={(value) => onChange(value)}
							placeholder="Entrez votre numéro de téléphone"
							left={<TextInput.Icon icon="email" />}

							// render={(props) => (
							//     <MaskedTextInput
							//         {...props}
							//         mask="+1 (999) 999-9999"
							//         type="cpf"
							//         value={value}
							//         onChangeText={(value) => onChange(value)}
							//     />
							//     )}
						/>
					</View>
				)}
				name="phoneNumber"
				rules={{ required: true }}
				defaultValue=""
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={{ contentStyle: 'red' }}
						fontSize={5}
						// mode='outlined'
						placeholder="Entrez votre mot de passe"
						secureTextEntry={secureTextEntry} // Fix this prop name
						onChangeText={(value) => onChange(value)}
						right={<TextInput.Icon icon="eye" onPress={() => handleSecureTextEntry()} />}
					/>
				)}
				name="password"
				rules={{ required: true, min: 8, maxLength: 32 }}
			/>

			<View>
				<Button
					title="Reset"
					icon="lock-reset"
					type="elevated"
					onPress={() => {
						reset({
							firstName: '',
							lastName: '',
						});
					}}
				>
					Reset
				</Button>
			</View>

			<View>
				<Button icon="account" mode="elevated" onPress={handleSubmit(onSubmit)}>
					<Text>Signup</Text>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		color: '#FFCE52',
		margin: 5,
		marginLeft: 0,
	},
	// button: {
	//     backgroundColor: '#FFCE52',
	//     padding: 10,
	//     borderRadius: 20,
	//     marginTop: 10,
	// },
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 8,
		backgroundColor: 'white',
	},
	input: {
		height: 40,
		// borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		selectionColor: '#155263',
		underlineColor: '#155263',
		activeUnderlineColor: '#155263',
		outlineColor: '#155263',
		activeOutlineColor: '#155263',
		textColor: '#155263',
	},
	error: {
		color: 'red',
	},
});
