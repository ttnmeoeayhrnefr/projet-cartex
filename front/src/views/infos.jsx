import "../style/infos.scss"

export default function Infos() {
    return (
        <div className="content-infos">
            <div className="title">
                <h2>Projet carteX</h2>
            </div>
            <div className="describe">
                <span>Dans le cadre de notre 2ème année de Prépa Bachelor, nous devons réaliser un marketplace de carte Yu-Gi-Oh!.
                    Dans celui ci, nous devions faire en sorte d'avoir un marketplace avec toutes les cartes disponibles dans notre$
                    base de données. L'utilisateur doit également pouvoir créer, modifier ainsi que supprimer ses cartes. Il doit
                    également y avoir un système de filtre afin de simplifier les recherches et l'ergonomie du site web.
                </span>
            </div>
            <div className="team">
                <h2>Team</h2>
                <div className="item-team">
                    <div id="container-colab">
                        <div className="img"></div>
                        <div className="name">
                            <p>ROMERO Raphaël</p>
                            <p>Ecole IPSSI - Paris</p>
                            <p>BTC2 25.1</p>
                            <a href="https://github.com/RaphTPLR"><img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/linkedin-2.png" alt="" /></a>
                        </div>
                    </div>
                    <div id="container-colab">
                        <div className="img"></div>
                        <div className="name">
                            <p>KORZENIOWSKI Rémi</p>
                            <p>Ecole IPSSI - Paris</p>
                            <p>BTC2 25.1</p>
                            <a href="https://github.com/Korzeremi"><img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/linkedin-2.png" alt="" /></a>
                        </div>
                    </div>
                    <div id="container-colab">
                        <div className="img"></div>
                        <div className="name">
                            <p>DO Alexandre</p>
                            <p>Ecole IPSSI - Paris</p>
                            <p>BTC2 25.1</p>
                            <a href="https://github.com/Purplezer"><img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/linkedin-2.png" alt="" /></a>
                        </div>
                    </div>
                    <div id="container-colab">
                        <div className="img"></div>
                        <div className="name">
                            <p>MENANT--FERRY Théo</p>
                            <p>Ecole IPSSI - Paris</p>
                            <p>BTC2 25.1</p>
                            <a href="https://github.com/ttnmeoeayhrnefr"><img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/linkedin-2.png" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}