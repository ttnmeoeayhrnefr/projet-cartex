  import React, { useEffect, useState, useCallback } from 'react';

  export default function ListeCarte() {
    const [cartes, setCartes] = useState([]);
    const apiUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

    const fetchAllCards = useCallback(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const allCardData = data.data || [];
          const limitedCards = allCardData.slice(0, 100);
          setCartes(limitedCards);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données : ', error);
        });
    }, [apiUrl]);

    const addCardToDatabase = async (cardData) => {
      try {
        await fetch('http://localhost:3001/addCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cardData),
        });
        console.log(`Carte ajoutée à la base de données : ${cardData.nom}`);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la carte à la base de données : ', error);
      }
    };
    

    useEffect(() => {
      fetchAllCards();
    }, [fetchAllCards]);


    useEffect(() => {
      if (cartes.length > 0) {
        addCardToDatabase();
      }
    }, [cartes, addCardToDatabase]);

    return (
      <div>
        <h1>Liste des cartes :</h1>
        {cartes.map((carte, index) => (
          <div key={index}>
            <h3>{carte.name}</h3>
            
            <img src={carte.card_images[0].image_url} alt={carte.name} />
            <img src={carte.card_images[0].image_url_small} alt={carte.name} />
            <img src={carte.card_images[0].image_url_cropped} alt={carte.name} />

            <p> ID : {carte.id}</p>
            <p> Description : {carte.desc}</p>
            <p> Type : {carte.type}</p>
            <p> Race : {carte.race}</p>
            <p> Attaque : {carte.atk}</p>
            <p> Defense : {carte.def}</p>
            <p> Etoiles : {carte.level}</p>
            <p> Archetype : {carte.archetype}</p>
            <p> Attribut : {carte.attribute}</p>

            <p> Card Prices : </p>
            {carte.card_prices && carte.card_prices.length > 0 ? (
              <div>
                {carte.card_prices.map((price, index) => (
                  <div key={index}>
                    <p>Cardmarket Price: {price.cardmarket_price}</p>
                    <p>Tcgplayer Price: {price.tcgplayer_price}</p>
                    <p>Ebay Price: {price.ebay_price}</p>
                    <p>Amazon Price: {price.amazon_price}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No card prices available.</p>
            )}

            {carte.card_sets && carte.card_sets.length > 0 ? (
            <div>
                <h4>Card Sets:</h4>
                {carte.card_sets.map((set, index) => (
                  <div key={index}>
                    <p>Set Nom: {set.set_name}</p>
                    <p>Set Rareté: {set.set_rarity}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No card sets available.</p>
            )}
          </div>
        ))}
      </div>
    );
  }
