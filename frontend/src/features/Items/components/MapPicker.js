import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Button, Modal, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-paper';

Geocoder.init('AIzaSyCKVV2S52hUifM6pOSiTVzj2MoAI4jccqw'); // use a valid API key

export const MapPicker = ({ onLocationSelected, isVisible, onClose }) => {
	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState('');

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.error('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});
		})();
	}, []);

	const handleMarkerDragEnd = (event) => {
		const { latitude, longitude } = event.nativeEvent.coordinate;
		setLocation({ latitude, longitude });
	};

	const handleSubmit = () => {
		Geocoder.from(location)
			.then((json) => {
				var addressComponent = json.results[0].formatted_address;
				setAddress(addressComponent);
				onLocationSelected && onLocationSelected(location, addressComponent);
			})
			.catch((error) => console.warn(error));
	};

	return (
		<Modal visible={isVisible} onRequestClose={onClose}>
			<View style={{ flex: 1 }}>
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: location?.latitude || -34.397,
						longitude: location?.longitude || 150.644,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					{location && <Marker coordinate={location} draggable onDragEnd={handleMarkerDragEnd} />}
				</MapView>
				<TextInput label="Address" value={address} onChangeText={(text) => setAddress(text)} />
				<Button title="Submit" onPress={handleSubmit} />
			</View>
		</Modal>
	);
};
