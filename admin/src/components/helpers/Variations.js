import React, { Fragment } from 'react';

const Variations = ({ variations, setVariations }) => {
	const addVariation = () => {
		setVariations([...variations, ['', '']]);
	};

	const deleteVariation = i => {
		if (i > -1) {
			const newVariations = variations.filter((item, index) => index !== i);
			setVariations(newVariations);
		}
	};

	const changeName = e => {
		const index = parseInt(e.target.name);
		let newVariation = variations[index];
		newVariation[0] = e.target.value;
		setVariations(
			variations.map((item, i) => {
				if (index === i) {
					return newVariation;
				}

				return item;
			})
		);
	};

	const changeValues = e => {
		const index = parseInt(e.target.name);
		let newVariation = variations[index];
		newVariation[1] = e.target.value;
		setVariations(
			variations.map((item, i) => {
				if (index === i) {
					return newVariation;
				}

				return item;
			})
		);
	};

	return (
		<Fragment>
			<label>
				Variations(optional):
				<a
					href='#!'
					className='btn btn-sm btn-primary ml-1'
					onClick={addVariation}>
					+
				</a>
			</label>
			{variations.map((item, i) => (
				<div className='variation mb-1' key={i}>
					<div>
						<input
							value={item[0]}
							type='text'
							className='form-control'
							placeholder='Variation'
							name={i}
							onChange={changeName}
						/>
					</div>
					<div>
						<input
							value={item[1]}
							type='text'
							className='form-control'
							placeholder='Values: 1;2;3'
							name={i}
							onChange={changeValues}
						/>
					</div>
					<div>
						<button
							className='btn btn-danger btn-sm'
							onClick={e => deleteVariation(i)}>
							<i className='fas fa-trash'></i>
						</button>
					</div>
				</div>
			))}
		</Fragment>
	);
};

export default Variations;
