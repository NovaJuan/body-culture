import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../state/products/actions';

import FiltersTab from '../layout/FiltersTab';
import ProductsListItem from './ProductsListItem';
import BasicLoading from '../loading/BasicLoading';

const ProductsList = ({
	getProducts,
	loading,
	products,
	count,
	pagination,
	error,
	url,
	history
}) => {
	useEffect(() => {
		if (products === null) {
			getProducts();
		}
		// eslint-disable-next-line
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

	let content = null;
	let pageBtns = null;

	if (!loading && products !== null) {
		pageBtns = (
			<Fragment>
				<p className=' pagination'>
					{pagination.prev && (
						<button onClick={prevPage} className='pagination-btn'>
							Prev
						</button>
					)}
					<strong>{pagination.current.page}</strong>
					{pagination.next && (
						<button onClick={nextPage} className='pagination-btn'>
							Next
						</button>
					)}
				</p>
			</Fragment>
		);

		content =
			products.length > 0 ? (
				<Fragment>
					<div className='products-grid'>
						{products.map(product => (
							<ProductsListItem
								product={product}
								key={product._id}
								history={history}
							/>
						))}
					</div>
					{pageBtns}
				</Fragment>
			) : (
				<Fragment>
					<p className='error'>No products found</p>
				</Fragment>
			);
	} else {
		content = <BasicLoading />;
	}

	return (
		<Fragment>
			<main className='store'>
				<section className='products'>
					<div className='container'>
						<div className='store-grid'>
							<div className='filters-form'>
								<h2>Filters</h2>
								<FiltersTab />
							</div>
							<div className='products-area'>
								<span className='top-of-products'>
									{pageBtns}
									{!loading && products !== null ? (
										<button id='open-filters'>
											<img src='icons/arrow-left.svg' alt='' /> Filters
										</button>
									) : null}
								</span>
								{content}
							</div>
						</div>
					</div>
				</section>
			</main>
			<aside id='filters'>
				<div className='filters-head'>
					<h3 className='brand'>Filters</h3>
					<button id='close-filters'>
						<img src='icons/x.svg' alt='' />
					</button>
				</div>
				<FiltersTab />
			</aside>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	loading: state.products.loading,
	products: state.products.products,
	count: state.products.count,
	pagination: state.products.pagination,
	error: state.products.error,
	url: state.products.url
});
export default connect(mapStateToProps, { getProducts })(ProductsList);
