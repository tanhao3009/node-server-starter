"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
/**
 * Start Express server.
 */
app_1.default.listen(3001, function () {
    console.log("App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("Press CTRL-C to stop\n");
});
/**
 * API examples routes.
 */
app_1.default.get('/', function (req, res) {
    res.send('Hello, World!');
});
