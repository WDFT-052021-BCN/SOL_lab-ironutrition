import React, { useState, useEffect } from 'react';

//Import components
import FoodBox from './FoodBox';
import FoodForm from './FoodForm';
import Search from './Search';

//Import all food data from json file
import allFoods from '../foods.json';

//This component will hold all the information and logic
function Foods() {
	//This state will hold the array of foods
	const [foods, setFoods] = useState(allFoods);

	//This state will decide whether to show or hide the form
	const [showOrHideForm, setShowOrHideForm] = useState(false);

	//This state will hold today's food (right column)
	const [todayFood, setTodayFood] = useState([]);

	//This state will hold the total calories of today's foods
	const [totalCalories, setTotalCalories] = useState(0);

	//This function changes the value to show or hide the form
	const showForm = () => {
		setShowOrHideForm(!showOrHideForm);
	};

	//This function is the one filtering the array of foods in the searchbar
	const filterFood = (input) => {

		const filtered = allFoods.filter((el) =>
			el.name.toLowerCase().includes(input.toLowerCase())
		);
		
		setFoods(filtered);
	};

	//This function is responsible for adding new foods to the state through the form
	const pushFood = (food) => {

		const foodsCopy = [...foods];
		
		foodsCopy.unshift(food);
		
		setFoods(foodsCopy);
		
		setShowOrHideForm(false);
	};

	//This function adds a food to today's foods aray
	const addFood = (food) => {
		//Make a copy of the original array
		let today = [...todayFood];

		//Check if the added item is already in the array
		let found = today.find((el) => el.name === food.name);

		//Update calories
		food.calories *= food.quantity;

		//If the item is in the array, update it
		if (found) {
			found.quantity += food.quantity;
			found.calories += food.calories;
		} else {
			//If it's not in the array, add it
			today.push(food);
		}

		setTodayFood(today);
	};

	//This effect hook will update the value of the total calories
	useEffect(
		() =>
			setTotalCalories(todayFood.reduce((acc, val) => acc + val.calories, 0)),
		[todayFood]
	);

	//This function clears the today's food content (array and calories)
	const clearToday = () => {
		setTodayFood([]);
		setTotalCalories(0);
	};

	return (
		<div>
			<h1>IronNutritrion</h1>
			<br />

			{/* Component responsible for searching, receives to function to filter the array */}
			<Search filterFood={filterFood} />

			<br />

			{/* Button with the function to show or hide the form */}
			<button className='button is-info' onClick={showForm}>
				Add Food
			</button>
			<br />

			{/* Only show the form is the state is true. The form receives the function to add food */}
			{showOrHideForm && <FoodForm pushFood={pushFood} />}

			<br />
			<div>
				<div style={{ width: '70%', float: 'left' }}>
					{/* Render a food box for every element in the array and send them the function to add foods to today's food */}
					{foods.map((el) => (
						<FoodBox key={el.name} food={el} addFood={addFood} />
					))}
				</div>

				<div style={{ width: '30%', float: 'right' }}>
					<h2>Today's food</h2>
					<ul>
						{/* Render a list item for every element in the array  */}
						{todayFood.map((el) => {
							return (
								<li key={el.name}>
									{el.quantity} {el.name} = {el.calories} cal
								</li>
							);
						})}

						{/* Show total calories */}
						<p>Total: {totalCalories} calories</p>
					</ul>
					<button className='button is-info' onClick={clearToday}>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
}

export default Foods;
