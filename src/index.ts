import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const app = express();

const uri = "mongodb+srv://alex:AFwHgntHcyoaavbL@cluster0.7yvwjei.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(routes);

app.listen(3000);
