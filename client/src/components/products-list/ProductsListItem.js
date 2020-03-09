import React from 'react';

const ProductListItem = ({ history, product, classes }) => {
	const goToPage = e => {
		history.push(
			`/product/${product.name.replace(/ /g, '+').replace(/\//g, '&frasl;')}/${
				product.id
			}`
		);
	};

	return (
		<div
			className={`product-list-item ${classes ? classes : ''}`}
			onClick={goToPage}>
			<div
				className='product-image'
				style={{
					backgroundImage: `url(${'https://res.cloudinary.com/dnchnxwkl/image/upload/h_400/' +
						product.photo_id})`
				}}></div>
			<div className='product-text'>
				<h4 className='product-title'>{product.name}</h4>
				{product.discountPrice ? (
					<p className='product-price'>
						<span> {product.price / 100}$ </span>
						{product.discountPrice / 100}$
					</p>
				) : (
					<p className='product-price'> {product.price / 100}$ </p>
				)}
			</div>
		</div>
	);
};

export default ProductListItem;
