import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserID } from '../Hooks/useGetUserID.jsx';

const Saved = () => {

  const [savedRecipes, setSavedRecipes] = useState([]);

  let userID = useGetUserID();

  if (userID === null) {
    userID = "65ffee9462a30d065b80f9fc";
  }

  useEffect(() => {

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`https://recipe-application-hcbe.onrender.com/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSavedRecipes();
  }, []);


  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold m-12 text-center">Saved Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="border border-gray-300 rounded-md p-4 shadow-lg">
            <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-md" />
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{recipe.name}</h2>
            </div>
            <p className="text-gray-600 my-4">{recipe.instructions}</p>
            <p className="text-gray-900 font-semibold">Cooking Time: (in minutes) {recipe.cookingTime} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
