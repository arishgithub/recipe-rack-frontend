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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Recipes</h1>
            <ul className="space-y-4">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="border rounded-lg shadow-md p-4 bg-white">
                        <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                        <ul className="list-disc list-inside mb-2">
                            {recipe.ingredients.map((ingredient, idx) => (
                                <li key={idx} className="text-gray-700">{ingredient}</li>
                            ))}
                        </ul>
                        <p className="text-gray-700 mb-4">{recipe.description}</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleDelete(recipe.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => onEdit(recipe)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
