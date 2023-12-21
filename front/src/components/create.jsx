import '../style/create.scss'

export default function Create() {
  return (
    <div className="create-page">
        <div className="container">
            <h1>Création d'une carte</h1>
            <div className="content-create">
                <div className="visualisation">
                    <div className="img">

                    </div>
                </div>
                <div className="choices">
                    <div className="first-box">
                        <div className="name">
                            <input type="text" placeholder='Nom...' required/>
                        </div>
                        <div className="etoiles">
                            <input type="text" placeholder='Etoiles...' required/>
                        </div>
                        <div className="type">
                            <input type="text" placeholder='Type...' required/>
                        </div>
                    </div>
                    <div className="description">
                        <textarea placeholder='Description...' required/>
                    </div>
                    <div className="stats">
                        <div className="image">
                            <input type="file" placeholder='image'/>
                        </div>
                        <div className="attaque">
                            <input type="text" placeholder='Attaque...' required/>
                        </div>
                        <div className="defense">
                            <input type="text" placeholder='Defense...' required/>
                        </div>
                    </div>
                    <div className="special">
                        <div className="race">
                            <input type="text" placeholder='Race...' required/>
                        </div>
                        <div className="archetype">
                            <input type="text" placeholder='Archetype...' />
                        </div>
                        <div className="attribut">
                            <input type="text" placeholder='Attribut...' required/>
                        </div>
                    </div>
                    <div className="set">
                        <div className="collection">
                            <input type="text" placeholder='Collection'/>
                        </div>
                        <div className="rarete">
                            <input type="text" placeholder='Rareté...' required/>
                        </div>
                    </div>
                    <div className="price">
                        <div className="cmkt">
                            <input type="text" placeholder='Cardmarket Price...' required/>
                        </div>
                        <div className="tcgp">
                            <input type="text" placeholder='Tgcplayer Price...' required/>
                        </div>
                        <div className="ebay">
                            <input type="text" placeholder='Ebay...' required/>
                        </div>
                        <div className="amazon">
                            <input type="text" placeholder='Amazon...' required/>
                        </div>
                    </div>
                    <div className="submit">
                        <span>CREER</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
