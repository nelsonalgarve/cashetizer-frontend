import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Card, CardCover } from 'react-native-paper';
import { styled } from 'styled-components/native';

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Title = styled.Text`
    padding: 16px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: black;
`;

const ItemCards = styled(Card)`
    background-color: white;
`;

const ItemCardCover = styled(Card.Cover)`
    padding: 20px;
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
