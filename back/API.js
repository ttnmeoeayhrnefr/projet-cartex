const axios = require('axios');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: "127.0.0.1",
    port: "3306",
    database: "ProjetCarteX",
    user: "ProjetCarteX",
    password: "ProjetCarteX",
});

const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

async function main() {
    let conn;
    try {
        const response = await axios.get(url);
        const cards = response.data.data.slice(0, 500);

        conn = await pool.getConnection();
        for (const card of cards) {
            const cardSet = card.card_sets ? card.card_sets[0] : {};
            const cardImage = card.card_images ? card.card_images[0] : {};
            const cardPrice = card.card_prices ? card.card_prices[0] : {};

            //Verifie si la carte existe déjà dans la base de données
            const queryCheck = `SELECT * FROM Carte WHERE nom = ?`;
            const queryParamsCheck = [card.name];
            const resultCheck = await conn.query(queryCheck, queryParamsCheck);

            if (resultCheck.length > 0) {
                continue;
            } else {
                console.log(`Ajout de la carte ${card.name} à la base de données`);
            }

            const query = `INSERT INTO Carte (id_carte, nom, type, image, image_cropped, image_petite, race, archetype, id_carte_konami, attaque, defense, etoiles, attribut, cardmarket_price, tcgplayer_price, ebay_price, amazon_price, set_nom, set_rarete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const queryParams = [
                card.id, card.name, card.type, cardImage.image_url, cardImage.image_url_cropped, cardImage.image_url_small,
                card.race, card.archetype, card.id, card.atk, card.def, card.level, card.attribute,
                cardPrice.cardmarket_price, cardPrice.tcgplayer_price, cardPrice.ebay_price, cardPrice.amazon_price,
                cardSet.set_name, cardSet.set_rarity
            ];

            await conn.query(query, queryParams);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données de l'API ou de l'interaction avec la base de données:", error);
    } finally {
        if (conn) conn.release();
    }
}

main();


