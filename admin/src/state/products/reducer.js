const initialState = {
	products: null,
	pagination: null,
	count: null,
	loading: true,
	error: null,
	current: null,
	url: null
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

		case 'CLEAR_CURRENT_PRODUCT':
			return {
				...state,
				current: null,
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
		default:
			return state;
	}
};
