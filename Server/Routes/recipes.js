import { RecipeModel } from "../Models/recipes.js";
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const recipes = await RecipeModel.find({});
        response.json(recipes);
    } catch (error) {
        response.json(error);
    }
});

router.post('/', async (request, response) => {
    const newRecipe = new RecipeModel(request.body);
    try {
        const resp = await newRecipe.save();
        response.json(resp);
    } catch (error) {
        response.json(error);
    }
});


export { router as RecipesRouter }