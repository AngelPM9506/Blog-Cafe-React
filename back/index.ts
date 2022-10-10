import server from './src/server';
const { PORT } = require('dotenv').config().parsed

server.listen(PORT, () => {
    console.log(`[server]: Server is Runing at htts://127.0.0.1:${PORT}`);
});

