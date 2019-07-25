import dotenv from "dotenv";
import express = require('express');

// Create a new express application instance
const app: express.Application = express();

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Express configuration
app.set("port", process.env.PORT || 3001);

export default app;