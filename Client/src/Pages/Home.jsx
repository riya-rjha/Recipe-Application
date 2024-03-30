import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserID } from '../Hooks/useGetUserID.jsx';

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    let userID = useGetUserID();

    if(userID === null){
        userID = "65ffee9462a30d065b80f9fc";
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("https://recipe-application-hcbe.onrender.com/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(
                    `https://recipe-application-hcbe.onrender.com/recipes/savedRecipes/ids/${userID}`
                );
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipes();
        fetchSavedRecipes();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("https://recipe-application-hcbe.onrender.com/recipes", {
                recipeID,
                userID,
            });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold m-12 text-center">Recipes</h1>
            {!userID ?
                (<p className='text-2xl font-semibold my-8 text-center text-[#4b0097]'>Login or Register to create your own recipes and save them for later!</p>)
                :
                (<p></p>)
            }

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
                {recipes.map((recipe) => (
                    <li key={recipe._id} className="border border-gray-300 rounded-md p-4 shadow-lg">
                        <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-md" />
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">{recipe.name}</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                            >
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}

                            </button>
                        </div>
                        <p className="text-gray-600 my-4">{recipe.instructions}</p>
                        <p className="text-gray-900 font-semibold">Cooking Time: (in minutes) {recipe.cookingTime} minutes</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
