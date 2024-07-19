import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
