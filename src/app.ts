import dotenv from "dotenv";
import express = require("express");
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import bluebird from "bluebird";
import lusca from "lusca";
import passport from "passport";
import flash from "express-flash";
import mongoose from "mongoose";
import mongo from "connect-mongo";
import { MONGODB_URI, SESSION_SECRET } from "./utils/secrets";


import * as userController from "./controllers/user";
import * as homeController from "./controllers/home";

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create a new express application instance
const app: express.Application = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

console.log("MONGODB_URI: %o", MONGODB_URI);

mongoose.connect(mongoUrl, { useNewUrlParser: true} ).then(
    () => { 
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log("MongoDB connected.");
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3001);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    } else if (req.user &&
    req.path == "/account") {
        req.session.returnTo = req.path;
    }
    next();
});

/**
 * API examples routes.
 */

app.get("/", homeController.getUsages);
app.post("/signup", userController.postSignup);

export default app;