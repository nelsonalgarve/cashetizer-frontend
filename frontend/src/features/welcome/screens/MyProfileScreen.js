import { StyleSheet, Text, View } from 'react-native';

export default function MyProfileScreen() {
	return (
		<View style={styles.container}>
			<Text> Welcome to your profile page </Text>
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
