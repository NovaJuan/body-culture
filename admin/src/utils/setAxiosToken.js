import axios from 'axios';

export default () => {
	axios.defaults.headers[
		'Authorization'
	] = `Bearer ${localStorage['bodyculture-admin']}`;
};
