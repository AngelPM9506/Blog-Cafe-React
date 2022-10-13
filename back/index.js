const app = require("./src");
const { PORT } = require('dotenv').config().parsed;

app.listen(PORT, () => console.log(`[API-BLOG-COFFE] listenig at htt://127.0.0.1:${PORT}`));