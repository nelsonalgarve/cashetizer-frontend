import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const ItemCard = (props) => {
	console.log(props.items.name);
	return (
		<Card>
			<Card.Title title="Card Title" subtitle="Card Subtitle" />
			<Card.Content>
				<Text variant="titleLarge">props.items.name</Text>
				<Text variant="bodyMedium">props.items.description.details</Text>
			</Card.Content>
			<Card.Cover source={{ uri: props.items.description.details }} />
			<Card.Actions>
				<Button title="ok">Cancel</Button>
				<Button title="ok">Ok</Button>
			</Card.Actions>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: { backgroundColor: 'white' },
	cover: { padding: 20, backgroundColor: 'white' },
	title: { fontWeight: 'bold', fontSize: 20, padding: 16, color: 'black' },
});
