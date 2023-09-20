const mongoose = require("mongoose");

const { logger } = require("./Logger");
const app = require("./app");
const config = require("./config");

const port = config.app.port;

mongoose.connect(config.db.url).then(()=>{
    logger.info("DB connected successfully");
    app.listen(port,()=>{
        logger.info(`server is running on http://localhost:${port}`);
    })
}).catch(error=>{
    logger.error('failed to connect to DB');
    logger.error(error);
})
