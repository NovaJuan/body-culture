import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setRedirection, loadUser } from '../../state/auth/actions';
import BasicLoading from '../loading/BasicLoading';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const User = ({ user, history, setRedirection, loadUser }) => {
	useEffect(() => {
		if (user === null) {
			setRedirection('/myaccount');
			history.push('/login');
		}
		loadUser();
		// eslint-disable-next-line
	}, []);

	if (user !== null) {
		return (
			<div className='account'>
				<div className='container'>
					<div className='account-wrapper'>
						<div className='account-details'>
							<h3 className='account-sub-title'>User Details</h3>
							<ul>
								<li>
									<strong>Name:</strong> {user.name}
								</li>
								<li>
									<strong>Email:</strong> {user.email}
								</li>
								<li>
									<strong>Country:</strong>
									{user.location.country}
								</li>
								<li>
									<strong>State:</strong> {user.location.state}
								</li>
								<li>
									<strong>City:</strong> {user.location.city}
								</li>
								<li>
									<strong>Address:</strong> {user.location.address}
								</li>
							</ul>
							<div className='account-btn-group'>
								<Link to='/myaccount/update' className='account-btn'>
									Update Details
								</Link>
								<Link to='/myaccount/password' className='account-btn'>
									Change Password
								</Link>
							</div>
						</div>
						<div className='account-orders'>
							<h3 className='account-sub-title'>Your Orders</h3>
							<ul className='account-orders-list'>
								{user.orders.map(order => (
									<li className='account-orders-list-item' key={order.id}>
										<div className='account-orders-list-item-details'>
											<p>Order #{order.id}</p>
											<small>
												<strong>
													<Moment
														date={order.created_at}
														format='MMM Do, YYYY - hh:mm A'
													/>
												</strong>
											</small>
											<p>Status: {order.orderStatus}</p>
										</div>
										<Link
											to={`/myaccount/order/${order.id}`}
											className='account-orders-list-item-btn'>
											Details
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return <BasicLoading />;
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps, { setRedirection, loadUser })(User);
