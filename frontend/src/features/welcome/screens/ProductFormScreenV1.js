import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Modal, Provider as PaperProvider, Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';

export const ProductFormScreen = ({ route }) => {
	const navigation = useNavigation();
	const SignInScreen = () => {
		navigation.navigate('SignIn');
	};

	const user = useSelector((state) => state.user.value);

	console.log(user);

	const item = {
		name: route.params.item.name,
		ownerId: route.params.item.ownerId._id,
		ownerUSername: route.params.item.ownerId.username,
		prices: route.params.item.prices,
		caution: route.params.item.caution,
		periodes: route.params.item.periodes,
		photos: route.params.item.description.photos,
		etat: route.params.item.description.etat,
		category: route.params.item.category.name,
		distance: route.params.distanceKm,
		localisation: route.params.item.localisation,
		description: route.params.item.description.details,
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.formRow}>
				<Text style={styles.label}>Name:</Text>
				<Text style={styles.value}>{item.name}</Text>
			</View>

			<View style={styles.formRow}>
				<Text style={styles.label}>Owner ID:</Text>
				<Text style={styles.value}>{item.ownerId}</Text>
			</View>

			<View style={styles.formRow}>
				<Text style={styles.label}>Owner Username:</Text>
				<Text style={styles.value}>{item.ownerUSername}</Text>
			</View>

			<View style={styles.formRow}>
				<Text style={styles.label}>Prices:</Text>
				<Text style={styles.value}>{item.prices}</Text>
			</View>

			{/* ... Similar views for other fields ... */}

			<View style={styles.formRow}>
				<Text style={styles.label}>Periodes:</Text>
				{periodes}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	formRow: {
		flexDirection: 'row',
		marginBottom: 15,
		alignItems: 'center',
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		marginRight: 10,
	},
	value: {
		fontSize: 16,
	},
	periode: {
		fontSize: 14,
		color: '#666',
	},
});

export default ProductFormScreen;
