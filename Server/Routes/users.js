import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../Models/users.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "User already exists!" });
    }
    else {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPwd });
        await newUser.save();
    }
    res.json({ message: "User registered successfully!" });
})

router.post("/login", (req, res) => {

})

export { router as userRouter };