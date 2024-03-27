import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { userRouter } from './Routes/users.js';

const app = express();
// Parsing Middleware
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(process.env.MONGODB_URL);

app.listen(5000, () => {
    console.log('App is listening to PORT 5000 & has been successfully connected to the databse!');
})
