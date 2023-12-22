import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/personnalisation.scss"

const Personnalisation = () => {
  const [userCards, setUserCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);


  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const storedUserId = localStorage.getItem("id_user");

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

  const handleDelete = async (cardId) => {
    try {
      // Demander confirmation à l'utilisateur
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
        // Mettez en œuvre la logique pour supprimer la carte
        await axios.delete(`http://localhost:3001/cartes/${cardId}`);
        console.log("Carte supprimée avec succès");

        // Mettez à jour l'état pour refléter la suppression
        setUserCards((prevCards) => prevCards.filter((card) => card.id_carte !== cardId));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte", error);
    }
  };

  const handleCreate = () => {
    // Mettez en œuvre la logique pour créer une nouvelle carte
    window.location.href = '/Create-card';
  };

  const handleCardClick = (cardId) => {
    console.log(cardId)
    setSelectedCardId(cardId);
    window.location.href = `/details/${cardId}`;
  };

    return (
        <div className="personnalisation-page">
            <div className="container">
                <h1>Création</h1>
                <div className="container-cards">
                    {userCards.map((card) => (
                      <div key={card.id_carte} className="card-item">
                          <div className="name" onClick={() => handleCardClick(card.id_carte)}>
                                <p>{card.nom}</p>
                          </div>
                          <div className="img" onClick={() => handleCardClick(card.id_carte)}>
                            <img src={card.image} alt={card.nom} />
                          </div>
                          <div className="describe" onClick={() => handleCardClick(card.id_carte)}>
                              <p>{card.description}</p>
                          </div>
                          <div className="btn">
                              <span className="btn-cards" onClick={() => handleEdit(card.id_carte)}>Modifier</span >
                              <span className="btn-cards" onClick={() => handleDelete(card.id_carte)}>Supprimer</span >
                          </div>
                      </div>
                  ))}
                    <div className="card-item-more">
                          <span className="more" onClick={handleCreate}>+</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personnalisation;
