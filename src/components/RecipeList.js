import React from 'react';
import api from '../api';

const RecipeList = ({ recipes, onDelete, onEdit }) => {
  const handleDelete = (id) => {
    api.delete(`recipes/delete/${id}/`)
      .then(response => {
        if (response.status === 204) {
          onDelete(id);
        }
      })
      .catch(error => {
        console.error('There was an error deleting the recipe!', error);
      });
  };

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <ul>
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
            <p>{recipe.description}</p>
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            <button onClick={() => onEdit(recipe)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
