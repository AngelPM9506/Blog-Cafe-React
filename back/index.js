const app = require("./src");
const { conn } = require("./src/db");
const { defaultRolles } = require("./src/Utils/defaulValsDB");
const { PORT } = require('dotenv').config().parsed;


conn.sync({ alter: true }).then(async () => {
    await defaultRolles();
    console.log('Ready connection to database, init deploy ofserver');
    app.listen(PORT, () => console.log(`[API-BLOG-COFFE] listenig at htt://127.0.0.1:${PORT}`));
});

/**
["Quimica","Nanotecnologia","Fisica Moderna", "Biologia"]
post ejemplo para creear: 
{
    "title": "Sintesis de nanoparticuas",
    "content": "Una particula se cuncidera nanometrica cuando esta dentro del rango de 0 - 100nm en cualquiera de sus tres dimenciones, credas por metodos como top-down, botom-up, e incluso ciertos organismos puden genear nano particulas o nano estructuras de forma natural",
    "categories": [
        "Quimica",
        "Nanotecnologia",
        "Fisica Moderna",
        "Biologia"
    ]
}
 */