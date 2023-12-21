import '../style/create.scss'

export default function Create() {
  return (
    <div className="create-page">
        <div className="container">
            <h1>Creation d'une carte</h1>
            <div className="content-create">
                <div className="visualisation">
                    <div className="img">

                    </div>
                </div>
                <div className="choices">
                    <div className="name">
                        <input type="text" placeholder='Nom...'/>
                    </div>
                    <div className="type">
                        <input type="text" placeholder='Type...'/>
                    </div>
                    <div className="description">
                        <input type="text" placeholder='Description...'/>
                    </div>
                    <div className="image">
                        <input type="file" placeholder='image'/>
                    </div>
                    <div className="race">
                        <input type="text" placeholder='Race...'/>
                    </div>
                    <div className="archetype">
                        <input type="text" placeholder='Archetype...'/>
                    </div>
                    <div className="attaque">
                        <input type="text" placeholder='Attaque...'/>
                    </div>
                    <div className="defense">
                        <input type="text" placeholder='Defense...'/>
                    </div>
                    <div className="etoiles">
                        <input type="text" placeholder='Etoiles...'/>
                    </div>
                    <div className="attribut">
                        <input type="text" placeholder='Attribut...'/>
                    </div>
                    <div className="cmkt">
                        <input type="text" placeholder='Cardmarket Price...'/>
                    </div>
                    <div className="tcgp">
                        <input type="text" placeholder='Tgcplayer Price...'/>
                    </div>
                    <div className="ebay">
                        <input type="text" placeholder='Ebay...'/>
                    </div>
                    <div className="amazon">
                        <input type="text" placeholder='Amazon...'/>
                    </div>
                    <div className="collection">
                        <input type="text" placeholder='Collection'/>
                    </div>
                    <div className="rarete">
                        <input type="text" placeholder='Rareté...'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
