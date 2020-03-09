import React from 'react';
import spinner from './spinner.gif';

const BasicLoading = () => {
	return (
		<div className='basic-loading'>
			<img
				src={spinner}
				style={{ width: '100px' }}
				className='m-auto'
				alt='Loading...'
			/>
		</div>
	);
};

export default BasicLoading;
