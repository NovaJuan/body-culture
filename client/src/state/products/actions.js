import axios from 'axios';
import setAxiosToken from '../../utils/setAxiosToken';

export const getProducts = (
	page = 1,
	url = '/api/v1/products?limit=6&'
) => async dispatch => {
	dispatch({ type: 'PRODUCTS_LOADING' });

	let query = url + `&page=${page}&select=name,price,discountPrice,id,photo_id`;

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
		console.log(err.response ? err.response.data.error : err.message);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const getSingle = id => async dispatch => {
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

export const getCart = () => async dispatch => {
	try {
		const { data } = await axios.get('/api/v1/cart');
		dispatch({ type: 'GET_CART', payload: data.data });
	} catch (err) {
		console.log(err);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const addToCart = item => async dispatch => {
	try {
		const { data } = await axios.post('/api/v1/cart', item);
		dispatch({ type: 'SET_CART_TOKEN', payload: data.cart });
		setAxiosToken();
		return false;
	} catch (err) {
		console.log(err);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
		return err.response ? err.response.data.error : err.message;
	}
};

export const removeItem = itemid => async dispatch => {
	try {
		const { data } = await axios.put(`/api/v1/cart/remove/${itemid}`);
		dispatch({ type: 'SET_CART_TOKEN', payload: data.cart });
		setAxiosToken();
		dispatch(getCart());
	} catch (err) {
		console.log(err);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const reduceItem = itemid => async dispatch => {
	try {
		const { data } = await axios.put(`/api/v1/cart/reduce/${itemid}`);
		dispatch({ type: 'SET_CART_TOKEN', payload: data.cart });
		setAxiosToken();
		dispatch(getCart());
	} catch (err) {
		console.log(err);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const addItem = itemid => async dispatch => {
	try {
		const { data } = await axios.put(`/api/v1/cart/add/${itemid}`);
		dispatch({ type: 'SET_CART_TOKEN', payload: data.cart });
		setAxiosToken();
		dispatch(getCart());
	} catch (err) {
		console.log(err);
		dispatch({
			type: 'PRODUCTS_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const clearCart = () => ({
	type: 'CLEAR_CART'
});
