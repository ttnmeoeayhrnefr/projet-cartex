import '../style/marketplace.scss'

export default function MarketPlace() {
    const generateCardList = () => {
        const cardList = [];
    
        for (let i = 0; i < 10; i++) {
          cardList.push(
            <div className="card" key={i}>
              <div className="title">
                <span>Title</span>
                <p>#152354751255</p>
              </div>
              <div className="img">
                <img src="https://i.pinimg.com/564x/2d/e0/b7/2de0b7946bb7c8427018694ce5464709.jpg" alt="" />
              </div>
              <div className="describe">
                <div className="price">
                  <span>1.99$</span>
                </div>
              </div>
            </div>
          );
        }
    
        return cardList;
      };
    return (
        <div className="content-mkp">
            <div className="header">
                <h2>Bienvenue sur CarteX,</h2>
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