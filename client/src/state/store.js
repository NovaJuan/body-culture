import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './mainReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

export default createStore(
	mainReducer,
	{},
	composeWithDevTools(applyMiddleware(...middleware))
);
