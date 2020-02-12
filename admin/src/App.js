import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import setAxiosToken from './utils/setAxiosToken';
import { loadAdmin } from './state/auth/actions';

import NavBar from './components/layout/NavBar';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import AllProducts from './components/AllProducts';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';

import BasicLoading from './components/loading/BasicLoading';

const App = ({ user, loading, loadAdmin, started }) => {
	useEffect(() => {
		if (!started) {
			setAxiosToken();
			loadAdmin();
		}
		//eslint-disable-next-line
	}, [user]);

	const PrivateRoute = ({ component: Component, ...rest }) => (
		<Route
			{...rest}
			render={props =>
				user !== null && !loading ? (
					<Component {...props} />
				) : (
					<Redirect to='/admin/login' />
				)
			}
		/>
	);

	if (loading) {
		return <BasicLoading />;
	}

	return (
		<div className='App'>
			{user && <NavBar />}

			<Switch>
				<Route exact path='/admin/login' component={Login} />
				<PrivateRoute component={AllProducts} exact path='/admin/products' />
				<PrivateRoute component={AddProduct} exact path='/admin/products/add' />
				<PrivateRoute
					component={UpdateProduct}
					exact
					path='/admin/products/update/:id'
				/>
				<PrivateRoute component={Dashboard} exact path='/admin' />
				<PrivateRoute component={Dashboard} exact path='/' />
			</Switch>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user,
	loading: state.auth.loading,
	started: state.auth.started
});

export default connect(mapStateToProps, { loadAdmin })(App);
