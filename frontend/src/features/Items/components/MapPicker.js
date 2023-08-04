import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Button, Modal, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-paper';
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

Geocoder.init(GOOGLE_API_KEY);

export const MapPicker = ({ onLocationSelected, isVisible, onClose }) => {
	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState('');
	const [region, setRegion] = useState({
		latitude: -34.397,
		longitude: 150.644,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.error('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			const newRegion = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			};
			setLocation(newRegion);
			setRegion(newRegion);
			getAddressFromCoordinates(location.coords.latitude, location.coords.longitude);
		})();
	}, []);

	const handleMarkerDragEnd = (event) => {
		const { latitude, longitude } = event.nativeEvent.coordinate;
		const newRegion = { latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
		setLocation(newRegion);
		setRegion(newRegion);
		getAddressFromCoordinates(latitude, longitude);
	};

	const getAddressFromCoordinates = (latitude, longitude) => {
		Geocoder.from({ latitude, longitude })
			.then((json) => {
				var addressComponent = json.results[0].formatted_address;
				setAddress(addressComponent);
			})
			.catch((error) => console.warn(error));
	};

	const handleSubmit = () => {
		onLocationSelected && onLocationSelected(location, address);
	};

	return (
		<Modal visible={isVisible} onRequestClose={onClose}>
			<View style={{ flex: 1 }}>
				<MapView style={{ flex: 1 }} region={region}>
					{location && <Marker coordinate={location} draggable onDragEnd={handleMarkerDragEnd} />}
				</MapView>
				<View style={{ height: 120 }}>
					<GooglePlacesAutocomplete
						placeholder="Search"
						fetchDetails={true}
						onPress={(data, details = null) => {
							const newRegion = {
								latitude: details.geometry.location.lat,
								longitude: details.geometry.location.lng,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							};
							setLocation(newRegion);
							setRegion(newRegion);
							setAddress(details.formatted_address);
						}}
						query={{
							key: GOOGLE_API_KEY,
							language: 'en',
						}}
						styles={{
							textInputContainer: {
								height: 40, // Or set this to the desired height
								borderTopWidth: 0,
								borderBottomWidth: 0,
							},
							textInput: {
								marginLeft: 0,
								marginRight: 0,
								height: 38, // The height of the TextInput is slightly smaller than the container
								color: '#5d5d5d',
								fontSize: 16,
							},
						}}
					/>
				</View>
				<TextInput label="Address" value={address} onChangeText={(text) => setAddress(text)} />
				<Button title="Submit" onPress={handleSubmit} />
			</View>
		</Modal>
	);
};
