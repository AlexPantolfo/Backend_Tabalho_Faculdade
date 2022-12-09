import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes";
import * as dotenv from 'dotenv'
const cors = require('cors');
dotenv.config()
const app = express();
app.use(cors());

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.7yvwjei.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
mongoose.Promise = global.Promise;

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};
app.use(express.json());
app.use(allowCrossDomain);
app.options('*', cors());
app.set("port", process.env.PORT || 3000);
app.use(routes);

app.listen(app.get("port"), () => {
    console.log(`Server on http://localhost:${app.get("port")}/`);
});