const axios = require('axios');
const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
});

const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

async function main() {
    let conn;
    try {
        const response = await axios.get(url);
        const cards = response.data.data.slice(0, 500);

        conn = await pool.getConnection();
        for (const card of cards) {
            let cardDescription = card.desc; // Déclarer cardDescription ici

            // Verifie si la carte existe déjà dans la base de données
            const queryCheck = `SELECT * FROM Carte WHERE nom = ?`;
            const queryParamsCheck = [card.name];
            const resultCheck = await conn.query(queryCheck, queryParamsCheck);

            if (resultCheck.length > 0) {
                // Si la carte existe, mettez à jour la description
                const updateQuery = `UPDATE Carte SET description = ? WHERE nom = ?`;
                const updateParams = [cardDescription, card.name];
                await conn.query(updateQuery, updateParams);
                console.log(`La description de la carte ${card.name} a été mise à jour.`);
            } else {
                console.log(`La carte ${card.name} n'existe pas dans la base de données.`);
            }
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données de l'API ou de l'interaction avec la base de données:", error);
    } finally {
        if (conn) conn.release();
    }
}

main();
