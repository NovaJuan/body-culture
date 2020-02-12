import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginAdmin } from '../../state/auth/actions';

const Login = ({ user, error, history, loginAdmin }) => {
	useEffect(() => {
		if (user) {
			history.push('/admin');
		}

		//eslint-disable-next-line
	}, [user]);

	const [data, setData] = useState({
		email: '',
		password: ''
	});

	const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		loginAdmin(data);
	};

	return (
		<div className='container py-4'>
			<h2 className='text-center'>Admin Log In</h2>
			<div className='row'>
				<div className='col-md-4 m-auto'>
					<div className='card card-body'>
						{error && <p className='text-center text-danger'>{error}</p>}
						<form onSubmit={onSubmit}>
							<div className='form-group'>
								<input
									type='email'
									name='email'
									className='form-control'
									placeholder='Email'
									onChange={onChange}
								/>
							</div>
							<div className='form-group'>
								<input
									type='password'
									name='password'
									placeholder='Pass'
									className='form-control'
									onChange={onChange}
								/>
							</div>
							<button className='btn btn-primary btn-block'>Log In</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user,
	error: state.auth.error
});

export default connect(mapStateToProps, { loginAdmin })(Login);
