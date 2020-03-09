import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BasicLoading from '../loading/BasicLoading';
import {
	reduceItem,
	addItem,
	removeItem,
	getCart
} from '../../state/products/actions';

const Cart = ({
	reduceItem,
	addItem,
	removeItem,
	getCart,
	cart,
	loading,
	error,
	history
}) => {
	useEffect(() => {
		getCart();
		// eslint-disable-next-line
	}, []);

	if (!loading && error) {
		return (
			<div className='container'>
				{error && <h2 className='error'>{error}</h2>}
			</div>
		);
	}

	if (!loading && cart !== null) {
		console.log(cart);
		return (
			<section className='cart'>
				<div className='container'>
					<h1 className='cart-title'>
						Your Cart <span>${cart.totalWithShipping / 100}</span>
					</h1>
					<div className='cart-wrapper'>
						<div className='cart-items'>
							{cart.items.map((item, i) => (
								<div className='cart-single-item' key={i}>
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
									<div className='item-options'>
										<div className='qty-handlers'>
											<button onClick={() => addItem(item.itemID)}>+</button>
											<span>{item.quantity}</span>
											<button onClick={() => reduceItem(item.itemID)}>-</button>
										</div>
										<button
											className='remove'
											onClick={() => removeItem(item.itemID)}>
											Delete
										</button>
									</div>
								</div>
							))}
						</div>
						<div className='cart-subtotal'>
							<p>Total: ${cart.totalPrice / 100}</p>
							<p>Shipping: ${cart.shipping / 100}</p>
							<p className='subtotal'>
								Subtotal: ${cart.totalWithShipping / 100}
							</p>
							<button onClick={() => history.push('/checkout')}>
								Checkout
							</button>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return <BasicLoading />;
};

const mapStateToProps = state => ({
	cart: state.products.cart,
	loading: state.products.loading,
	error: state.products.error
});

export default connect(mapStateToProps, {
	removeItem,
	addItem,
	reduceItem,
	getCart
})(Cart);
