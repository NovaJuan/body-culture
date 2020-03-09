const initialState = {
	user: null,
	token: localStorage.getItem('bodyculture-auth') || null,
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
				error: null
			};

		case 'SET_AUTH_TOKEN':
			localStorage.setItem('bodyculture-auth', action.payload);
			return {
				...state,
				token: action.payload
			};

		case 'LOGOUT':
			localStorage.removeItem('bodyculture-auth');
			return {
				...state,
				user: null,
				token: null,
				loading: false
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
				error: action.payload,
				loading: false,
				token: null,
				user: null,
				started: true
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
