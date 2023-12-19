import '../style/marketplace.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MarketPlace() {
    // const generateCardList = () => {
    //     const cardList = [];
    
    //     for (let i = 0; i < 10; i++) {
    //       cardList.push(
    //         <div className="card" key={i}>
    //           <div className="title">
    //             <span>Title</span>
    //             <p>#152354751255</p>
    //           </div>
    //           <div className="img">
    //             <img src="https://i.pinimg.com/564x/2d/e0/b7/2de0b7946bb7c8427018694ce5464709.jpg" alt="" />
    //           </div>
    //           <div className="describe">
    //             <div className="price">
    //               <span>1.99$</span>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     }
    
    //     return cardList;
    //   };

    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredCards, setFilteredCards] = useState([]);
    // const [activeFilter, setActiveFilter] = useState(null);

    useEffect(() => {
      const fetchAllCards = async () => {
        try {
          const response = await axios.get('http://localhost:3001/cartes'); // Assurez-vous que l'URL est correcte
          setCards(response.data);
          setFilteredCards(response.data); // Initialise également filteredCards avec toutes les cartes
        } catch (error) {
          console.error('Erreur lors de la récupération des cartes', error);
        }
      };

      fetchAllCards();
    }, []);

    const handleSearch = (e) => {
      let value = e.target.value.toLowerCase();
      setSearch(value);
    
      const filtered = cards.filter((card) => {
        return card.nom.toLowerCase().includes(value);
      });
    
      setFilteredCards(filtered);
    };

    console.log(search);

    const handleFilter = (filterType) => {
      const sortedCards = [...cards];
  
      switch (filterType) {
        case 'A-Z':
          sortedCards.sort((a, b) => a.nom.localeCompare(b.nom));
          break;
        case 'Prix':
          sortedCards.sort((a, b) => a.cardmarket_price - b.cardmarket_price);
          break;
        case 'Rarete':
          const rarityOrder = {
            '': 6, // Si la rareté est vide, on la met en dernier
            'Common': 5,
            'Rare': 4,
            'Super Rare': 3,
            'Ultra Rare': 2,
            'Secret Rare': 1,
          };
  
          sortedCards.sort((a, b) => {
            return rarityOrder[a.set_rarete] - rarityOrder[b.set_rarete] || a.nom.localeCompare(b.nom);
          });
          break;
        case 'Puissance':
          sortedCards.sort((a, b) => b.etoiles - a.etoiles);
          break;
        default:
          break;
      }
  
      setFilteredCards(sortedCards);
    };

    const generateCardList = () => {
      return filteredCards.map((card) => (
        <div className="card" key={card.id}>
          <div className="title">
            <span>{card.nom}</span>
            <p>#{card.id_carte_konami}</p>
          </div>
          <div className="img">
            <img src={card.image} alt="" />
          </div>
          <div className="describe">
            <div className="price">
              <span>{`${card.cardmarket_price}$`}</span>
              <span>{`${card.tcgplayer_price}$`}</span>
              <span>{`${card.ebay_price}$`}</span>
              <span>{`${card.amazon_price}$`}</span>
            </div>
          </div>
        </div>
      ));
    };


    return (
        <div className="content-mkp">
            <div className="header">
                <h2>Bienvenue sur CarteX,</h2>
                <p>Trouve toutes les cartes que tu désires !</p>
            </div>
            <div className="filterbar">
                <div className="filters">
                    <span onClick={() => handleFilter('A-Z')}>A - Z</span>
                    <span onClick={() => handleFilter('Prix')}>Prix</span>
                    <span onClick={() => handleFilter('Rarete')}>Rareté</span>
                    <span onClick={() => handleFilter('Puissance')}>Puissance</span>
                </div>
                <div className="searchbar">
                    <input type="text" placeholder='Rechercher...' onChange={handleSearch}/>
                </div>
            </div>
            <div className="container-cards-mkt">
                {generateCardList()}
            </div>
        </div>
    )
}