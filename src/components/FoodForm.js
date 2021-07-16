import React, { useState } from 'react';

export default function FoodForm(props) {
	//Here you destructure the function to add items to the array of the parent component you receive in props
	const { pushFood } = props;

	//Set the initial form state for the starting state and after you sent data
	const initialFormState = {
		foodName: '',
		foodImg: '',
		calories: 0
	};

	//This state will hold the form data
	const [formData, setFormData] = useState(initialFormState);

	//This function will update the state for every change in the form
	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log('name', name);
		console.log('value', value);

		setFormData({
			...formData,
			[name]: value
		});
	};

	//This function is responsible for extracting the form values, creating a new item objet and call the parent function to add the object to the parent's array of items. After that, we reset the form fields
	const handleSubmit = (event) => {

		event.preventDefault();
		
		const { foodName, foodImg, calories } = formData;

		pushFood(
			{
			name: foodName,
			calories,
			image: foodImg
			}
		);

		setFormData(initialFormState);
	};

	return (
		<form onSubmit={handleSubmit}>
			<br />
			<input
				className='input custom'
				onChange={handleChange}
				name='foodName'
				type='text'
				value={formData.foodName}
				placeholder='tomato'
			/>
			<br />
			<input
				className='input custom'
				onChange={handleChange}
				type='number'
				name='calories'
				min={0}
				value={formData.calories}
			/>
			<br />
			<input
				className='input custom'
				onChange={handleChange}
				name='foodImg'
				type='text'
				value={formData.foodImg}
				placeholder='https://i.imgur.com/5ktcSzF.jpg'
			/>
			<br />
			<button className='button' type='submit'>
				Add
			</button>
		</form>
	);
}
