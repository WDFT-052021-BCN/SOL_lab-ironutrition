import React, { useState, useEffect } from 'react';

function Search(props) {

	//Here you destructure the function to filter the array of the parent component you receive in props
	const { filterFood } = props;

	//This state will handle the input form
	const [input, setInput] = useState('');

	//This function will update the state based on the current input text
	const handleSearch = (event) => {
		const { value } = event.target;
		setInput(value);
	};

	//This effect hook will call the parent array filter function every time the input value is changed
	useEffect(() => filterFood(input), [input]);

	return (
		<div>
			<br />
			<input
				type='text'
				onChange={handleSearch}
				value={input}

				/* This two attributes are not mandatory */
				className='input custom'
				placeholder='search...'
			/>
			<br />
		</div>
	);
}

export default Search;
