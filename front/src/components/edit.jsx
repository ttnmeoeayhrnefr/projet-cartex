import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const EditionCarte = () => {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
    const [editedImg, setEditedImg] = useState("");
    const [editedImgPetite, setEditedImgPetite] = useState("");
    const [editedImgCropped, setEditedImgCropped] = useState("");
    const [editedIdKonami, setEditedIdKonami] = useState("");
    const [editedType, setEditedType] = useState("");
    const [editedRace, setEditedRace] = useState("");
    const [editedAttaque, setEditedAttaque] = useState("");
    const [editedDefense, setEditedDefense] = useState("");
    const [editedEtoiles, setEditedEtoiles] = useState("");
    const [editedArchetype, setEditedArchetype] = useState("");
    const [editedAttribut, setEditedAttribut] = useState("");
    const [editedCardMarketPrice, setEditedCardMarketPrice] = useState("");
    const [editedTgcPlayerPrice, setEditedTgcPlayerPrice] = useState("");
    const [editedEbayPrice, setEditedEbayPrice] = useState("");
    const [editedAmazonPrice, setEditedAmazonPrice] = useState("");
    const [editedSetNom, setEditedSetNom] = useState("");
    const [editedSetRarete, setEditedSetRarete] = useState("");
    const [editedIdUtilisateur, setEditedIdUtilisateur] = useState("");

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cartes/${cardId}`);
        setCardDetails(response.data[0]);
        console.log("Voici vos données :", response.data[0]);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la carte", error);
      }
    };
  
    fetchCardDetails();
  }, [cardId]);
  
  useEffect(() => {
    if (cardDetails) {
      setEditedName(cardDetails.nom);
      setEditedDescription(cardDetails.description);
        setEditedImg(cardDetails.image);
        setEditedImgPetite(cardDetails.image_petite);
        setEditedImgCropped(cardDetails.image_cropped);
        setEditedIdKonami(cardDetails.id_carte_konami);
        setEditedType(cardDetails.type);
        setEditedRace(cardDetails.race);
        setEditedAttaque(cardDetails.attaque);
        setEditedDefense(cardDetails.defense);
        setEditedEtoiles(cardDetails.etoiles);
        setEditedArchetype(cardDetails.archetype);
        setEditedAttribut(cardDetails.attribut);
        setEditedCardMarketPrice(cardDetails.cardmarket_price);
        setEditedTgcPlayerPrice(cardDetails.tcgplayer_price);
        setEditedEbayPrice(cardDetails.ebay_price);
        setEditedAmazonPrice(cardDetails.amazon_price);
        setEditedSetNom(cardDetails.set_nom);
        setEditedSetRarete(cardDetails.set_rarete);
        setEditedIdUtilisateur(cardDetails.id_user);
      console.log(editedName);
    }
  }, [cardDetails]);

  const handleSaveChanges = async () => {
    const cardId = cardDetails.id_carte;
    // Mettez à jour les détails de la carte avec les nouvelles valeurs
    try {
      await axios.put(`http://localhost:3001/cartes/${cardId}`, {
        nom: editedName,
        description: editedDescription,
        image: editedImg,
        image_petite: editedImgPetite,
        image_cropped: editedImgCropped,
        id_carte_konami: editedIdKonami,
        type: editedType,
        race: editedRace,
        attaque: editedAttaque,
        defense: editedDefense,
        etoiles: editedEtoiles,
        archetype: editedArchetype,
        attribut: editedAttribut,
        cardmarket_price: editedCardMarketPrice,
        tcgplayer_price: editedTgcPlayerPrice,
        ebay_price: editedEbayPrice,
        amazon_price: editedAmazonPrice,
        set_nom: editedSetNom,
        set_rarete: editedSetRarete,
        id_user: editedIdUtilisateur,
      });
      console.log("Carte mise à jour avec succès");
      // Redirection vers la page de personnalisation ou une autre page après l'édition
      window.location.href = "/personnalisation"; // À adapter selon votre structure de routage
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la carte", error);
    }
  };

  return (
    <div>
      <h1>Édition de la carte</h1>
      <label>Nom de la carte:</label>
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <br />
      <label>Image de la carte:</label>
      <input
        type="text"
        value={editedImg}
        onChange={(e) => setEditedImg(e.target.value)}
      />
      <br />
      <label>Image Petite:</label>
      <input
        type="text"
        value={editedImgPetite}
        onChange={(e) => setEditedImgPetite(e.target.value)}
      />
      <br />
      <label>Image Cropped:</label>
      <input
        type="text"
        value={editedImgCropped}
        onChange={(e) => setEditedImgCropped(e.target.value)}
      />
      <br />
      <label>Id Konami:</label>
      <input
        type="text"
        value={editedIdKonami}
        onChange={(e) => setEditedIdKonami(e.target.value)}
      />
      <br />
      <label>Description de la carte:</label>
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <br />
      <label>Type:</label>
      <input
        type="text"
        value={editedType}
        onChange={(e) => setEditedType(e.target.value)}
      />
      <br />
      <label>Race:</label>
      <input
        type="text"
        value={editedRace}
        onChange={(e) => setEditedRace(e.target.value)}
      />
      <br />
      <label>Attaque:</label>
      <input
        type="text"
        value={editedAttaque}
        onChange={(e) => setEditedAttaque(e.target.value)}
      />
      <br />
      <label>Défense:</label>
      <input
        type="text"
        value={editedDefense}
        onChange={(e) => setEditedDefense(e.target.value)}
      />
      <br />
      <label>Etoiles:</label>
      <input
        type="text"
        value={editedEtoiles}
        onChange={(e) => setEditedEtoiles(e.target.value)}
      />
      <br />
      <label>Archetype:</label>
      <input
        type="text"
        value={editedArchetype}
        onChange={(e) => setEditedArchetype(e.target.value)}
      />
      <br />
      <label>Attribut:</label>
      <input
        type="text"
        value={editedAttribut}
        onChange={(e) => setEditedAttribut(e.target.value)}
      />
      <br />
      <label>Card Market Price:</label>
      <input
        type="text"
        value={editedCardMarketPrice}
        onChange={(e) => setEditedCardMarketPrice(e.target.value)}
      />
      <br />
      <label>TGC Player Price:</label>
      <input
        type="text"
        value={editedTgcPlayerPrice}
        onChange={(e) => setEditedTgcPlayerPrice(e.target.value)}
      />
      <br />
      <label>Ebay Price:</label>
      <input
        type="text"
        value={editedEbayPrice}
        onChange={(e) => setEditedEbayPrice(e.target.value)}
      />
      <br />
      <label>Amazon Price:</label>
      <input
        type="text"
        value={editedAmazonPrice}
        onChange={(e) => setEditedAmazonPrice(e.target.value)}
      />
      <br />
      <label>Set Nom:</label>
      <input
        type="text"
        value={editedSetNom}
        onChange={(e) => setEditedSetNom(e.target.value)}
      />
      <br />
      <label>Set Rareté:</label>
      <input
        type="text"
        value={editedSetRarete}
        onChange={(e) => setEditedSetRarete(e.target.value)}
      />
      <br />
      <label>Id Utilisateur:</label>
      <input
        type="text"
        value={editedIdUtilisateur}
        onChange={(e) => setEditedIdUtilisateur(e.target.value)}
      />
      <br />
      <button onClick={handleSaveChanges}>Enregistrer les modifications</button>
    </div>
  );
};

export default EditionCarte;
