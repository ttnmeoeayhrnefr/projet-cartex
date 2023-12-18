import '../style/homepage.scss'
import React, { useState, useEffect } from 'react';

export default function Homepage() {
    const totalCards = 10;
  const cardsPerPage = 6;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalCards - cardsPerPage + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);
  const visibleCards = Array.from({ length: cardsPerPage }, (_, index) => {
    const cardIndex = (currentIndex + index) % totalCards;
    return (
      <div key={cardIndex} className="cards">
        <p>Card {cardIndex + 1}</p>
      </div>
    );
  });

    return (
        <div className="content">
            <div className="home-hook">
                <div className="left">
                    <div className="slogan">
                        <p>Je n'ai pas d'<span className='primary'>idée</span> de<br/> slogan, t'as <span className='primary'>capté</span> ou quoi ?</p>
                    </div>
                    <div className="describe">
                        <p>Je ne sais pas ce que je raconte mais c'est la pour faire crari. 
                        En tout cas ce site il a l'air bien lourd sah ! Je sais pas ce que vous en pensez mais on va forcement avoir 20.</p>
                    </div>
                    <div className="btn-home">
                        <span id='btn-home'>Register</span>
                        <span id='btn-home'>Marketplace</span>
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
            <div className="carrousel-home">
                <div className="title">
                    <h1>Rechercher</h1>
                </div>
                <div className="container">
                    {visibleCards}
                </div>
            </div>
            <div className="marketplace-hook">
                <div className="title">
                    <h1>Marketplace</h1>
                </div>
                <div className="btn">
                    <span>Marketplace</span>
                </div>
            </div>
        </div>
    )
}