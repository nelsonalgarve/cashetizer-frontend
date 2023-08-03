// Helper function to fetch categories from the server

export const fetchCategories = async () => {
	try {
		const response = await fetch('http://172.20.10.4:3000/categories');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const categories = await response.json();
		console.log(categories);
		const data = categories.data.map((categories) => ({ key: categories._id, value: categories.name }));
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error; // Rethrow the error to be handled by the calling code
	}
};
