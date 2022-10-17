import app from "./src";
import dotenv from "dotenv";
import { conn } from "./src/db";
import { defaultValues } from "./src/utils/defaultValues";
dotenv.config();

const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
    defaultValues();
    app.listen(PORT, () => {
        console.log(`[API-BLOG-COFFE] listenig at htt://127.0.0.1:${PORT}`);
    });
});
