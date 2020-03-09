import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setRedirection } from '../../state/auth/actions';
import { clearCart } from '../../state/products/actions';
import axios from 'axios';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe,
	StripeProvider,
	Elements
} from 'react-stripe-elements';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastSettings = {
	position: toast.POSITION.BOTTOM_RIGHT
};

const CheckoutForm = injectStripe(({ stripe, user, history, clearCart }) => {
	const [charging, setCharging] = useState(false);
	const [completed, setCompleted] = useState(false);

	const submit = async e => {
		e.preventDefault();

		if (!charging && !completed) {
			try {
				setCharging(true);

				const { token } = await stripe.createToken({
					name: user.name,
					email: user.email
				});

				if (!token) {
					throw new Error('Please set valid fields');
				}

				const { data } = await axios.post('/api/v1/checkout/stripe', {
					stripeToken: token.id
				});

				setCompleted(true);
				toast.success('Purchase completed!', toastSettings);
				setCharging(false);

				setTimeout(() => {
					clearCart();
					history.push(`/myaccount/order/${data.data.id}`);
				}, 3000);
			} catch (err) {
				console.log(err);
				if (err.hasOwnProperty('response')) {
					return toast.error(err.response.data.error, toastSettings);
				}

				toast.error(err.message, toastSettings);
				setCharging(false);
				setCompleted(false);
			}
		}
	};

	const handleChange = ({ error }) => {
		if (error) {
			toast.error(error.message, toastSettings);
		}
	};

	return (
		<form onSubmit={submit}>
			<div className='form-item'>
				Card Number
				<CardNumberElement
					{...createStyle()}
					onChange={handleChange}
					className='form-item-input'
				/>
			</div>
			<div className='form-item'>
				Expiration date
				<CardExpiryElement
					{...createStyle()}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			<div className='form-item'>
				CVC
				<CardCVCElement
					{...createStyle()}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			<button className='checkout-btn'>{charging ? 'Loading' : 'Pay'}</button>
		</form>
	);
});

const Checkout = ({ user, history, setRedirection, cart, clearCart }) => {
	useEffect(() => {
		if (!user) {
			setRedirection('/checkout');
			history.push('/login');
		}

		if (!cart) {
			history.push('/cart');
		}
	});

	return (
		<StripeProvider apiKey='pk_test_EXqLc8FY8HP36XX3Hl9Ud3iA001BFv7c2j'>
			<section className='checkout'>
				<div className='container'>
					<h2>Checkout</h2>
					<Elements>
						<CheckoutForm user={user} history={history} clearCart={clearCart} />
					</Elements>
				</div>
				<ToastContainer autoClose={2000} pauseOnFocusLoss={false} />
			</section>
		</StripeProvider>
	);
};

const createStyle = () => {
	return {
		style: {
			base: {
				fontSize: '16px',
				color: '#424770',
				fontFamily: 'Open Sans, sans-serif',
				letterSpacing: '0.025em',
				'::placeholder': {
					color: '#aab7c4'
				}
			},
			invalid: {
				color: '#c23d4b'
			}
		}
	};
};

const mapStateToProps = state => ({
	user: state.auth.user,
	cart: state.products.cart
});

export default connect(mapStateToProps, { setRedirection, clearCart })(
	Checkout
);
