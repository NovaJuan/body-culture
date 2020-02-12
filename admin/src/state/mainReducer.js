import { combineReducers } from 'redux';
import productsReducer from './products/reducer';
import authReducer from './auth/reducer';

export default combineReducers({
	products: productsReducer,
	auth: authReducer
});
