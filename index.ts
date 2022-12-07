import express from "express";
import cors from "cors";
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

app.use(cors())
app.use(express.json());
app.set("port", process.env.PORT || 3000);
app.use(routes);

app.listen(app.get("port"), () => {
    console.log(`Server on http://localhost:${app.get("port")}/`);
});