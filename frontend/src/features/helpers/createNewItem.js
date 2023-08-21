const createNewItem = async (token, formData, payload, navigation) => {
	const ConfirmAdvert = () => {
		navigation.navigate('ConfirmAdvert');
	};

	const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
	try {
		{
			ConfirmAdvert;
		}
		console.log('token from createNewItem handler', token);
		// ('https://cashetizer-backend.vercel.app');
		const response = await fetch(`https://cashetizer-backend.vercel.app/item/items`, {
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
