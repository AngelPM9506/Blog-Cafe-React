const app = require("./src");
const { conn } = require("./src/db");
const { PORT } = require('dotenv').config().parsed;


conn.sync({ alter: true }).then(() => {
    console.log('Ready connection to database, init deploy ofserver');
    app.listen(PORT, () => console.log(`[API-BLOG-COFFE] listenig at htt://127.0.0.1:${PORT}`));
});