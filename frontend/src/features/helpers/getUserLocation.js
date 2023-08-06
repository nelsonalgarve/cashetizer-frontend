// Helper function to get the user's location
export const getUserLocation = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			(error) => {
				reject(error);
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	});
};
