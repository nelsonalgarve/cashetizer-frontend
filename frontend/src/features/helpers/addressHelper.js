// AddressHelper.js

function parseAddress(addressString) {
	if (!addressString) {
		return;
	}
	const addressParts = addressString.split(', ');

	const address = addressParts[0];
	const cityAndZipCode = addressParts[1];
	const country = addressParts[2];

	// Extract the city and zip code
	const [city, zipCode] = cityAndZipCode.split(' ');

	return { address, city, zipCode, country };
}

export { parseAddress };
