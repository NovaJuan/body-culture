import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser, clearRedirection } from '../../state/auth/actions';

const Register = ({
	history,
	error,
	registerUser,
	user,
	clearRedirection,
	redirect
}) => {
	useEffect(() => {
		if (user !== null) {
			if (redirect) {
				const where = redirect;
				clearRedirection();
				history.push(where);
			} else {
				history.push('/');
			}
		}
		// eslint-disable-next-line
	}, [user]);

	const [data, setData] = useState({
		name: '',
		email: '',
		password: ''
	});

	const [location, setLocation] = useState({
		city: '',
		address: '',
		state: '',
		country: ''
	});

	const onSubmit = e => {
		e.preventDefault();

		registerUser({ ...data, location });
	};

	const onChange = e => setData({ ...data, [e.target.name]: e.target.value });
	const onLocation = e =>
		setLocation({ ...location, [e.target.name]: e.target.value });

	return (
		<main className='register bc-form'>
			<h1 className='bc-form-title'>Register User</h1>
			{error && <p className='error'>{error}</p>}
			<form onSubmit={onSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Name'
					value={data.name}
					onChange={onChange}
				/>
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={data.email}
					onChange={onChange}
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={data.password}
					onChange={onChange}
				/>
				<input
					type='text'
					name='country'
					placeholder='Country'
					value={location.country}
					onChange={onLocation}
				/>
				<input
					type='text'
					name='state'
					placeholder='State'
					value={location.state}
					onChange={onLocation}
				/>
				<input
					type='text'
					name='city'
					placeholder='City'
					value={location.city}
					onChange={onLocation}
				/>
				<input
					type='text'
					name='address'
					placeholder='Address'
					value={location.address}
					onChange={onLocation}
				/>
				<button className='bc-form-btn' type='submit'>
					Register
				</button>
			</form>
			<Link className='bc-form-link' to='/login'>
				Have account? <span>click here to log in.</span>
			</Link>
		</main>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user,
	error: state.auth.error,
	redirect: state.auth.redirect
});

export default connect(mapStateToProps, { registerUser, clearRedirection })(
	Register
);
