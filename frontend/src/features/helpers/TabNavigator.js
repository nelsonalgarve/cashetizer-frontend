import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyProfileScreen from '../../features/welcome/screens/MyProfileScreen'; // Using default import
import SettingsScreen from '../../features/welcome/screens/SettingsScreen'; // Using default import
import HomeScreen from '../../features/welcome/screens/HomeScreen'; // Using default import
import { FontAwesome } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'MyProfile') {
            iconName = 'user';
          }else if (route.name === 'Settings') {
            iconName = 'cog';
          } 

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyProfile" component={MyProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
