"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const app_1 = __importDefault(require("./app"));
/**
 * Error Handler. Used for devs, will be removed for production
 */
app_1.default.use(errorhandler_1.default());
/**
 * Start Express server.
 */
app_1.default.listen(app_1.default.get("port"), function () {
    console.log("App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("Press CTRL-C to stop\n");
});
//# sourceMappingURL=server.js.map