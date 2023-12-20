import '../style/marketplace.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";


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
    const [search, setSearch] = useState("");
    const [filteredCards, setFilteredCards] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);
    // const [activeFilter, setActiveFilter] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentPrice((prevPrice) => (prevPrice + 1) % 4);
      }, 1000);
    
      return () => {
        clearInterval(interval);
      };
    }, []);

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


    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
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

    const handleCardClick = (cardId) => {
      console.log(cardId)
      setSelectedCardId(cardId);
      window.location.href = `/details/${cardId}`;
    };

    const generateCardList = () => {
      return filteredCards.map((card) => (
        <Link to={`/details/${card.id_carte}`} key={card.id_carte}>
          <div className="card" key={card.id_carte} onClick={() => handleCardClick(card.id_carte)}>
            <div className="title">
              <span>{card.nom}</span>
              <p>#{card.id_carte_konami}</p>
            </div>
            <div className="img">
              <img src={card.image} alt="" />
            </div>
            <div className="describe">
              <div className="price" style={{ position: 'relative'}}>
                {["cardmarket", "tcgplayer", "ebay", "amazon"].map((source, index) => (
                  <span
                    key={index}
                    className={index === currentIndex ? 'active' : ''}
                    style={{
                      position: 'absolute',
                      top: '-0.1vh',
                      left: '-1.75vw',
                      opacity: index === currentPrice ? '1' : '0',
                      transition: 'opacity 0.5s ease-in-out',
                      zIndex: '999',
                    }}
                  >
                    <img style={{ position: 'absolute', height: '2.4vh', width: '2.4vh', top: '-0.4vh', left: '-1.25vw' }}
                      src={
                        source === 'cardmarket'
                          ? 'https://static.cardmarket.com/img/5d8d1b8b4cacaf8f53f62ec483d7b124/Downloads/Logos/CardmarketLogoTagline_Blue_Vertical_V23042018.png'
                          : source === 'tcgplayer'
                          ? 'https://media.licdn.com/dms/image/C560BAQFfGj-Xuawo6A/company-logo_200_200/0/1634568184091?e=2147483647&v=beta&t=k3f_Je2T1zlBQxrmvx1j0NqNDy06Zq6hpiE7OEH3csI'
                          : source === 'ebay'
                          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAACClBMVEX///8AAAAcHBq83fQ/Pz6QkJA0Ro9XV1YxLipFhb5FicI7Y6RFf7lFgrwWFhNEerVZc6zC4/l+fn0jOos2TI5Fd7L3+P4sLCpCaKdDb6xDc7BCZ6aWlpYMDAj754AyMjFfX17xkpz764P84Hxvb27i4uH///inp6YxP4vhODaCvFdOTk2zs7Pw8PAkJCL29vbwipjylZ7hMi/92nfrboovljzR0dEACzb4sDf6uDi+vr7R1OXY2NggN2MAGDvjQkGhoaCNk7kAAyXufpTvjD3tgD+EhIOjqMc5UJCkxePj1HbmIiafXWP7wVT6zGHug5XoY238vyblT1PiQT9mtFL7w0P/6LXqZ4XrdzIaLYQzSIQAABmXt9pykcB/n8ljg7cdITYcJC4lEQCHYBCxgR8nPWh9GxeNDxM+AABES1VvTgnlskGZNjWxGh4tAAAuPz9ZPQDdni0ACxc5IwDtfYTIHyNQAAArGADAiChFTFUfAADnW17dFAD3pi/qbnamdCTixGUXUCpINCZZJgAgZCQ+pUebS1G7YS8ORRGVKSFICiPWpyPXTCAAHgBWhkSJXypjViFGGgA3KjUfYCJ9Fyb1mDcAICMtDiEZLCAwfzISWCw3PSFlRSaFUC1YGyMelDEANySNwm6l0I+kzqNxtnlNplf+3pUAIVcAFADi8duz17ZqVkcAGn6fpMRd8qZAAAAOE0lEQVR4nO2bi3sTVRbAc4ekEYtTmlLTR6YJNCENSTqQtDEZgkRLA91s0za0WtaWKiooLiJSXNxuy/qo6KLL+qiPfbnryq7srv/jnntn7sy'
                          : source === 'amazon'
                          ? 'https://cdn.icon-icons.com/icons2/2429/PNG/512/amazon_logo_icon_147320.png'
                          : ''}
                                    alt={`${source} logo`}
                                  />
                    {`${card[`${source}_price`]}$`}
                  </span>
                ))}
              </div>
            </div>
          </div>
      </Link>
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