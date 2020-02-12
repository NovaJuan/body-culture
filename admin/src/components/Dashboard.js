import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Dashboard = ({ user, history }) => {
	useEffect(() => {
		if (!user) {
			history.push('/admin/login');
		}
		//eslint-disable-next-line
	}, []);

	return (
		<div className='container py-4'>
			<div className='row'>
				<div className='col-md-6'>
					<div className='card card-body'>
						<h2 className='card-title'>Status</h2>
					</div>
				</div>
				<div className='col-md-6'>
					<div className='card card-body'>
						<h2 className='card-title'>Pending Orders</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
