import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styled } from 'styled-components/native';

const SafeArea = styled(SafeAreaView)`
	flex: 1;
	justify-content: space-between;
	margin-top: ${(props) => props.theme.space[3]};
	margin-top: ${StatusBar.currentHeight ? `${StatusBar.currentHeight}px` : '20px'};
`;

const HeaderBar = styled.View`
	flex: ${(props) => props.theme.flex.headerBar};
	background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const TopValidationBannerContainer = styled.View`
	flex: ${(props) => props.theme.flex.topBanner};
	background-color: ${(props) => props.theme.colors.brand.primary};
`;

const SingleItemContainer = styled.View`
	flex: ${(props) => props.theme.flex.itemContainer};
	background-color: ${(props) => props.theme.colors.bg.secondary};
`;
const BottomValidationContainer = styled.View`
	flex: ${(props) => props.theme.flex.bottomBanner};
	background-color: ${(props) => props.theme.colors.brand.primary};
`;
const BottomTabNav = styled.View`
	flex: ${(props) => props.theme.flex.navBar};
	background-color: ${(props) => props.theme.colors.brand.secondary};
`;
export const SingleItem = () => {
	return (
		<SafeArea>
			<HeaderBar>
				<Text>HeaderComponent à faire</Text>
			</HeaderBar>
			<TopValidationBannerContainer>
				<Text>Valider la location topBannerComponent à faire</Text>
			</TopValidationBannerContainer>

			<SingleItemContainer>
				<Text>Photos et description de l'item, ItemComponent à faire</Text>
			</SingleItemContainer>
			<BottomValidationContainer>
				<Text>Valider la location bottomBannerComponent à faire</Text>
			</BottomValidationContainer>
			<BottomTabNav>
				<Text>BottomNavComponent à faire</Text>
			</BottomTabNav>
		</SafeArea>
	);
};
