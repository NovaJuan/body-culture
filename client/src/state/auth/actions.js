import axios from 'axios';
import setAxiosToken from '../../utils/setAxiosToken';

export const registerUser = user => async dispatch => {
	dispatch(clearError());
	dispatch({ type: 'AUTH_LOADING' });
	try {
		const { data } = await axios.post('/api/v1/auth/register', user, {
			headers: { 'content-type': 'application/json' }
		});

		dispatch({ type: 'SET_AUTH_TOKEN', payload: data.token });
		setAxiosToken(data.token);

		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: 'AUTH_ERROR', payload: err.response.data.error });
	}
};

export const loginUser = user => async dispatch => {
	dispatch(clearError());
	dispatch({ type: 'AUTH_LOADING' });
	try {
		const { data } = await axios.post('/api/v1/auth/login', user, {
			headers: { 'content-type': 'application/json' }
		});

		dispatch({ type: 'SET_AUTH_TOKEN', payload: data.token });

		if (data.cart) {
			dispatch({ type: 'SET_CART_TOKEN', payload: data.cart });
		}

		setAxiosToken();

		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: 'AUTH_ERROR', payload: err.response.data.error });
	}
};

export const loadUser = () => async dispatch => {
	dispatch(clearError());
	dispatch({ type: 'AUTH_LOADING' });
	try {
		const { data } = await axios.get('/api/v1/auth/me');
		dispatch({ type: 'LOAD_USER', payload: data.data });
	} catch (err) {
		console.error(err.response.data.error);
		dispatch({ type: 'AUTH_ERROR', payload: err.message });
		dispatch({ type: 'CLEAR_ERROR' });
	}
};

export const updateDetails = user => async dispatch => {
	try {
		const { data } = await axios.put('/api/v1/auth/update', user);
		console.log(data);
		setAxiosToken();
		dispatch(loadUser());
	} catch (err) {
		console.error(err);
		dispatch({
			type: 'AUTH_ERROR',
			payload: err.response ? err.response.data.error : err.message
		});
	}
};

export const logout = () => async dispatch => {
	try {
		await axios.get('/api/v1/auth/logout');
		dispatch({ type: 'LOGOUT' });
		dispatch({ type: 'CLEAN_CART' });
		setAxiosToken(null, null);
	} catch (err) {
		console.error(err);
	}
};

export const setRedirection = redirection => ({
	type: 'SET_REDIRECTION',
	payload: redirection
});

export const clearRedirection = () => ({
	type: 'CLEAR_REDIRECTION'
});

export const clearError = () => ({ type: 'CLEAR_ERROR' });
