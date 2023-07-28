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
	font-size: ${(props) => props.theme.fontSizes.button};
	color: ${(props) => props.theme.colors.text.secondary};
`;

const Rating = styled.View`
	flex-direction: row;
	padding: ${(props) => props.theme.space[2]};
`;

const Section = styled.View`
	flex-direction: row;
	align-items: center;
	bakground-color: ${(props) => props.theme.colors.text.success};
`;

const SectionEnd = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;
`;
const ItemCards = styled(Card)`
	background-color: ${(props) => props.theme.colors.brand.secondary};
`;

const ItemCardCover = styled(Card.Cover)`
	padding: ${(props) => props.theme.space[2]};
	background-color: ${(props) => props.theme.colors.brand.secondary};
`;
const DispoText = styled.Text`
	font-family: ${(props) => props.theme.fonts.body};
	padding: ${(props) => props.theme.space[0]};
	font-weight: ${(props) => props.theme.fontWeights.regular};
	font-size: ${(props) => props.theme.fontSizes.caption};
	color: ${(props) => props.theme.colors.text.success};
`;

export const ItemCard = (props) => {
	console.log(props.item.description.details);
	const ratingArray = Array.from(new Array(Math.ceil(props.item.rating)));
	return (
		<ItemCards>
			<ItemCardCover source={{ uri: props.item.description.photos[0] }} />
			<Info>
				<Title>{props.item.name}</Title>
				<Section>
					<Rating>
						{ratingArray.map((index) => (
							<SvgXml key={index} xml={star} width={20} height={20} />
						))}
					</Rating>
					<SectionEnd>
						{props.item.isAvailable && (
							<>
								<DispoText>
									<Text>Disponible</Text>
								</DispoText>
								<View>
									<SvgXml xml={star} width={20} height={20} color={'blue'} />
								</View>
							</>
						)}
					</SectionEnd>
				</Section>
				<Address>A 1 km</Address>
			</Info>
			<Description>{props.item.description.details}</Description>
			<Address>Prix/Jour 45 $</Address>
		</ItemCards>
	);
};
