import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../state/products/actions';

const FiltersTab = ({ getProducts }) => {
	const [filters, setFilters] = useState({
		from: '',
		to: '',
		category: '',
		section: '',
		sex: ''
	});

	const onChange = e => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value
		});
	};

	const clearFilters = e => {
		e.preventDefault();
		setFilters({
			from: '',
			to: '',
			category: '',
			section: '',
			sex: '',
			search: ''
		});
		getProducts();
	};

	const onSubmit = e => {
		e.preventDefault();

		let query = Object.entries(filters).filter(item => item[1] !== '');
		query = Object.fromEntries(query);

		query = Object.entries(filters)
			.filter(item => item[1] !== '')
			.map(item => {
				if (item[0] === 'from' || item[0] === 'to') {
					return `${item[0]}=${item[1] * 100}`;
				}

				return item.join('=');
			})
			.join('&');

		getProducts(1, '/api/v1/products?limit=6&' + query);
	};

	return (
		<div className='filters-opts'>
			<form onSubmit={onSubmit}>
				<div className='filter-opt'>
					<p>Name</p>
					<input
						type='text'
						placeholder='Search'
						name='search'
						onChange={onChange}
						value={filters.search}
					/>
				</div>
				<div className='filter-opt'>
					<p>Price</p>
					<div className='filter-input-group'>
						<input
							type='number'
							placeholder='From'
							name='from'
							onChange={onChange}
							value={filters.from}
						/>
						<input
							type='number'
							placeholder='To'
							name='to'
							onChange={onChange}
							value={filters.to}
						/>
					</div>
				</div>
				<div className='filter-opt'>
					<p>Category</p>
					<select name='category' value={filters.category} onChange={onChange}>
						<option value=''>Select</option>
						<option value='Shorts'>Shorts</option>
						<option value='Shirts, Tops, Blouses and T-Shirts'>
							Shirts, Tops, Blouses and T-Shirts
						</option>
						<option value='Pants and Trousers'>Pants and Trousers</option>
						<option value='Jackets and Coats'>Jackets and Coats</option>
						<option value='Skirts and Dresses'>Skirts and Dresses</option>
						<option value='Underwear'>Underwear</option>
						<option value='Shoes'>Shoes</option>
						<option value='Others'>Others</option>
					</select>
				</div>
				<div className='filter-opt'>
					<p>Section</p>
					<select name='section' value={filters.section} onChange={onChange}>
						<option value=''>Select</option>
						<option value='Formal'>Formal</option>
						<option value='Casual'>Casual</option>
						<option value='Sport'>Sport</option>
						<option value='Everything'>Everything</option>
					</select>
				</div>
				<div className='filter-opt'>
					<p>Sex</p>
					<select name='sex' value={filters.sex} onChange={onChange}>
						<option value=''>Select</option>
						<option value='Male'>Male</option>
						<option value='Female'>Female</option>
					</select>
				</div>
			</form>
			<div className='filter-opt'>
				<div className='filter-input-group'>
					<button className='search-btn' onClick={onSubmit}>
						Search
					</button>
					<button className='clear-btn' onClick={clearFilters}>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { getProducts })(FiltersTab);
