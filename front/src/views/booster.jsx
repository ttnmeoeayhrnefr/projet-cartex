import React, { useState, useEffect } from "react";
import axios from "axios";
import '../style/booster.scss'

const Booster = () => {
  const [boosterCards, setBoosterCards] = useState([]);
  const [userCardList, setUserCardList] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id_user"));
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [isCardsContainerVisible, setCardsContainerVisible] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const openBooster = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cartes/random/booster");
      setBoosterCards(response.data);
      setHeaderVisible(false);
      setCardsContainerVisible(true);
      setCurrentCardIndex(0); // Réinitialiser l'index lors de l'ouverture d'un nouveau booster
    } catch (error) {
      console.error("Erreur lors du chargement des cartes du booster", error);
    }
  };

  const hideCardsContainer = () => {
    setHeaderVisible(true);
    setCardsContainerVisible(false);
  };

  const handleAddToUserList = async (card) => {
    try {
      console.log("Tentative d'ajout à la liste :", card);
      const response = await axios.post("http://localhost:3001/listeCarte", {
        id_user: userId,
        id_carte: card.id_carte,
      });

      if (response.status === 200) {
        console.log("Ajout réussi !");
        setUserCardList([...userCardList, card]);
      } else {
        console.error("Erreur lors de l'ajout de la carte à la liste de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le serveur", error);
    }
  };

  useEffect(() => {
    let intervalId;
    if (isCardsContainerVisible && currentCardIndex < boosterCards.length - 1) {
      intervalId = setInterval(() => {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
      }, 500);
    }
    return () => clearInterval(intervalId);
  }, [isCardsContainerVisible, currentCardIndex, boosterCards.length]);

  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'Common':
        return 'common';
      case 'Rare':
        return 'rare';
      case 'Super Rare':
        return 'srare';
      case 'Ultra Rare':
        return 'urare';
      case "Ultimate Rare":
        return 'ultrare';
      case 'Quarter Century Secret Rare':
        return 'qcsrare';
      case 'Short Print':
        return 'sprint';
      case 'Secret Rare':
        return 'sctrare';
      case 'Gold Rare':
        return 'grare';
      case 'Extra Secret Rare':
        return 'esrare';
      case 'Gold Secret Rare':
        return 'gsctrare';
      case "Collector's Rare":
        return 'clsrare';
      case 'Duel Terminal Normal Parallel Rare':
        return 'dtnprare';
      case 'Prismatic Secret Rare':
        return 'psrare';
      case 'Mosaic Rare':
        return 'mrare';
      case 'Duel Terminal Rare Parallel Rare':
        return 'dtrprare';
      case 'Duel Terminal Ultra Parallel Rare':
        return 'dtuprare';
      default:
        return 'defaut';
    }
  };

  return (
    <div className="booster-page">
      {isHeaderVisible && (
        <div className="header-booster">
          <img
            src="https://magicians-circle.com/wp-content/uploads/2023/03/BLMR-BOOSTER-1.png"
            alt="booster"
            onClick={openBooster}
          />
          <h1 onClick={openBooster}>Ouvrir un Booster</h1>
        </div>
      )}
      
      {isCardsContainerVisible && (
        <div className="cards-container">
            <div className="cards">
              {boosterCards.slice(0, currentCardIndex + 1).map((card, index) => (
                <div className= "card" key={index}>
                  <div className={`img ${getRarityClass(card.set_rarete)}`}>
                    <img src={card.image} alt={card.nom} />
                  </div>
                  <div className="btn-add">
                    <button onClick={() => handleAddToUserList(card)}>
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          <div className="btn">
              <button onClick={hideCardsContainer}>Reouvrir</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booster;
