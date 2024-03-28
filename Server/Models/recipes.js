import mongoose from 'mongoose';
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [
        {
            type: String,
            required: true
        },
    ],
    instructions: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId, // ObjectId provided by Mongoose(MongoDB)
        ref: "users",
        required: true,
    },
});

export const RecipeModel = mongoose.model('recipes', RecipeSchema);