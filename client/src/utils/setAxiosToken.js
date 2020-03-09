import axios from 'axios';

const setAxiosToken = (userToken, cartToken) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${userToken ||
		localStorage['bodyculture-auth']}`;
	axios.defaults.headers.common['cart-id'] = `${cartToken ||
		localStorage['bodyculture-cart']}`;
};

export default setAxiosToken;
