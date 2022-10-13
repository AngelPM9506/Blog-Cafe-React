import server from './src/server';
import database from './src/database';
const { PORT } = require('dotenv').config().parsed


database.conn.sync({ force: true }).then(async function () {
    server.listen(PORT, () => {
        console.log(`[server]: Server is Runing at htts://127.0.0.1:${PORT}`);
    });
})

