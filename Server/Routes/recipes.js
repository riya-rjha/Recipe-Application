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

router.put('/', async (request, response) => {
    try {
        const recipe = await RecipeModel.findById(request.body.recipeID);
        const user = await UserModel.findById(request.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        response.json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        response.json(error);
    }
})

// Get Saved Recipes By IDS
router.get('/savedRecipes/ids', async (req, res) => {
    try {
        const user = await UserModel.findById(re.body.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (error) {
        res.json(error);
    }
})

// Get Saved Recipes
router.get('/savedRecipes', async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
        });
        res.json({savedRecipes});
    } catch (error) {
        res.json(error);
    }
})

export { router as RecipesRouter }