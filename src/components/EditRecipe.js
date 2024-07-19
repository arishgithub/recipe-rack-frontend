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
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Recipe Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Comma-separated ingredients"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Recipe Description"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            name="Save"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Save
          </button>
          <button
            type="submit"
            name="Cancel"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
