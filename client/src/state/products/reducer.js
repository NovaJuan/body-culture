const initialState = {
	products: null,
	pagination: null,
	count: null,
	loading: false,
	error: null,
	current: null,
	url: null,
	cart_id: localStorage.getItem('bodyculture-cart') || null,
	cart: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_PRODUCTS':
			return {
				...state,
				products: action.payload.products,
				pagination: action.payload.pagination,
				count: action.payload.count,
				url: action.payload.url,
				error: null,
				loading: false
			};

		case 'CURRENT_PRODUCT':
			return {
				...state,
				current: action.payload,
				error: null,
				loading: false
			};
		case 'PRODUCTS_LOADING':
			return {
				...state,
				loading: true
			};
		case 'PRODUCTS_ERROR':
			return {
				...state,
				error: action.payload,
				loading: false
			};

		case 'SET_CART_TOKEN':
			localStorage.setItem('bodyculture-cart', action.payload);
			return {
				...state,
				cart_id: action.payload,
				error: null
			};

		case 'GET_CART':
			return {
				...state,
				cart: action.payload,
				loading: false,
				error: null
			};

		case 'CLEAN_CART':
			localStorage.removeItem('bodyculture-cart');
			return {
				...state,
				cart: null,
				loading: false,
				error: null,
				cart_id: null
			};
		default:
			return state;
	}
};
