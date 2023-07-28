import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { styled } from 'styled-components/native';
import star from '../../../../assets/star';
const Info = styled.View`
	padding: ${(props) => props.theme.space[2]};
`;
const Address = styled.Text`
	font-family: ${(props) => props.theme.fonts.body};
	font-size: ${(props) => props.theme.fontSizes.caption};
	padding: ${(props) => props.theme.space[2]};
	font-weight: ${(props) => props.theme.fontWeights.regular};
`;

const Title = styled.Text`
	font-family: ${(props) => props.theme.fonts.heading};
	padding: ${(props) => props.theme.space[2]};
	font-weight: ${(props) => props.theme.fontWeights.bold};
	font-size: ${(props) => props.theme.fontSizes.title};
	color: ${(props) => props.theme.colors.text.primary};
`;
const Description = styled.Text`
	font-family: ${(props) => props.theme.fonts.body};
	padding: ${(props) => props.theme.space[2]};
	font-weight: ${(props) => props.theme.fontWeights.regular};
	font-size: ${(props) => props.theme.fontSizes.body};
	color: ${(props) => props.theme.colors.text.primary};
`;

const Rating = styled.View`
	flex-direction: row;
	padding: ${(props) => props.theme.space[2]};
`;

const ItemCards = styled(Card)`
	background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ItemCardCover = styled(Card.Cover)`
	padding: ${(props) => props.theme.space[2]};
	background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ItemCard = (props) => {
	console.log(props.item.description.details);
	const ratingArray = Array.from(new Array(Math.ceil(props.item.rating)));
	return (
		<ItemCards>
			<ItemCardCover source={{ uri: props.item.description.photos[0] }} />
			<Info>
				<Title>{props.item.name}</Title>
				<Rating>
					{ratingArray.map((index) => (
						<SvgXml xml={star} width={20} height={20} />
					))}
				</Rating>
				<Address>A 1 km</Address>
			</Info>
			<Description>{props.item.description.details}</Description>
			<Address>Prix/Jour 45 $</Address>
		</ItemCards>
	);
};
