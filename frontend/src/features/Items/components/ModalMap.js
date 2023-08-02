import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import MapPicker from './MapPicker';

export const ModalMap = () => {
	const [visible, setVisible] = useState(false);

	const openMapPicker = () => setVisible(true);
	const closeMapPicker = () => setVisible(false);

	return (
		<View>
			<IconButton icon="map" size={40} onPress={openMapPicker} />

			<Modal animationType="slide" transparent={false} visible={visible} onRequestClose={closeMapPicker}>
				<MapPicker onLocationPicked={closeMapPicker} />
			</Modal>
		</View>
	);
};
