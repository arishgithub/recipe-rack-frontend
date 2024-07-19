import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import api from './api';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

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

  const handleRecipeDeleted = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  const handleRecipeEdited = (updatedRecipe) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ));
    setEditingRecipe(null);
  };

  const startEditing = (recipe) => {
    setEditingRecipe(recipe);
  };

  return (
    <div className='App'>
      <h1>Recipe App</h1>
      {editingRecipe ? (
        <EditRecipe recipe={editingRecipe} onRecipeEdited={handleRecipeEdited} />
      ) : (
        <AddRecipe onRecipeAdded={handleRecipeAdded} />
      )}
      <RecipeList recipes={recipes} onDelete={handleRecipeDeleted} onEdit={startEditing} />
    </div>
  );
};

export default App;
