import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Used for devs, will be removed for production
 */

app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), function() {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("Press CTRL-C to stop\n");
});