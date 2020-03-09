import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	updateDetails,
	clearError,
	setRedirection
} from '../../state/auth/actions';
import BasicLoading from '../loading/BasicLoading';

const UpdateFields = ({
	user,
	updateDetails,
	history,
	error,
	setRedirection
}) => {
	useEffect(() => {
		if (user === null) {
			setRedirection('/myaccount/update');
			history.push('/login');
		}
	});

	const [data, setData] = useState({});
	const [location, setLocation] = useState({});

	const onSubmit = async e => {
		clearError();
		e.preventDefault();

		let newUser = { ...data };

		if (Object.keys(location).length > 0) {
			newUser = { ...newUser, location };
		}

		await updateDetails(newUser);

		if (error === null) {
			history.push('/myaccount');
		}
	};

	const onChange = e => {
		if (e.target.value === '') {
			let temp = data;
			delete temp[e.target.name];
			return setData(temp);
		}
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const onLocation = e => {
		if (e.target.value === '') {
			let temp = location;
			delete temp[e.target.name];
			return setLocation(temp);
		}
		setLocation({ ...location, [e.target.name]: e.target.value });
	};

	if (user !== null) {
		return (
			<main className='bc-form'>
				<Link className='go-back-btn' to='/myaccount'>
					Go back
				</Link>
				<h2 className='bc-form-title'>Update Fields</h2>
				{error && <p className='error'>{error}</p>}
				<form onSubmit={onSubmit}>
					<input
						placeholder={'Name: ' + user.name}
						onChange={onChange}
						type='text'
						name='name'
						id='name'
					/>
					<input
						placeholder={'Email: ' + user.email}
						onChange={onChange}
						type='email'
						name='email'
						id='email'
					/>
					<input
						placeholder={'Country: ' + user.location.country}
						onChange={onLocation}
						type='text'
						name='country'
						id='country'
					/>
					<input
						placeholder={'State: ' + user.location.state}
						onChange={onLocation}
						type='text'
						name='state'
						id='state'
					/>
					<input
						placeholder={'City: ' + user.location.city}
						onChange={onLocation}
						type='text'
						name='city'
						id='city'
					/>
					<input
						placeholder={'Address: ' + user.location.address}
						onChange={onLocation}
						type='text'
						name='address'
						id='address'
					/>
					<button className='bc-form-btn'>Update Details</button>
				</form>
			</main>
		);
	}

	return <BasicLoading />;
};

const mapStateToProps = state => ({
	user: state.auth.user,
	error: state.auth.error
});

export default connect(mapStateToProps, {
	updateDetails,
	clearError,
	setRedirection
})(UpdateFields);
