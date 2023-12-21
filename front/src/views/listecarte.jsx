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

  return (
    <div className="usercards-page">
      <div className="header">
        <h1>Mes Cartes</h1>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeCarte;
