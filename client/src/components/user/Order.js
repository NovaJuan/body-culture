import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicLoading from '../loading/BasicLoading';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Order = ({ history, match, user }) => {
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!user) {
			return history.push('/');
		}

		axios
			.get(`/api/v1/auth/order/${match.params.id}`)
			.then(res => {
				setOrder(res.data.data);
				setError(null);
				setLoading(false);
			})
			.catch(err => {
				setError(err.response ? err.response.data.error : err.message);
				setLoading(false);
			});
		// eslint-disable-next-line
	}, []);

	if (!loading && order != null) {
		return (
			<div className='order'>
				<div className='container'>
					<Link to='/myaccount' className='go-back-btn'>
						&lt; Go Back
					</Link>
					<h2>Order #{order.id}</h2>
					<p className='total-pay'>
						Total: <strong>${order.totalWithShipping / 100}</strong>
					</p>
					<div className='items'>
						{order.items.map((item, i) => (
							<div className='order-single-item' key={i}>
								<img
									src={
										'https://res.cloudinary.com/dnchnxwkl/image/upload/h_60,c_fill/' +
										item.product.photo_id
									}
									alt=''
									className='item-image'
								/>
								<div className='item-info'>
									<h4>{item.product.name}</h4>
									{item.variations && (
										<div className='variations'>
											{Object.entries(item.variations).map((vari, i) => (
												<p key={i}>
													<strong>{vari[0]}:</strong> {vari[1]}
												</p>
											))}
										</div>
									)}
									<p className='item-total'>${item.totalItemPrice / 100}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (!loading && error != null) {
		return (
			<div className='container py-4 text-center'>
				<h5 className='text-danger'>Error: {error}</h5>
				<Link to='/myaccount' className='btn btn-secondary btn-sm mt-2'>
					Back
				</Link>
			</div>
		);
	}

	return (
		<div className='container py-4'>
			<BasicLoading />
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps)(Order);
