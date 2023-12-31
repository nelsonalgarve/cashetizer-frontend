import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export const GooglePlacesInput = () => {
	const ref = useRef();

	useEffect(() => {
		ref.current?.setAddressText('Some Text');
	}, []);

	return (
		<GooglePlacesAutocomplete
			ref={ref}
			placeholder="Search"
			onPress={(data, details = null) => {
				// 'details' is provided when fetchDetails = true
				console.log(data, details);
			}}
			query={{
				key: GOOGLE_API_KEY,
				language: 'en',
			}}
		/>
	);
};

export default GooglePlacesInput;

styles = StyleSheet.create({
	container: {
		zIndex: 2,
		position: 'absolute',
	},
});

// AIzaSyCKVV2S52hUifM6pOSiTVzj2MoAI4jccqw
