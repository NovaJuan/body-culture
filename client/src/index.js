import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './state/store';
import { Provider } from 'react-redux';

if (process.env.NODE_ENV !== 'development') {
	console.log = () => {};
	console.error = () => {};
	console.warn = () => {};
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
