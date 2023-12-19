const express = require("express");
const mariadb = require("mariadb");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.DB_PORT || 3001;

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
});


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello la Team!");
});

app.get("/utilisateurs", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("SELECT * FROM utilisateur");
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
    }
});

app.post("/utilisateurs", async (req, res) => {
  let conn;
  try {
    bcrypt
      .hash(req.body.mdp, 10)
      .then(async (hash) => {
        console.log("lancement de la requete POST");
        conn = await pool.getConnection();
        console.log("lancement de la POST");
        console.log(req.body);
        let requete =
          "INSERT INTO utilisateur (pseudo, mdp) VALUES (?, ?)";
        let rows = await conn.query(requete, [req.body.pseudo, hash]);
        console.log(rows);
        res.status(200).json("L'ajout d'utilisateur a bien été effectué");
      })
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () =>
  console.log(`Le serveur écoute sur : http://localhost:${port}`)
);
