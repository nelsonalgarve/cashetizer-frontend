import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styled } from 'styled-components/native';
import img from '../../../../assets/logo.png';

const SafeArea = styled(SafeAreaView)`
	flex: 1;
	justify-content: space-between;
	margin-top: ${(props) => props.theme.space[3]};
	margin-top: ${StatusBar.currentHeight ? `${StatusBar.currentHeight}px` : '20px'};
`;

const LogoContainer = styled.View`
	flex: ${(props) => props.theme.flex.logo};
	border: 1px solid #000;
	background-image: url(${img});
	height: 70px;
`;

const FilterContainer = styled.View`
	flex: ${(props) => props.theme.flex.filters};
	background-color: ${(props) => props.theme.colors.brand.primary};
`;

const ItemsList = styled.View`
	flex: ${(props) => props.theme.flex.itemsList};
	background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const BottomTabNav = styled.View`
	flex: ${(props) => props.theme.flex.navBar};
	background-color: ${(props) => props.theme.colors.brand.secondary};
`;
export const ListItems = () => {
	return (
		<SafeArea>
			<LogoContainer />
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
