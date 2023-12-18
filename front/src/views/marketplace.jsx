import '../style/marketplace.scss'

export default function MarketPlace() {
    return (
        <div className="content-mkp">
            <div className="header">
                <h2>Bienvenue sur CarteX,</h2>
                <p>Trouve les cartes que tu désires !</p>
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
        </div>
    )
}