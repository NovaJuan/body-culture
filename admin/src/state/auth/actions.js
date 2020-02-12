import axios from 'axios';
import setAxiosToken from '../../utils/setAxiosToken';

export const loadAdmin = () => async dispatch => {
	try {
		const { data } = await axios.get('/api/v1/auth/me');

		if (data.data.role !== 'admin') {
			return dispatch(setAuthError(new Error('Invalid Credentials')));
		}

		dispatch({ type: 'LOAD_USER', payload: data.data });
	} catch (err) {
		console.log(err);
		dispatch(setAuthError(err));
		dispatch(clearAuthError());
	}
};

export const loginAdmin = user => async dispatch => {
	dispatch(setAuthLoading());
	dispatch(clearAuthError());
	try {
		const { data } = await axios.post('/api/v1/auth/login', user);
		console.log(data);

		if (!data.isAdmin) {
			return dispatch(setAuthError(new Error('Invalid Credentials.')));
		}

		dispatch({ type: 'SET_AUTH_TOKEN', payload: data.token });
		setAxiosToken();
		dispatch(loadAdmin());
	} catch (err) {
		console.log(err);
		dispatch(setAuthError(err));
	}
};

export const logout = () => async dispatch => {
	try {
		await axios.get('/api/v1/auth/logout');
		dispatch({ type: 'LOGOUT' });
		setAxiosToken();
	} catch (err) {
		console.error(err);
	}
};

export const setAuthLoading = () => ({
	type: 'AUTH_LOADING'
});

export const setAuthError = error => ({
	type: 'AUTH_ERROR',
	payload: error
});

export const clearAuthError = () => ({
	type: 'CLEAR_ERROR'
});
