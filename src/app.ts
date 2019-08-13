import dotenv from "dotenv";
import express = require("express");
import session from "express-session";
import bluebird from "bluebird";
import mongoose from "mongoose";
import mongo from "connect-mongo";
import { MONGODB_URI, SESSION_SECRET } from "./utils/secrets";

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
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));

export default app;