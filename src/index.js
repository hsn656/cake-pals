const dotenv = require("dotenv");
const { logger } = require("./Logger");
dotenv.config();
const app = require("./app");
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    logger.info(`server is running on http://localhost:${port}`)
})