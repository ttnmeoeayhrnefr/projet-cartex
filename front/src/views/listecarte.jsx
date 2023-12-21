import React, { useState, useEffect } from "react";
import axios from "axios";
import '../style/listecards.scss';

const ListeCarte = () => {
  const [userId, setUserId] = useState("");
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const fetchUserId = () => {
      const idUserFromLocalStorage = localStorage.getItem("id_user");
      setUserId(idUserFromLocalStorage);
    };

    fetchUserId();
  }, []); 

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        console.log(userId);
        const response = await axios.get(`http://localhost:3001/cartes/details/${userId}`);
        
        if (response.data && response.data.listeCard && response.data.carteDetails) {

          setUserCards(response.data.carteDetails);
          console.log(response.data);
        } else {
          console.error("La structure de la réponse du serveur est incorrecte.");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes', error);
      }
    };
  
    fetchUserCards();
  }, [userId]);

  const handleDelete = async (cardId) => {
    try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
        // Utilisez await ici pour attendre la fin de la suppression
        const reponse = await axios.delete(`http://localhost:3001/listeCarte/delete/${cardId}`);
        console.log(reponse.data);
        console.log("Carte supprimée avec succès");

        // Mettez à jour l'état après la suppression
        setUserCards((prevCards) => prevCards.filter((card) => card.id_carte !== cardId));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte", error);
    }
};

  return (
    <div className="usercards-page">
      <div className="header">
        <h1>Collection</h1>
      </div>
      <div className="cards">
        {userCards.map((userCard, index) => (
          <div className="card" key={index}>
            <div className="img">
              <img src={userCard.image} alt={userCard.nom} />
            </div>
            <div className="title">
              <h3>{userCard.nom}</h3>
            </div>
            <div className="btn">
              <span onClick={() => handleDelete(userCard.id_carte)}>SUPPRIMER</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeCarte;
