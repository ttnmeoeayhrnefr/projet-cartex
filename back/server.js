const express = require("express");
const mariadb = require("mariadb");
const bcrypt = require('bcryptjs');
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
});

app.use(express.json());
app.use(cors());

//CRUD Carte
app.get('/', (req, res) => {
    res.json('Hello la Team!');
});

app.get('/cartes', async (req, res) => {
    let conn;
    try {
        console.log('Lancement de la connexion');
        conn = await pool.getConnection();
        console.log('Lancement de la requête');
        const rows = await conn.query('SELECT * FROM carte');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch (err) {
        console.log(err);
    }
})


app.listen(port, () => console.log(`Le serveur écoute sur : http://localhost:${port}`));
