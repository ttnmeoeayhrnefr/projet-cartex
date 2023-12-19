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
    const [currentIndex, setCurrentIndex] = useState([]);

    useEffect(() => {
      const fetchAllCards = async () => {
        try {
          const response = await axios.get('http://localhost:3001/cartes'); // Assurez-vous que l'URL est correcte
          setCards(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des cartes', error);
        }
      };

      fetchAllCards();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, []);

    const generateCardList = () => {
      return cards.map((card) => (
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
                {["cardmarket", "tcgplayer", "ebay", "amazon"].map((source, index) => (
                    <span key={index} className={index === currentIndex ? 'active' : ''}>
                    {`${card[`${source}_price`]}$`}
                    </span>
                ))}
            </div>
          </div>
        </div>
      ));
    };
    return (
        <div className="content-mkp">
            <div className="header">
                <h2>Bienvenue sur Carte<span className='primary'>X</span>,</h2>
                <p>Trouve toutes les cartes que tu désires !</p>
            </div>
            <div className="filterbar">
                <div className="filters">
                    <span>A - Z</span>
                    <span>Prix</span>
                    <span>Rareté</span>
                    <span>Puissance</span>
                </div>
                <div className="searchbar">
                    <input type="text" placeholder='Rechercher...'/>
                </div>
            </div>
            <div className="container-cards-mkt">
                {generateCardList()}
            </div>
        </div>
    )
}