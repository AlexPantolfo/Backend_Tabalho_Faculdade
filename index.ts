import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes";
import * as dotenv from 'dotenv'
const cors = require('cors');
dotenv.config()
const app = express();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
//fazendo alterações pro vercel dar pull
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.7yvwjei.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }))
app.set("port", process.env.PORT || 3000);
app.use(routes);

app.listen(app.get("port"), () => {
    console.log(`Server on http://localhost:${app.get("port")}/`);
});