import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../state/auth/actions';

const NavBar = ({ user, logout }) => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<h5 className='text-white mb-0' style={{ fontSize: '15px' }}>
					Howdy, {user.name.split(' ')[0]}
				</h5>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<div className='navbar-nav ml-auto'>
						<NavLink className='nav-link' exact to='/admin'>
							Dashboard
						</NavLink>
						<NavLink className='nav-link' to='/admin/products/add'>
							Add a Product
						</NavLink>
						<NavLink className='nav-link' exact to='/admin/products'>
							All Products
						</NavLink>
						<NavLink className='nav-link' to='/admin/orders'>
							View orders
						</NavLink>
						<NavLink className='nav-link' to='/admin/discounts'>
							Set discount
						</NavLink>
						<button
							onClick={logout}
							className='nav-link btn btn-danger btn-sm ml-2 active'>
							Log Out
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps, { logout })(NavBar);
