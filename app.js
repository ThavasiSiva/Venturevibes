const express = require('express');
const APP_SERVER = express();

APP_SERVER.use("/api",require("./Routes/categorymasterroute"));
APP_SERVER.use("/api",require("./Routes/placemasterroute"));
APP_SERVER.use("/api",require("./Routes/citymasterroute"));



module.exports = APP_SERVER;