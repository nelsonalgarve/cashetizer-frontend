import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text> Welcome to your page Settings</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		maxWidth: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
