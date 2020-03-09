import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BasicLoading from '../loading/BasicLoading';
import { getSingle, addToCart } from '../../state/products/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const toastSettings = {
	position: toast.POSITION.BOTTOM_RIGHT
};

const ProductPage = ({
	history,
	match: {
		params: { id }
	},
	current,
	loading,
	error,
	getSingle,
	addToCart
}) => {
	const [options, setOptions] = useState(null);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		getSingle(id);
		// eslint-disable-next-line
	}, []);

	const sendToCart = async () => {
		if (current.variations) {
			const values = Object.values(options);
			let allFilled = true;

			values.forEach(value => {
				if (!value) {
					allFilled = false;
				}
			});

			if (!allFilled) {
				return toast.error('Please set all your options...', toastSettings);
			}

			const response = await addToCart({
				productID: current._id,
				variations: options,
				quantity
			});

			if (response) {
				return toast.error(`Error: ${response}`, toastSettings);
			}
			return toast.success(`Item added to cart`, toastSettings);
		} else {
			const response = await addToCart({ productID: current._id, quantity });
			if (response) {
				return toast.error(`Error: ${response}`, toastSettings);
			}
			return toast.success(`Item added to cart`, toastSettings);
		}
	};

	if (error) {
		return (
			<div className='container'>
				<h3 className='error'>Error: {error}</h3>
			</div>
		);
	}

	if (!loading && current !== null) {
		let variations = null;
		if (current.variations) {
			const keys = Object.keys(current.variations);
			const values = Object.values(current.variations);

			// Set options to state
			variations = {};
			keys.forEach(key => {
				variations[key] = '';
			});
			if (options === null) {
				setOptions({ ...variations });
			}

			// Create HTML
			variations = keys.map((key, i) => (
				<p key={i}>
					{key.toUpperCase()}
					<select
						name={key}
						onChange={e =>
							setOptions({ ...options, [e.target.name]: e.target.value })
						}>
						<option value=''>Select</option>
						{values[i].map(value => (
							<option value={value} key={value}>
								{value}
							</option>
						))}
					</select>
				</p>
			));
		}

		return (
			<main className='product-page'>
				<div className='container'>
					<div className='product-page-wrapper'>
						<Link className='go-back-btn' to='/store'>
							Go Back
						</Link>
						<div className='product-page-grid'>
							<div
								className='product-page-image'
								style={{
									backgroundImage: `url(https://res.cloudinary.com/dnchnxwkl/image/upload/w_1000,c_fill/${current.photo_id})`
								}}></div>
							<div className='product-page-content'>
								<h1>{current.name}</h1>
								{current.discountPrice ? (
									<p className='product-price'>
										<span>{current.price / 100}$</span>
										{current.discountPrice / 100}$
									</p>
								) : (
									<p className='product-price'>{current.price / 100}$</p>
								)}
								<div className='product-page-variations'>
									{variations && variations}
									<p>
										Quantity
										<input
											type='number'
											name='quantity'
											value={quantity}
											onChange={e => setQuantity(e.target.value)}
										/>
									</p>
								</div>
								<button className='add-to-cart-btn' onClick={sendToCart}>
									Add To Cart
								</button>
							</div>
						</div>
						<div className='product-page-description'>
							<h4>Description</h4>
							<p>{current.description}</p>
						</div>
					</div>
				</div>
				<ToastContainer
					autoClose={2000}
					pauseOnFocusLoss={false}
					onClick={() => history.push('/cart')}
				/>
			</main>
		);
	}

	return (
		<div className='container'>
			<BasicLoading />
		</div>
	);
};

const mapStateToProps = state => ({
	current: state.products.current,
	loading: state.products.loading,
	error: state.products.error
});

export default connect(mapStateToProps, { getSingle, addToCart })(ProductPage);
