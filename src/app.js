const express = require("express");
const appConfig = require("./config/main-config.js");
const app = express();

const routeConfig = require("./config/route-config.js");
appConfig.init(app, express);
routeConfig.init(app);

module.exports = app;
