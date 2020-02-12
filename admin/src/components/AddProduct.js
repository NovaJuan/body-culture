import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../state/products/actions';
import axios from 'axios';

import VariationsHandler from './helpers/Variations';

const AddProduct = ({ history, getProducts }) => {
	const [error, setError] = useState(null);
	const [sending, setSending] = useState(false);
	const [data, setData] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		section: '',
		sex: '',
		photo: null,
		photoVal: ''
	});
	const [variations, setVariations] = useState([]);

	const onSubmit = async e => {
		e.preventDefault();
		setError(null);
		let variationsObj = {};

		if (!sending) {
			setSending(true);
			try {
				let formData = new FormData();
				let dataToSend = { ...data };
				delete dataToSend['photoVal'];

				for (let item in dataToSend) {
					if (!dataToSend[item]) {
						throw Error('Please, fill all needed (*) fields.');
					}

					formData.append(item, dataToSend[item]);
				}

				if (variations.length > 0) {
					variations.forEach(item => {
						if (item[0].length > 0 && item[1].length > 0) {
							variationsObj[item[0]] = item[1].split(';');
						}
					});
					console.log(variationsObj);
					if (Object.keys(variationsObj).length > 0) {
						formData.append('variations', JSON.stringify(variationsObj));
					}
				}

				await axios.post('/api/v1/products', formData);
				getProducts();
				history.push('/admin/products');
			} catch (err) {
				setSending(false);
				setError(err.response ? err.response.data.error : err.message);
			}
		}
	};

	const onChange = e => {
		if (!e.target.files) {
			setData({
				...data,
				[e.target.id]: e.target.value
			});
		} else {
			setData({
				...data,
				[e.target.id]: e.target.files[0],
				photoVal: e.target.value
			});
		}
	};

	const cleanData = e =>
		setData({
			name: '',
			description: '',
			price: '',
			category: '',
			section: '',
			sex: '',
			photo: null,
			photoVal: ''
		});

	return (
		<div className='container py-4'>
			<div className='row'>
				<div className='col-md-5 m-auto'>
					<div className='card card-body'>
						<h2 className='card-title text-center'>Add a product</h2>
						{error && <p className='text-center text-danger'>{error}</p>}
						<form onSubmit={onSubmit}>
							<div className='form-group'>
								<label htmlFor='name'>Name*:</label>
								<input
									value={data.name}
									type='text'
									onChange={onChange}
									id='name'
									className='form-control'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='description'>Description*:</label>
								<textarea
									value={data.description}
									onChange={onChange}
									id='description'
									className='form-control'
									rows='4'></textarea>
							</div>
							<div className='form-group'>
								<div className='row'>
									<div className='col-md-6'>
										<label htmlFor='price'>Price*:</label>
										<input
											value={data.price}
											type='number'
											onChange={onChange}
											id='price'
											className='form-control'
											step='0.01'
										/>
									</div>
									<div className='col-md-6'>
										<label htmlFor='sex'>Sex*:</label>
										<select
											value={data.sex}
											className='form-control'
											onChange={onChange}
											id='sex'>
											<option value=''>Select</option>
											<option value='Male'>Male</option>
											<option value='Female'>Female</option>
											<option value='Both'>Both</option>
										</select>
									</div>
								</div>
							</div>
							<div className='form-group'>
								<div className='row'>
									<div className='col-md-6'>
										<label htmlFor='section'>Section*:</label>
										<select
											value={data.section}
											className='form-control'
											onChange={onChange}
											id='section'>
											<option value=''>Select</option>
											<option value='Formal'>Formal</option>
											<option value='Casual'>Casual</option>
											<option value='Sport'>Sport</option>
											<option value='Everything'>Everything</option>
										</select>
									</div>
									<div className='col-md-6'>
										<label htmlFor='category'>Category*:</label>
										<select
											value={data.category}
											className='form-control'
											onChange={onChange}
											id='category'>
											<option value=''>Select</option>
											<option value='Shorts'>Shorts</option>
											<option value='Shirts, Tops, Blouses and T-Shirts'>
												Shirts, Tops, Blouses and T-Shirts
											</option>
											<option value='Pants and Trousers'>
												Pants and Trousers
											</option>
											<option value='Jackets and Coats'>
												Jackets and Coats
											</option>
											<option value='Skirts and Dresses'>
												Skirts and Dresses
											</option>
											<option value='Underwear'>Underwear</option>
											<option value='Shoes'>Shoes</option>
											<option value='Others'>Others</option>
										</select>
									</div>
								</div>
							</div>
							<div className='form-group'>
								<VariationsHandler
									variations={variations}
									setVariations={setVariations}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='photo'>Photo*:</label>
								<input
									value={data.photoVal}
									type='file'
									className='form-control-file'
									onChange={onChange}
									id='photo'
								/>
							</div>
							<button className='btn btn-success btn-block' disabled={sending}>
								{sending ? 'Creating...' : 'Create Product'}
							</button>
						</form>
						<button
							className=' mt-2 btn-sm btn btn-danger btn-block'
							onClick={cleanData}>
							Clean
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { getProducts })(AddProduct);
