import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { styled } from 'styled-components/native';

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Title = styled.Text`
	font-family: ${(props) => props.theme.fonts.body};
	padding: ${(props) => props.theme.space[3]};
	text-align: center;
	font-weight: ${(props) => props.theme.fontWeights.bold};
	font-size: ${(props) => props.theme.fontSizes[2]};
	color: ${(props) => props.theme.colors.brand.primary};
`;
const Description = styled.Text`
	font-family: ${(props) => props.theme.fonts.body};
	padding: ${(props) => props.theme.space[3]};
	text-align: center;
	font-weight: ${(props) => props.theme.fontWeights.regular};
	font-size: ${(props) => props.theme.fontSizes[1]};
	color: ${(props) => props.theme.colors.brand.primary};
`;
const ItemCards = styled(Card)`
	background-color: ${(props) => props.theme.colors.brand.primary};
`;

const ItemCardCover = styled(Card.Cover)`
	padding: ${(props) => props.theme.space[3]};
	background-color: white;
`;

export const ItemCard = (props) => {
	console.log(props.item.description.details);
	return (
		<ItemCards>
			<ItemCardCover source={{ uri: props.item.description.photos[0] }} />
			<Title>{props.item.title}</Title>
			<Description>{props.item.description.details}</Description>
		</ItemCards>
	);
};
