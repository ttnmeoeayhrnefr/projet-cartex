<?php
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php";
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/DAO.php";

    if($_COOKIE['role']==1) {
?>

<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CardUpdate - AdminPanel</title>
        <link rel="stylesheet" href="style.scss">
    </head>
    <body>
        <div class="page-sct">
            <div class="navbar-sct">
                <div class="logo-sct">
                    <h1>Panneau d'administration</h1>
                </div>
                <div class="disconnect-btn">
                    <a href="disc.php" id="aDisc">
                        <img src="assets/logout.svg" alt="logout" id="disco">
                    </a>
                </div>
            </div>
            <div class="panel-sct">
                <div class="home-sct">
                    <div class="left-btn">
                        <a href="card_panel.php" id="a2l">
                            <img src="assets/l_chevron.svg" alt="left button" id="l_chev2">
                        </a>
                    </div>
                    <div class="content-sct">
                        <div class="user-sct">
                            <div class="title-sct">
                                <h2 id="card">
                                    Nouvelle carte  
                                </h2>
                            </div>
                            <div class="gest-sct">
                                <div class="addCardSct">
                                    <form action="request.php?req=4" method="post">
                                        <div class="cardAddSct">
                                            <div class="cardNomSct">
                                                <label for="cardNom">Nom</label>
                                                <input type="text" name="cardNom" id="cardNom" value="" required>
                                            </div>
                                            <div class="cardImgSct">
                                                <label for="cardImg">Image (URL)</label>
                                                <input type="text" name="cardImg" id="cardImg" value="" required>
                                            </div>
                                            <div class="cardImgPetiteSct">
                                                <label for="cardImgPetite">Image petite (URL)</label>
                                                <input type="text" name="cardImgPetite" id="cardImgPetite" value="" required>
                                            </div>
                                            <div class="cardImgCroppedSct">
                                                <label for="cardImgCropped">Image rognée (URL)</label>
                                                <input type="text" name="cardImgCropped" id="cardImgCropped" value="" required>
                                            </div>
                                            <div class="cardIdKonamiSct">
                                                <label for="cardIdKonami">Id Konami</label>
                                                <input type="text" name="cardIdKonami" id="cardIdKonami" value="">
                                            </div>
                                            <div class="cardDescrSct">
                                                <label for="cardDescr">Description</label>
                                                <input type="text" name="cardDescr" id="cardDescr" value="">
                                            </div>
                                            <div class="cardTypeSct">
                                                <label for="cardType">Type</label>
                                                <input type="text" name="cardType" id="cardType" value="">
                                            </div>
                                            <div class="cardRaceSct">
                                                <label for="cardRace">Race</label>
                                                <input type="text" name="cardRace" id="cardRace" value="">
                                            </div>
                                            <div class="cardAttackSct">
                                                <label for="cardAttack">Attack</label>
                                                <input type="text" name="cardAttack" id="cardAttack" value="">
                                            </div>
                                            <div class="cardDefenseSct">
                                                <label for="cardDefense">Defense</label>
                                                <input type="text" name="cardDefense" id="cardDefense" value="">
                                            </div>
                                            <div class="cardStarsSct">
                                                <label for="cardStars">Étoile</label>
                                                <input type="text" name="cardStars" id="cardStars" value="">
                                            </div>
                                            <div class="cardArchetypeSct">
                                                <label for="cardArchetype">Archetype</label>
                                                <input type="text" name="cardArchetype" id="cardArchetype" value="">
                                            </div>
                                            <div class="cardAttributSct">
                                                <label for="cardAttribut">Attribut</label>
                                                <input type="text" name="cardAttribut" id="cardAttribut" value="">
                                            </div>
                                            <div class="cardPriceCardmarketSct">
                                                <label for="cardPriceCardmarket">Prix Cardmarket</label>
                                                <input type="text" name="cardPriceCardmarket" id="cardPriceCardmarket" value="">
                                            </div>
                                            <div class="cardPriceTcgPlayerSct">
                                                <label for="cardPriceTcgPlayer">Prix TcgPlayer</label>
                                                <input type="text" name="cardPriceTcgPlayer" id="cardPriceTcgPlayer" value="">
                                            </div>
                                            <div class="cardPriceEbaySct">
                                                <label for="cardPriceEbay">Prix Ebay</label>
                                                <input type="text" name="cardPriceEbay" id="cardPriceEbay" value="">
                                            </div>
                                            <div class="cardPriceAmazonSct">
                                                <label for="cardPriceAmazon">Prix Amazon</label>
                                                <input type="text" name="cardPriceAmazon" id="cardPriceAmazon" value="">
                                            </div>
                                            <div class="cardCollectionSct">
                                                <label for="cardCollection">Collection</label>
                                                <input type="text" name="cardCollection" id="cardCollection" value="">
                                            </div>
                                            <div class="cardRareteSct">
                                                <label for="cardRarete">Rareté</label>
                                                <input type="text" name="cardRarete" id="cardRarete" value="">
                                            </div>
                                            <div class="submitSct">
                                                <input type="submit" value="Créer carte">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </body>
</html>

<?php
    } else {
        echo "vous n'avez pas les droits";
    }
?>