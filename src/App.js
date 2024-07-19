import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import api from './api';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get('recipes/')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the recipes!', error);
      });
  }, []);

  const handleRecipeAdded = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <div className='App'>
      <h1>Recipe App</h1>
      <RecipeList recipes={recipes} />
      <AddRecipe onRecipeAdded={handleRecipeAdded} />
    </div>
  );
};

export default App;
