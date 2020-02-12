const initialState = {
	user: null,
	token: localStorage.getItem('bodyculture-admin') || null,
	isAdmin: false,
	loading: true,
	error: null,
	redirect: null,
	started: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_USER':
			return {
				...state,
				user: action.payload,
				loading: false,
				started: true,
				error: null,
				isAdmin: true
			};

		case 'SET_AUTH_TOKEN':
			localStorage.setItem('bodyculture-admin', action.payload);
			return {
				...state,
				token: action.payload
			};

		case 'LOGOUT':
			localStorage.removeItem('bodyculture-admin');
			return {
				...state,
				user: null,
				token: null,
				loading: false,
				isAdmin: false
			};

		case 'SET_REDIRECTION':
			return {
				...state,
				redirect: action.payload
			};

		case 'CLEAR_REDIRECTION':
			return {
				...state,
				redirect: null
			};

		case 'AUTH_LOADING':
			return {
				...state,
				loading: true
			};

		case 'AUTH_ERROR':
			localStorage.removeItem('bodyculture-auth');
			return {
				...state,
				error: action.payload.response
					? action.payload.response.data.error
					: action.payload.message,
				loading: false,
				token: null,
				user: null,
				started: true,
				isAdmin: false
			};
		case 'CLEAR_ERROR':
			return {
				...state,
				error: null
			};

		default:
			return state;
	}
};
