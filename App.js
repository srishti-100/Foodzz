import React, { useEffect, useState } from 'react'
import './App.css';
import Recipe from './Recipe';

const App = () => {
const APP_ID = '6cb51abb';
const APP_KEY = '941102bc295e795943eb30ba9574c705';
const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState("chicken");
useEffect(() => {
	getRecipes();
}, [query])
const getRecipes = async () => {
	const response = await fetch
		(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
	const data = await response.json();
	setRecipes(data.hits);
	// console.log(data);

};
const updateSearch = e => {
	setSearch(e.target.value);
};
const getSearch = e => {
	e.preventDefault();
	setQuery(search);
	setSearch("");
}

return (
	<div className="App">
	<form className="search-form" onSubmit={getSearch} >
		<input className="search-bar" type="text" value={search}
			onChange={updateSearch} />
		<button className="search-button" type="submit" >
			Search
		</button>
	</form>
  <div className="row mx-3 mt-2" style={{border:'1px solid black'}}>
                {recipes.map((recipe) => {
                return <div className="col-md-4" style={{border:'1px solid black'}}>
                    <Recipe
                        key={recipe.recipe.label}
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                    />
                </div>
            })}

               
        </div >

	</div>
);
}

export default App;
