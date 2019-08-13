"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express = require("express");
const express_session_1 = __importDefault(require("express-session"));
const bluebird_1 = __importDefault(require("bluebird"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const secrets_1 = require("./utils/secrets");
const homeController = __importStar(require("./controllers/home"));
const MongoStore = connect_mongo_1.default(express_session_1.default);
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config({ path: ".env" });
// Create a new express application instance
const app = express();
// Connect to MongoDB
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.Promise = bluebird_1.default;
console.log("MONGODB_URI: %o", secrets_1.MONGODB_URI);
mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log("MongoDB connected.");
}).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
// Express configuration
app.set("port", process.env.PORT || 3001);
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: secrets_1.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
/**
 * API examples routes.
 */
app.get("/", homeController.getUsages);
exports.default = app;
//# sourceMappingURL=app.js.map