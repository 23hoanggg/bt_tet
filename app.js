import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userController } from "./controller/user.controller.js";
import { authController } from "./controller/auth.controller.js";
import { postController } from "./controller/post.controller.js";

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());

app.use('/users',userController);
app.use('/auth',authController);
app.use('/post', postController);
app.use('/index', (req, res) =>{
    res.send('Welcome to the API');
});

mongoose.connect(process.env.MONGODB)
    .then(() => console.log('Connected to MongoDB!'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});