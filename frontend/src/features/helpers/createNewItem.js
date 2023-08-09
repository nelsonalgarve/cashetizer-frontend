const createNewItem = async (token, formData, payload) => {
	const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
	try {
		console.log('token from createNewItem handler', token);

		const response = await fetch(`http://192.168.0.15/item/items`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});
		console.log('response----------------------', response.status);
		if (!response.ok) {
			throw new Error('Failed to create item');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(token);
		console.error('Error creating item:', error);
		throw error;
	}
};

export { createNewItem };
