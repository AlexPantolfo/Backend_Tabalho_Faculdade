import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes";
import * as dotenv from 'dotenv'

dotenv.config()
const app = express();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.7yvwjei.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(routes);

app.listen(3000);