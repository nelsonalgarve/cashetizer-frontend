// calculateDistance.js

// Function to convert degrees to radians
function toRad(degrees) {
	return degrees * (Math.PI / 180);
}

// Function to calculate the distance between two latitude-longitude points using the Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
	const earthRadiusKm = 6371;

	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = earthRadiusKm * c;

	return distance;
}
