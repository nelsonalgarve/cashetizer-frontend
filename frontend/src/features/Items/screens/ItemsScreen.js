import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ItemCard } from '../components/ItemCard';

export const ItemsScreen = () => {
	const items = {
		name: 'Souris',
		description: {
			dimensions: { hauteur: 12, largeur: 12, poids: 1 },
			etat: 'neuf',
			details: 'Souris du futur, qui parle',
			photos: ['https://www.zerker.ca/misc/forumstuff/DSC00669.JPG', 'https://www.zerker.ca/misc/forumstuff/DSC00669.JPG', 'img3.jpg'],
			videos: ['mov1.mp4', 'mov2.mp4', 'mov3.mp4'],
		},
		ownerUserId: '1234567890',
		categoryId: '1234567890',
		prices: {
			perHour: 100,
			perDay: 200,
			perWeek: 700,
			perMonth: 2000,
		},
		cautions: 450,
		isAvailable: true,
		positionRange: [100],
	};
	return (
		<>
			<SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
				<View style={{ padding: 16, backgroundColor: 'green' }}>
					<Searchbar placeholder="Search" />
				</View>
				<View style={{ flex: 1, padding: 16, backgroundColor: 'blue' }}>
					<ItemCard items={items} />
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	search: {
		flex: 1,
		width: 300,
		height: 50,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 10,
	},
});
