import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

const ChangePass = ({ user, history }) => {
	useEffect(() => {
		if (user === null) {
			history.push('/login');
		}
		//eslint-disable-next-line
	}, []);

	const [data, setData] = useState({
		old_password: '',
		new_password: ''
	});

	const [sending, setSending] = useState(false);
	const [done, setDone] = useState(false);
	const [error, setError] = useState(null);

	const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if (!done && !sending) {
			setSending(true);
			setError(null);
			try {
				await axios.put('/api/v1/auth/changepass', data);
				setDone(true);
				setSending(false);
				setTimeout(() => {
					history.push('/myaccount');
				}, 1000);
			} catch (err) {
				console.log(err);
				setError(err.response ? err.response.data.error : err.message);
				setSending(false);
			}
		}
	};

	return (
		<main className='bc-form'>
			<Link className='go-back-btn' to='/myaccount'>
				Go back
			</Link>
			<h2 className='bc-form-title'>Change Password</h2>
			{error && <p className='error'>{error}</p>}
			{done && <p className='done'>Done!</p>}
			<form onSubmit={onSubmit}>
				<input
					type='password'
					value={data.old_password}
					name='old_password'
					placeholder='Old password'
					onChange={onChange}
				/>
				<input
					type='password'
					value={data.new_password}
					name='new_password'
					placeholder='New password'
					onChange={onChange}
				/>
				<button className='bc-form-btn'>
					{sending ? 'Changing...' : 'Change'}
				</button>
			</form>
		</main>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps)(ChangePass);
