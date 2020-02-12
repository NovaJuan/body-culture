import React from 'react';
import spinner from './spinner.gif';

const BasicLoading = () => {
	return (
		<div className='p-4 container'>
			<div className='row'>
				<img
					src={spinner}
					style={{ width: '100px' }}
					className='m-auto'
					alt='Loading...'
				/>
			</div>
		</div>
	);
};

export default BasicLoading;
