import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from './state/auth/actions';
import setAxiosToken from './utils/setAxiosToken';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
// import ProductsList from './components/products-list/ProductsList';
// import ProductPage from './components/product-page/ProductPage';
// import Cart from './components/cart/Cart';
// import Checkout from './components/cart/Checkout';
// import Register from './components/auth/Register';
// import Login from './components/auth/Login';
// import User from './components/user/User';
// import Order from './components/user/Order';
// import UpdateFields from './components/user/UpdateFields';
// import ChangePass from './components/user/ChangePass';
// import About from './components/pages/About';
// import Terms from './components/pages/Terms';
// import Privacy from './components/pages/Privacy';

import Error404 from './components/error/Error404';
import BasicLoading from './components/loading/BasicLoading';

const ProductsList = lazy(() =>
	import('./components/products-list/ProductsList')
);
const ProductPage = lazy(() => import('./components/product-page/ProductPage'));
const Cart = lazy(() => import('./components/cart/Cart'));
const Checkout = lazy(() => import('./components/cart/Checkout'));
const Register = lazy(() => import('./components/auth/Register'));
const Login = lazy(() => import('./components/auth/Login'));
const User = lazy(() => import('./components/user/User'));
const Order = lazy(() => import('./components/user/Order'));
const UpdateFields = lazy(() => import('./components/user/UpdateFields'));
const ChangePass = lazy(() => import('./components/user/ChangePass'));
const About = lazy(() => import('./components/pages/About'));
const Terms = lazy(() => import('./components/pages/Terms'));
const Privacy = lazy(() => import('./components/pages/Privacy'));

function App({ loadUser, started }) {
	useEffect(() => {
		setAxiosToken();
		loadUser();
		// eslint-disable-next-line
	}, []);

	if (started) {
		return (
			<Router>
				<div className='App'>
					<NavBar />
					<Suspense fallback={<BasicLoading />}>
						<Switch>
							<Route exact path='/product/:name/:id' component={ProductPage} />
							<Route exact path='/cart' component={Cart} />
							<Route exact path='/checkout' component={Checkout} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/myaccount/update' component={UpdateFields} />
							<Route exact path='/myaccount/password' component={ChangePass} />
							<Route exact path='/myaccount' component={User} />
							<Route exact path='/myaccount/order/:id' component={Order} />
							<Route exact path='/store' component={ProductsList} />
							<Route exact path='/about' component={About} />
							<Route exact path='/terms' component={Terms} />
							<Route exact path='/privacy' component={Privacy} />
							<Route exact path='/' component={ProductsList} />
							<Route exact path='*' component={Error404} />
						</Switch>
					</Suspense>
					<Footer />
					<Sidebar />
				</div>
			</Router>
		);
	}

	return <BasicLoading />;
}

const mapStateToProps = state => ({
	loading: state.auth.loading,
	started: state.auth.started
});

export default connect(mapStateToProps, { loadUser })(App);
