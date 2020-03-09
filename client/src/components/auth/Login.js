import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginUser, clearRedirection } from '../../state/auth/actions';
import { Link } from 'react-router-dom';

const Login = ({
	history,
	error,
	loginUser,
	user,
	redirect,
	clearRedirection
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
		email: '',
		password: ''
	});

	const onSubmit = e => {
		e.preventDefault();

		loginUser(data);
	};

	const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

	return (
		<main className='login bc-form'>
			<h1 className='bc-form-title'>Log In User</h1>
			{error && <p className='error'>{error}</p>}
			<form onSubmit={onSubmit}>
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
				<button className='bc-form-btn' type='submit'>
					Log In
				</button>
			</form>
			<Link className='bc-form-link' to='/register'>
				No account? <span>click here to register.</span>
			</Link>
			{/* <Link className='bc-form-link' to='/recover'>
				Forgot passoword? <span>click here to recover.</span>
			</Link> ADD LATER WITH ACCOUNT UNLOCKER */}
		</main>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user,
	error: state.auth.error,
	redirect: state.auth.redirect
});

export default connect(mapStateToProps, { loginUser, clearRedirection })(Login);
