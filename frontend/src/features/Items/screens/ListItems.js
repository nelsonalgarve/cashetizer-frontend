import React from 'react';
import { Image, SafeAreaView, StatusBar, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styled } from 'styled-components/native';
import img from './img/logo.png';

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    justify-content: space-between;
    margin-top: ${props => props.theme.space[3]};
    margin-top: ${StatusBar.currentHeight ? `${StatusBar.currentHeight}px` : '20px'};
`;

const LogoContainer = styled.View`
    flex: ${props => props.theme.flex.logo};

    background-image: url(${img});
    max-width: 375px;
`;

const FilterContainer = styled.View`
    flex: ${props => props.theme.flex.filters};
    background-color: ${props => props.theme.colors.bg.primary};
`;

const ItemsList = styled.View`
    flex: ${props => props.theme.flex.itemsList};
    background-color: ${props => props.theme.colors.bg.secondary};
`;

const BottomTabNav = styled.View`
    flex: ${props => props.theme.flex.navBar};
    background-color: ${props => props.theme.colors.brand.secondary};
`;
export const ListItems = () => {
    return (
        <SafeArea>
            <LogoContainer>
                <Image source={require('./img/logo.png')} style={{ width: '100%', height: '100%' }} />
            </LogoContainer>
            <FilterContainer>
                <Text>filterContainer à faire</Text>
            </FilterContainer>
            <ItemsList>
                <Text>Liste des Items ItemsListComponent à faire</Text>
            </ItemsList>
            <BottomTabNav>
                <Text>BottomNavComponent à faire</Text>
            </BottomTabNav>
        </SafeArea>
    );
};
