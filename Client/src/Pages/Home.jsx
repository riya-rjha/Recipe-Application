import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { userGetID } from '../Hooks/useGetUserID.jsx';

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    const userID = userGetID();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
        fetchSavedRecipes();
    }, []);

    const handleSaveRecipe = async (recipeId) => {
        try {
            const response = await axios.put('http://localhost:5000/recipes', { recipeId, userID });
            console.log(response);
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.log(error.message);
        }
    };

    const isRecipeSaved = (id) => {
        return savedRecipes?.includes(id);
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold m-12 text-center">Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="border border-gray-300 rounded-md p-4 shadow-lg">
                        <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-md" />
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">{recipe.name}</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => handleSaveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                            >
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}

                            </button>
                        </div>
                        <p className="text-gray-600 my-4">{recipe.instructions}</p>
                        <p className="text-gray-900 font-semibold">Cooking Time: (in minutes) {recipe.cookingTime} minutes</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
