import React, { useState } from 'react';
import api from '../api';

const EditRecipe = ({ recipe, onRecipeEdited }) => {
  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(', '));
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.nativeEvent.submitter.name === "Cancel") {
        onRecipeEdited(recipe);
        return;
    }

    const updatedRecipe = {
      ...recipe,
      name,
      ingredients: ingredients.split(',').map(item => item.trim()),
      description,
    };

    api.put(`recipes/edit/${recipe.id}/`, updatedRecipe)
      .then(response => {
        if (response.status === 200) {
          onRecipeEdited(updatedRecipe);
        }
      })
      .catch(error => {
        console.error('There was an error editing the recipe!', error);
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
      <button type="submit" name="Save">Save</button>
      <button type="submit" name="Cancel">Cancel</button>
    </form>
  );
};

export default EditRecipe;
