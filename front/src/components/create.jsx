import React, { useRef, useState } from 'react';
import '../style/create.scss';
import axios from 'axios';
import { useEffect } from 'react';
import html2canvas from 'html2canvas';

// Composant pour afficher une étoile
const StarImage = ({ filled }) => {
    const starImageUrl = filled
        ? 'https://lauqerm.github.io/ygocarder/asset/image/sub-family/subfamily-level.png' // Image d'étoile remplie
        : '';

    return <img src={starImageUrl} alt="Star" className="star-image" />;
};

// Mappe les types aux URLs des images correspondantes
const typeImageMap = {
    monstre: 'https://lauqerm.github.io/ygocarder/asset/image/frame/frame-normal.png',
    monstre_effet: 'https://lauqerm.github.io/ygocarder/asset/image/frame/frame-effect.png',
    magie: 'https://lauqerm.github.io/ygocarder/asset/image/frame/frame-spell.png',
    piege: 'https://lauqerm.github.io/ygocarder/asset/image/frame/frame-trap.png',
    fusion: 'https://discord.com/channels/@me/1186238206912499782/1187343187879137300',
    link: 'https://lauqerm.github.io/ygocarder/asset/image/frame/frame-fusion.png',
    ritual: 'https://lauqerm.github.io/ygocarder/asset/image/frame/frame-ritual.png',
    synchro: 'https://lauqerm.github.io/ygocarder/asset/image/frame/frame-synchro.png',
    xyz: 'https://lauqerm.github.io/ygocarder/asset/image/frame/frame-xyz.png',
};

export default function Create() {
    const [cardType, setCardType] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardStars, setCardStars] = useState('');
    const [cardCollection, setCardCollection] = useState('');
    const [cardRarity, setCardRarity] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const [cardCmktPrice, setCardCmktPrice] = useState('');
    const [cardTcgPrice, setCardTcgPrice] = useState('');
    const [cardEbayPrice, setCardEbayPrice] = useState('');
    const [cardAmazonPrice, setCardAmazonPrice] = useState('');
    const [cardAttack, setCardAttack] = useState('');
    const [cardDefense, setCardDefense] = useState('');
    const [cardImage, setCardImage] = useState('');
    const [userId, setUserId] = useState('');
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchUserId = () => {
            const idUserFromLocalStorage = localStorage.getItem('id_user');
            setUserId(idUserFromLocalStorage);
        };

        fetchUserId();
    }, []);

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setCardName(newName);
    };

    const handleStarsChange = (event) => {
        const newStars = event.target.value;
        setCardStars(newStars);
    };

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setCardType(newType);
    };

    const handleCollectionChange = (event) => {
        const newCollection = event.target.value;
        setCardCollection(newCollection);
    };

    const handleRarityChange = (event) => {
        const newRarity = event.target.value;
        setCardRarity(newRarity);
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setCardDescription(newDescription);
    };

    const handleCmktPriceChange = (event) => {
        const newCmktPrice = event.target.value;
        setCardCmktPrice(newCmktPrice);
    };

    const handleTcgPriceChange = (event) => {
        const newTcgPrice = event.target.value;
        setCardTcgPrice(newTcgPrice);
    };

    const handleEbayPriceChange = (event) => {
        const newEbayPrice = event.target.value;
        setCardEbayPrice(newEbayPrice);
    };

    const handleAmazonPriceChange = (event) => {
        const newAmazonPrice = event.target.value;
        setCardAmazonPrice(newAmazonPrice);
    };

    const handleAttackChange = (event) => {
        const newAttack = event.target.value;
        setCardAttack(newAttack);
    };

    const handleDefenseChange = (event) => {
        const newDefense = event.target.value;
        setCardDefense(newDefense);
    };

    const handleImageChange = (event) => {
        const imageUrl = event.target.value;
        setCardImage(imageUrl);
    };

    const handleSubmit = async () => {
        console.log(
            cardAttack,
            cardDefense,
            cardAmazonPrice,
            cardCmktPrice,
            cardCollection,
            cardDescription,
            cardEbayPrice,
            cardImage,
            cardName,
            cardRarity,
            cardStars,
            cardTcgPrice,
            cardType,
            userId
        );
        const requestData = {
            nom: cardName,
            type: cardType,
            description: cardDescription,
            image: typeImageMap[cardType.toLowerCase()],
            image_cropped: cardImage,
            image_petite: '',
            id_carte_konami: null,
            attaque: cardAttack,
            defense: cardDefense,
            etoiles: cardStars,
            attribut: '',
            cardmarket_price: cardCmktPrice,
            tcgplayer_price: cardTcgPrice,
            ebay_price: cardEbayPrice,
            amazon_price: cardAmazonPrice,
            set_nom: cardCollection,
            set_rarete: '',
            id_user: userId,
        };

        console.log(
            requestData.attaque,
            requestData.defense,
            requestData.amazon_price,
            requestData.cardmarket_price,
            requestData.set_nom,
            requestData.description,
            requestData.ebay_price,
            requestData.image,
            requestData.nom,
            requestData.set_rarete,
            requestData.etoiles,
            requestData.tcgplayer_price,
            requestData.type,
            requestData.id_user
        );

        resetForm();
        try {
            const response = await axios.post('http://localhost:3001/cartes', requestData);
            console.log(response.data);
            // Gérez le succès, redirigez ou affichez un message de réussite
        } catch (error) {
            console.error(error);
            // Gérez l'erreur, affichez un message d'erreur
        }
    };

    const resetForm = () => {
        setCardType('');
        setCardName('');
        setCardStars('');
        setCardCollection('');
        setCardRarity('');
        setCardDescription('');
        setCardCmktPrice('');
        setCardTcgPrice('');
        setCardEbayPrice('');
        setCardAmazonPrice('');
        setCardAttack('');
        setCardDefense('');
        setCardImage('');
        setUserId('');
    };

    const handleScreenshot = async () => {
      try {
          const canvas = await html2canvas(cardRef.current);
          const dataUrl = canvas.toDataURL();

          // Maintenant, vous pouvez envoyer dataUrl à votre backend ou l'utiliser comme vous le souhaitez
          console.log(dataUrl);
      } catch (error) {
          console.error('Erreur lors de la capture d\'écran :', error);
      }
    };

    return (
    <div className="create-page">
      <div className="container">
          <h1>Création d'une carte</h1>
          <div className="content-create">
      <div className="visualisation" ref={cardRef}>
        <div className="img">
          <div className="card-container">
            <div className="card-body">
              <div className="card">
                {cardType && (
                  <img
                    src={typeImageMap[cardType.toLowerCase()]}
                    alt={`Type: ${cardType}`}
                    className="card-type"
                  />
                )}
                {cardImage && (
                  <img
                    src={cardImage}
                    alt="Card preview"
                    className="card-image"
                  />
                )}
              </div>
              <div className="card-header">
                <p className='card-name'>{cardName}</p>
                {cardStars && (
                  <div className="stars-container">
                    {[...Array(parseInt(cardStars))].map((_, index) => (
                      <StarImage key={index} filled />
                    ))}
                  </div>
                )}
              </div>
              </div>
              <div className="card-stats">
                <p className='attaque'>{cardAttack}</p>
                <p className='defense'>{cardDefense}</p>
              </div>
              <div className="card-description">
                <p className='description'>{cardDescription}</p>
              </div>
            </div>
          </div>
      </div>
        <div className="choices">
          <div className="first-box">
            <div className="name">
              <input
                type="text"
                placeholder="Nom..."
                required
                value={cardName}
                onChange={handleNameChange}
              />
            </div>
              <div className="etoiles">
                <select
                  type="text"
                  placeholder="Etoiles..."
                  required
                  value={cardStars}
                  onChange={handleStarsChange}
                  defaultValue=""
                >
                <option value="" disabled hidden>
                  Choisir un nombre d'étoiles...
                </option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
                ))}
                </select>
              </div>
                <div className="type">
                  <select
                    name="type"
                    id="type"
                    required
                    value={cardType}
                    onChange={handleTypeChange}
                  >
                    <option value="" disabled hidden>
                      Choisir un type...
                    </option>
                    <option value="monstre">Monstre</option>
                    <option value="monstre_effet">Monstre Effet</option>
                    <option value="magie">Magie</option>
                    <option value="piege">Piège</option>
                    <option value="fusion">Fusion</option>
                    <option value="link">Link</option>
                    <option value="ritual">Ritual</option>
                    <option value="synchro">Synchro</option>
                    <option value="xyz">Xyz</option>
                    </select>
                  </div>
                </div>
                  <div className="set">
                    <div className="collection">
                      <input
                        type="text"
                        placeholder="Collection"
                        value={cardCollection}
                        onChange={handleCollectionChange}
                        />
                    </div>
                      <div className="rarete">
                        <input
                          type="text"
                          placeholder="Rareté..."
                          required
                          value={cardRarity}
                          onChange={handleRarityChange}
                        />
                      </div>
                    </div>    
              <div className="stats">
                <div className="image">
                  <input
                    type="text"
                    placeholder="Image..."
                    onChange={handleImageChange}
                  />
                </div>
                <div className="attaque">
                  <input
                    type="text"
                    placeholder="Attaque..."
                    required
                    value={cardAttack}
                    onChange={handleAttackChange}
                  />
                </div>
                <div className="defense">
                  <input
                    type="text"
                    placeholder="Défense..."
                    required
                    value={cardDefense}
                    onChange={handleDefenseChange}
                  />
              </div>
              </div>
              <div className="description">
                <textarea
                  placeholder="Description..."
                  required
                  value={cardDescription}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="price">
                <div className="cmkt">
                  <input
                    type="text"
                    placeholder="Cardmarket Price..."
                    required
                    value={cardCmktPrice}
                    onChange={handleCmktPriceChange}
                  />
                </div>
                <div className="tcgp">
                  <input
                    type="text"
                    placeholder="Tgcplayer Price..."
                    required
                    value={cardTcgPrice}
                    onChange={handleTcgPriceChange}
                  />
                </div>
                <div className="ebay">
                  <input
                    type="text"
                    placeholder="Ebay..."
                    required
                    value={cardEbayPrice}
                    onChange={handleEbayPriceChange}
                  />
                </div>
                <div className="amazon">
                  <input
                    type="text"
                    placeholder="Amazon..."
                    required
                    value={cardAmazonPrice}
                    onChange={handleAmazonPriceChange}
                  />
                </div>
              </div>
              <div className="submit" onClick={() => { handleScreenshot(); handleSubmit(); }}>
                  <span>CREER</span>
                  
              </div>
                </div>
            </div>
        </div>
    </div>
  );
}



