import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../state/auth/actions';

const NavBar = ({ logout, user, history }) => {
	const loggedLinks = (
		<div id='user-links'>
			<Link to='/myaccount'>My Account</Link>
			<a
				href='#!'
				onClick={() => {
					logout();
					history.push('/');
				}}
				className='logout'>
				Log Out
			</a>
		</div>
	);

	const noLoggedLinks = (
		<div id='user-links'>
			<Link to='/login'>Log In</Link>
			<Link to='/register'>Register</Link>
		</div>
	);

	return (
		<nav className='main-nav'>
			{user === null ? noLoggedLinks : loggedLinks}

			<div className='nav-wrapper'>
				<button id='open-sidebar'>
					<img src='/icons/menu.svg' alt='Menu icon' />
				</button>
				<h3 className='brand'>Body Culture</h3>

				<div className='nav-links'>
					<button className='nav-link' id='user-links-btn'>
						<img src='/icons/user.svg' alt='' />
					</button>
					<Link to='/cart' className='nav-link'>
						<img src='/icons/shopping-bag.svg' alt='' />
					</Link>
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps, { logout })(withRouter(NavBar));
