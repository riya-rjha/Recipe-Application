import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../Models/users.js';
import 'dotenv/config';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "User already exists!" });
    }
    else {
        const hashedPwd = await bcrypt.hash(password, 10); // 10 represents number of rounds in hashing process
        const newUser = new UserModel({ username, password: hashedPwd });
        await newUser.save();
    }
    res.json({ message: "User registered successfully!" });
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.json({ message: "No such credentials exist!" });
    }

    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid) {
        return res.json({ message: "The password is incorrect!" });
    }

    // JWT - Creates a token of payload (identification data) & secret key
    // Secret Key is used by servers
    // Token is returned to client for future use along with user id
    const token = jwt.sign({ id: user._id }, process.env.JWT_secret);
    res.json({ token, userID: user._id });
    // _id from database
})

export { router as userRouter };