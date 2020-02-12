import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../state/products/actions';

import BasicLoading from './loading/BasicLoading';

const AllProducts = ({
	loading,
	products,
	count,
	pagination,
	error,
	url,
	history,
	getProducts,
	deleteProduct
}) => {
	useEffect(() => {
		if (products === null) {
			getProducts();
		}
		//eslint-disable-next-line
	}, []);

	const nextPage = () => {
		if (pagination.next) {
			getProducts(pagination.next.page, url);
		}
	};

	const prevPage = () => {
		if (pagination.prev) {
			getProducts(pagination.prev.page, url);
		}
	};

	let pageBtns = null;

	if (error) {
		return (
			<div className='py-4'>
				<h3 className='text-center text-danger'>{error}</h3>
			</div>
		);
	}

	if (products !== null && !loading) {
		pageBtns = (
			<div className='text-center'>
				{pagination.prev && (
					<button onClick={prevPage} className='mr-2 btn btn-primary btn-sm'>
						Prev
					</button>
				)}
				<span>{pagination.current.page}</span>
				{pagination.next && (
					<button onClick={nextPage} className='ml-2 btn btn-primary btn-sm'>
						Next
					</button>
				)}
			</div>
		);

		return (
			<div className='py-4'>
				<h1 className='text-center'>All Products</h1>
				{products.length > 0 ? (
					<div>
						<table className='table table-striped text-center table-bordered'>
							<thead>
								<tr>
									<th scope='col'>ID</th>
									<th scope='col'></th>
									<th scope='col'>Name</th>
									<th scope='col'>Price</th>
									<th scope='col'>Variations</th>
									<th scope='col'>Operation</th>
								</tr>
							</thead>
							<tbody>
								{products.map((item, i) => (
									<tr key={i}>
										<td>{item.id || 'NULL'}</td>
										<td className='text-center'>
											<img src={item.thumbnail} alt={item.name} />
										</td>
										<td>{item.name}</td>
										<td>{'$' + item.price / 100}</td>
										<td>
											{item.variations
												? Object.entries(item.variations).map(
														(variation, i) => (
															<p key={i}>
																<strong>{variation[0]}:</strong>{' '}
																{variation[1].join(';')}
															</p>
														)
												  )
												: 'NULL'}
										</td>
										<td>
											<Link
												to={`/admin/products/discount/${item._id}`}
												className='btn btn-success btn-sm mr-2'>
												Set Discount
											</Link>
											<Link
												to={`/admin/products/update/${item._id}`}
												className='btn btn-primary btn-sm mr-2'>
												Update
											</Link>
											<button
												className='btn btn-danger btn-sm'
												onClick={e => {
													if (window.confirm('Sure you want to delete it?')) {
														deleteProduct(item._id);
													}
												}}>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						{pageBtns}
					</div>
				) : (
					<div>
						<h4 className='text-center text-danger'>No Products found</h4>
					</div>
				)}
			</div>
		);
	}

	return <BasicLoading />;
};

const mapStateToProps = state => ({
	loading: state.products.loading,
	products: state.products.products,
	count: state.products.count,
	pagination: state.products.pagination,
	error: state.products.error,
	url: state.products.url
});

export default connect(mapStateToProps, { getProducts, deleteProduct })(
	AllProducts
);
