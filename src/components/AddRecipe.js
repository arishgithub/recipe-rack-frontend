import React, { useState } from 'react';
import api from '../api';

const AddRecipe = ({ onRecipeAdded }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      name,
      ingredients: ingredients.split(',').map(item => item.trim()),
      description,
    };

    api.post('recipes/add/', newRecipe)
      .then(response => {
        if (response.status === 201) {
          onRecipeAdded(response.data);
          setName('');
          setIngredients('');
          setDescription('');
        }
      })
      .catch(error => {
        console.error('There was an error adding the recipe!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Ingredients</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
