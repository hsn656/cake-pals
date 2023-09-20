const express = require("express");
const cors = require("cors");
const correlation = require('express-correlation-id');
const morgan = require("morgan");

const router = require("./routes");
const apiErrorHandler = require("./error/api-error-handler");
const { logger } = require("./Logger");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(correlation());

app.use(
    morgan('tiny', {
        skip: (req) => req.method === 'OPTIONS' || req.url === '/health' || req.baseUrl === '/health',
        stream: {
            write: (message) => {
                logger.info(message.substring(0, message.lastIndexOf('\n')));
            }
        }
    })
);

app.use(router);
app.use(apiErrorHandler);

process.on('uncaughtException', (e) => {
    logger.error(e.message);
})

module.exports = app;

