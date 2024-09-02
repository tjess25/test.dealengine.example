require('dotenv').config();
require('module-alias/register');

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require('http');
const app = express();
const apiRoutes = require("@/routes");
const errorHandler = require("@/middleware/errorHandler");
const PORT =  process.env.PORT || 9001;


const corsOptions={ credentials: true, origin: ['http://localhost','http://localhost:3000','http://localhost:3000', process.env.CORS_FRONT_DOMAIN], exposedHeaders: ["set-cookie"]}

//db.connect();

app.use(cors(corsOptions));
//app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", apiRoutes);
app.use(errorHandler);

httpServer = http.createServer(app) 

httpServer.listen(PORT, () => {
    console.log("APP Listening in port: ", PORT);
});

module.exports = app;
