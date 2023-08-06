import * as Location from 'expo-location';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

const LocationPermissionComponent = ({ onLocationReceived }) => {
	useEffect(() => {
		getLocationPermission();
	}, []);

	const getLocationPermission = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Location permission denied');
			} else {
				const location = await Location.getCurrentPositionAsync({});
				onLocationReceived(location.coords);
			}
		} catch (error) {
			console.warn('Error requesting location permission:', error);
		}
	};

	return <Text>Requesting location permission...</Text>;
};

export default LocationPermissionComponent;
