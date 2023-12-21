import React, { useState } from "react";
import axios from "axios";

const Booster = () => {
  const [boosterCards, setBoosterCards] = useState([]);
  const [userCardList, setUserCardList] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id_user"));

  const openBooster = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cartes/random/booster");
      setBoosterCards(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des cartes du booster", error);
    }
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

  return (
    <div>
      <h1>Ouvrir un Booster</h1>
      <img src="https://product-images.tcgplayer.com/fit-in/437x437/181266.jpg" alt="booster" onClick={openBooster}/>
      <div>
        {boosterCards.map((card, index) => (
          <div key={index}>
            <h3>{card.nom}</h3>
            <img src={card.image} alt={card.nom} />
            <p>{card.description}</p>
            <button onClick={() => handleAddToUserList(card)}>
              Ajouter à la liste
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booster;
