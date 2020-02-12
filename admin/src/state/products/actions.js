import axios from 'axios';

export const getProducts = (page = 1, url) => async dispatch => {
	dispatch({ type: 'PRODUCTS_LOADING' });

	let query = null;

	if (!url) {
		query = '/api/v1/products?';
	} else {
		query = url;
	}

	query += `&page=${page}`;

	try {
		const { data } = await axios.get(query);

		dispatch({
			type: 'GET_PRODUCTS',
			payload: {
				products: data.data,
				pagination: data.pagination,
				count: data.count,
				url
			}
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const deleteProduct = id => async dispatch => {
	try {
		await axios.delete(`/api/v1/products/${id}`);
		dispatch(getProducts());
	} catch (err) {
		console.log(err);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const getProduct = id => async dispatch => {
	dispatch({ type: 'PRODUCTS_LOADING' });
	try {
		const { data } = await axios.get(`/api/v1/products/${id}`);
		dispatch({ type: 'CURRENT_PRODUCT', payload: data.data });
	} catch (err) {
		console.log(err);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const clearCurrent = data => ({
	type: 'CHANGE_CURRENT'
});
