import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { styled } from 'styled-components/native';
import { ItemCard } from '../components/ItemCard';

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    margin-top: ${props => props.theme.space[3]};
    margin-top: ${StatusBar.currentHeight ? `${StatusBar.currentHeight}px` : '20px'};
`;

const SearchContainer = styled.View`
    padding: ${props => props.theme.space[3]};
`;

const ItemListContainer = styled.View`
    flex: 1;
    padding: ${props => props.theme.space[3]};
`;
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
        <SafeArea>
            <SearchContainer>
                <Searchbar />
            </SearchContainer>
            <ItemListContainer>
                <ItemCard item={items} />
            </ItemListContainer>
        </SafeArea>
    );
};
