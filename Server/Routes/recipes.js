import { RecipeModel } from "../Models/recipes.js";
import { UserModel } from "../Models/users.js";
import express from 'express';

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

// Save a Recipe
router.put("/", async (req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });

        console.log(savedRecipes);
        res.status(201).json({ savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
export { router as RecipesRouter }