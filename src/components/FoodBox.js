import React, { useState } from 'react';

function FoodBox(props) {

	//Here we receive each single food object from the foods array and the function to add it into today's food array
	const { food, addFood } = props;

	//Here we descructure the values of the food item from props.food
	const { name, calories, image } = food;

	//This state will handle the quantity input value
	const [quantity, setQuantity] = useState(1);

	//This function will handle every change of number in the quantity input
	const handleChange = (event) => {
		const { value } = event.target;
		setQuantity(Number(value));
	};

	return (
		<div className='box'>
			<article className='media'>
				<div className='media-left'>
					<figure className='image is-64x64'>
						<img src={image} alt='' />
					</figure>
				</div>
				<div className='media-content'>
					<div className='content'>
						<p>
							<strong>{name}</strong> <br />
							<small>{calories} cal</small>
						</p>
					</div>
				</div>
				<div className='media-right'>
					<div className='field has-addons'>
						<div className='control'>
							<input
								onChange={handleChange}
								className='input'
								type='number'
								value={quantity}
							/>
						</div>
						<div className='control'>
							<button
								onClick={() =>
									addFood({
										...food,
										quantity: quantity
									})
								}
								className='button is-info'>
								+
							</button>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}

export default FoodBox;
