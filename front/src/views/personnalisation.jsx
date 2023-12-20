import React, { useState, useEffect } from "react";
import axios from "axios";

const Personnalisation = () => {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const storedUserId = localStorage.getItem("id_user");
        console.log(storedUserId);

        if (storedUserId) {
          const response = await axios.get(`http://localhost:3001/cartes/utilisateurs/${storedUserId}`);
          setUserCards(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cartes utilisateur", error);
      }
    };

    fetchUserCards();
  }, []);

  const handleEdit = async (cardId) => {
    try {
      // Récupérer les détails de la carte à éditer
      const response = await axios.get(`http://localhost:3001/cartes/${cardId}`);
      const cardDetails = response.data;

      // Mettez en œuvre la logique pour l'édition, par exemple, rediriger vers une page d'édition
      console.log("Édition de la carte", cardDetails);
      // Redirection vers la page d'édition avec les détails de la carte
      // Remplacez "/edition" par le chemin de votre page d'édition
      window.location.href = `/edit/${cardId}`;
    } catch (error) {
      console.error("Erreur lors de l'édition de la carte", error);
    }
  };

  const handleDelete = (cardId) => {
    // Mettez en œuvre la logique pour supprimer la carte avec l'ID cardId
    console.log(`Suppression de la carte avec l'ID ${cardId}`);
  };

  const handleCreate = () => {
    // Mettez en œuvre la logique pour créer une nouvelle carte
    console.log("Création d'une nouvelle carte");
  };

  return (
    <div className="personnalisation-page">
      <h1>Cartes personnalisées</h1>
      {userCards.map((card) => (
        <div key={card.id_carte} className="card-item">
          <p>Nom de la carte : {card.nom}</p>
          <img src={card.image} alt={card.nom} />
          <p>Description : {card.description}</p>
          <button onClick={() => handleEdit(card.id_carte)}>Modifier</button>
          <button onClick={() => handleDelete(card.id_carte)}>Supprimer</button>
        </div>
      ))}
      <button onClick={handleCreate}>Créer une nouvelle carte</button>
    </div>
  );
};

export default Personnalisation;
