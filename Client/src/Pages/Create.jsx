import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetUserID } from '../Hooks/useGetUserID.jsx';

const CreateRecipe = () => {

    const userID = useGetUserID();

    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [],
        instructions: '',
        imageUrl: '',
        cookingTime: 0,
        userOwner: userID
    });


    const handleChange = (event) => {
        const { name, value } = event.target; // access name and value of the occurring event
        setRecipe({ ...recipe, [name]: value }); // set the previous recipe state's recipe's name with user's entered new value
    }


    const addIngredients = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] }); // updates the previous recipe state
        // ingredients with an empty string
        // making it possible to store as many ingredients as possible
    }


    const handleIngredientChange = (event, index) => {
        const value = event.target.value; // user's entered value
        // const {value} = evetn.target; (Alternative)
        const ingredients = recipe.ingredients; // get the previous array of ingredients from recipe state
        ingredients[index] = value; // store the user entered ingredient at the index of array
        setRecipe({ ...recipe, ingredients: ingredients }); // set the previous state of recipe with new ingredients
    }


    const submitRecipe = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://recipe-application-hcbe.onrender.com/recipes', recipe);
            toast.success('Recipe Created Successfully 😄');
        } catch (error) {
            console.log(error.message);
            toast.error('Recipe could not be created 😢')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Create Recipe</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="ingredients" className="block text-gray-700 mb-2">Ingredients</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <input
                            key={index}
                            className="w-full px-3 py-2 border rounded-md
                             focus:outline-none focus:border-blue-500 mt-3"
                            type='text'
                            name='ingredients'
                            value={ingredient}
                            onChange={(event) => handleIngredientChange(event, index)}
                        />
                    ))}
                    <button
                        type='button'
                        onClick={addIngredients}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-5"
                    >Add Ingredients</button>
                </div>
                <div className="mb-4">
                    <label htmlFor="instructions" className="block text-gray-700 mb-2">Instructions</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 mb-2">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cookingTime" className="block text-gray-700 mb-2">Cooking Time</label>
                    <input
                        type="number"
                        id="cookingTime"
                        name="cookingTime"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    onClick={(e) => submitRecipe(e)}
                >Create Recipe</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateRecipe;
