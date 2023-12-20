import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      <h1>Liste de Cartes de l'Utilisateur</h1>
      <ul>
        {userCards.map((userCard, index) => (
          <li key={index}>
            <h3>{userCard.nom}</h3>
            <img src={userCard.image} alt={userCard.nom} />
            <p>{userCard.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeCarte;
