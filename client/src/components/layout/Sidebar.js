import { NavLink } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
	return (
		<aside className='sidebar' id='menu-sidebar'>
			<div className='sidebar-head'>
				<h3 className='brand'>
					Body
					<br />
					Culture
				</h3>
				<button id='close-sidebar'>
					<img src='/icons/x.svg' alt='' />
				</button>
			</div>
			<div className='sidebar-links'>
				<NavLink exact to='/' className='sidebar-link'>
					Store
				</NavLink>
				<NavLink to='/about' className='sidebar-link'>
					About us
				</NavLink>
				<NavLink to='/privacy' className='sidebar-link'>
					Privacy Compliant
				</NavLink>
				<NavLink to='/terms' className='sidebar-link'>
					Terms and Conditions
				</NavLink>
			</div>
		</aside>
	);
};

export default Sidebar;
