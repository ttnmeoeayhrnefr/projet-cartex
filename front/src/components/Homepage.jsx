import '../style/homepage.scss'
import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom'
import axios from 'axios';

export default function Homepage() {
    const totalCards = 10;
  const cardsPerPage = 6;
  const [cards, setCards] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalCards - cardsPerPage + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const fetchRandomCards = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cartes/random/random');
        setCards(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes', error);
      }
    };

    fetchRandomCards();
  }, []);

  const visibleCards = Array.from({ length: cardsPerPage }, (_, index) => {
    const cardIndex = (currentIndex + index) % totalCards;
    return (
      <div key={cardIndex} className="cards">
        <p>Card {cardIndex + 1}</p>
      </div>
    );
  });

  const cardComponents = cards.map((card, index) => (
    <div key={index} className="cards">
      <img src={card.image} alt={`Card ${index + 1}`} />
    </div>
    ));

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
                        <Link to="/Register" id='btn-home'>Inscription</Link>
                        <Link to='/Marketplace' id='btn-home'>Marketplace</Link>
                    </div>
                </div>
                <div className="right">
                    <div className="imgtop">
                        <img src="https://i.pinimg.com/564x/2d/e0/b7/2de0b7946bb7c8427018694ce5464709.jpg" alt="" />
                        <img src="https://i.pinimg.com/564x/83/b2/f1/83b2f19dd4bf457b40c24987fe101c49.jpg" alt="" />
                    </div>
                    <div className="imgbot">
                        <img src="https://i.pinimg.com/564x/a6/b3/23/a6b3235219f5518ac44ecb26a5885278.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="carrousel-home">
                <div className="title">
                    <h1>Rechercher</h1>
                </div>
                <div className="container">
                    {cardComponents}
                </div>
            </div>
            <div className="marketplace-hook">
                <div className="btn">
                    <Link to='/Marketplace'>Marketplace</Link>
                </div>
            </div>
            <div className="licences">
                <div className="title">
                    <h1>Licences</h1>
                </div>
                <div className="img">
                    <img src="https://assets-global.website-files.com/637394ad600365cac7c430ec/6384b4842fb3c645a257523c_Yu-Gi.png" alt="Yu-Gi-Oh!" />
                </div>
            </div>
            <div className="box-bot">
                <div className="container">
                    <div className="text">
                        <h1>Authentification transparente et systématique</h1>
                        <p>Thunder sécurise la vente en authentifiant chaque carte avant sa mise en vente !<br/><br/>
                        Un examen de pré-gradation approfondi permet de certifier l'authenticité et l'état de chaque carte pour éviter tout risque de fraude.<br/><br/>
                        Nos experts attribuent une note transparente et juste à chaque carte certifiée, ce qui vous permet d'avoir une confiance totale sur Thunder.</p>
                    </div>
                    <div className="img">
                        <img src="https://i.pinimg.com/564x/8e/71/99/8e7199e6699fe99022850f0bfe943103.jpg" alt="" />
                        <img src="https://i.pinimg.com/564x/ff/92/21/ff9221fbe575ddc04764cb7b92dcb340.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="box-bot">
                <div className="container">
                    <div className="img">
                        <img src="https://i.pinimg.com/564x/c4/44/86/c444864beabdeb4583979a2d555e4d4c.jpg" alt="" />
                        <img src="https://i.pinimg.com/564x/c4/44/86/c444864beabdeb4583979a2d555e4d4c.jpg" alt="" />
                    </div>
                    <div className="text">
                        <h1>Achetez en toute sécurité</h1>
                        <p>Thunder facilite l'achat de nouvelles cartes avec une plateforme sécurisée et des outils professionnels et accessibles !<br/><br/>
                            Achetez au meilleur prix grâce à notre système de suivi en temps réel.<br/><br/>
                            Nos outils d'estimation et notre échelle de notation fiable et transparente vous aident à dénicher rapidement de nouvelles pépites !</p>
                    </div>
                </div>
            </div>
            <div className="box-bottom">
                <div className="container">
                    <div className="text">
                        <h1>Achetez et vendez vos cartes en toute tranquilité sur CarteX</h1>
                        <div className="btn">
                            <Link to='/Register' className='btn1'>Inscription</Link>
                            <Link to='/Marketplace' className='btn2'>Marketplace</Link>
                        </div>
                    </div>
                    <div className="img">
                        <img src="https://i.pinimg.com/564x/0a/49/59/0a49597a7277114a1fd03e0bd0ca6b81.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}