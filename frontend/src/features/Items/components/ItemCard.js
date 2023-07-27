import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { styled } from 'styled-components/native';

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Title = styled.Text`
    padding: ${props => props.theme.space[3]};
    text-align: center;
    font-weight: bold;
    font-size: ${props => props.theme.fontSizes[2]};
    color: ${props => props.theme.primary};
`;

const ItemCards = styled(Card)`
    background-color: ${props => props.theme.colors.primary};
`;

const ItemCardCover = styled(Card.Cover)`
    padding: ${props => props.theme.space[3]};
    background-color: white;
`;

export const ItemCard = props => {
    console.log(props.item.description.details);
    return (
        <ItemCards>
            <ItemCardCover source={{ uri: props.item.description.photos[0] }} />
            <Title>{props.item.title}</Title>
        </ItemCards>
    );
};
