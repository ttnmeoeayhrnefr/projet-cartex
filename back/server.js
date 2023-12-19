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

const saveCardDataToDatabase = async (cardData) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO Carte (nom, image, image_small, image_cropped, id_carte, description, type, race, attaque, defense, etoiles, archetype, attribut, cardmarket_price, tcgplayer_price, ebay_price, amazon_price, set_nom, set_rareté) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        cardData.name,
        cardData.card_images[0].image_url,
        cardData.card_images[0].image_url_small,
        cardData.card_images[0].image_url_cropped,
        cardData.id,
        cardData.desc,
        cardData.type,
        cardData.race,
        cardData.atk,
        cardData.def,
        cardData.level,
        cardData.archetype,
        cardData.attribute,
        cardData.card_prices[0].cardmarket_price,
        cardData.card_prices[0].tcgplayer_price,
        cardData.card_prices[0].ebay_price,
        cardData.card_prices[0].amazon_price,
        cardData.card_sets[0].set_name,
        cardData.card_sets[0].set_rarity,
      ]
    );

    return result.insertId.toString();
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.end();
  }
};

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello la Team!");
});

app.post("/addCard", async (req, res) => {
  const cardData = req.body;

  try {
    const insertedCardId = await saveCardDataToDatabase(cardData);
    res.status(201).json({ insertedCardId });
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout de la carte à la base de données : ",
      error
    );
    res.status(500).json({ error: "Erreur Serveur" });
  }
});

// CRUD UTILISATEUR
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
        let requete = "INSERT INTO utilisateur (pseudo, mdp) VALUES (?, ?)";
        let rows = await conn.query(requete, [req.body.pseudo, hash]);
        console.log(rows);
        res.status(200).json("L'ajout d'utilisateur a bien été effectué");
      })
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    console.log(err);
  }
});

app.get("/utilisateurs", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query("select * from utilisateurs");
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/utilisateurs/:id", async (req, res) => {
  let conn;
  try {
    console.log("lancement de la console");
    conn = await pool.getConnection();
    console.log("lancement de la requête");
    const rows = await conn.query(
      "select * from utilisateurs where id_utilisateur = ?",
      [req.params.id]
    );
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/utilisateurs/nom/:nom", async (req, res) => {
  let conn;
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    const rows = await conn.query(
      "select * from utilisateurs where nom_utilisateur = ?",
      [req.params.nom]
    );
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.put("/utilisateurs/:nom", async (req, res) => {
  let conn;
  try {
    bcrypt
      .hash(req.body.mot_de_passe, 10)
      .then(async (hash) => {
        console.log("lancement de la console");
        conn = await pool.getConnection();
        console.log("lancement de la requête");
        const rows = await conn.query(
          "update utilisateurs set nom_utilisateur = ?, email = ?, mot_de_passe = ? where nom_utilisateur = ?",
          [req.body.nom_utilisateur, req.body.email, hash, req.params.nom]
        );
        console.log(rows);
        res.status(200).json("La modification a bien été effectuée");
      })
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    console.log(err);
  }
});

app.delete("/utilisateurs/:id", async (req, res) => {
  let conn;
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    const rows = await conn.query(
      "delete from utilisateurs where id_utilisateur = ?",
      [req.params.id]
    );
    console.log(rows);
    res.status(200).json("La suppression a bien été effectuée");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/utilisateurs/nom/:nom", async (req, res) => {
  let conn;
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    const rows = await conn.query(
      "delete from utilisateurs where nom_utilisateur = ?",
      [req.params.nom]
    );
    console.log(rows);
    res.status(200).json("La suppression a bien été effectuée");
  } catch (err) {
    console.log(err);
    res.status(500).json("Erreur lors de la suppression");
  }
});

app.listen(port, () =>
  console.log(`Le serveur écoute sur : http://localhost:${port}`)
);
