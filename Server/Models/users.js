import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    savedRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipes"
        }
    ]
});

export const UserModel = mongoose.model('users', userSchema);