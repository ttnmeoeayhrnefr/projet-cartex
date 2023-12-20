<?php
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php";
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/DAO.php";
    
    $DAO = new DAO($connexion);

    $userHome = "/projet-cartex/backoffice/src/user_panel.php";
    $cardHome = "/projet-cartex/backoffice/src/card_panel.php";
    
    if (isset($_GET['req'])) {
        switch ($_GET['req']) {
            case 1:
                $pseudo = $_POST['userPseudo'];
                $mdp = $_POST['userMdp'];
                $role = $_POST['userRole'];
                $user = $DAO->addUser($pseudo, $mdp, $role);
                header('location: ' . $userHome);
                break;
            case 2:
                $pseudo = $_POST['userPseudo'];
                $mdp = $_POST['userMdp'];
                $role = $_POST['userRole'];
                $id = $_GET['id'];
                $user = $DAO->updateUserById($pseudo, $mdp, $role, $id);
                header('location: ' . $userHome);
                break;
            case 3:
                $id = $_GET['id'];
                $user = $DAO->removeUserById($id);
                header('location: ' . $userHome);
                break;
            case 4:
                $nom = $_POST['cardNom']; 
                $image = $_POST['cardImg'];
                $image_small = $_POST['cardImgPetite'];
                $image_cropped = $_POST['cardImgCropped'];
                $id_Konami = $_POST['cardIdKonami'];
                $description = $_POST['cardDescr'];
                $type = $_POST['cardType'];
                $race = $_POST['cardRace'];
                $attack = $_POST['cardAttack'];
                $defense = $_POST['cardDefense'];
                $etoile = $_POST['cardStars'];
                $archetype = $_POST['cardArchetype'];
                $attribut = $_POST['cardAttribut'];
                $prix_cardmarket = $_POST['cardPriceCardmarket'];
                $prix_tcgPlayer = $_POST['cardPriceTcgPlayer'];
                $prix_ebay = $_POST['cardPriceEbay'];
                $prix_amazon = $_POST['cardPriceAmazon'];
                $collection = $_POST['cardCollection'];
                $rareté = $_POST['cardRarete'];
                $card = $DAO->addCard($nom,$image,$image_small,$image_cropped,$id_Konami,$description,$type,$race,$attack,$defense,$etoile,$archetype,$attribut,$prix_cardmarket,$prix_ebay,$prix_amazon,$prix_tcgPlayer,$collection,$rareté);
                header('location: ' . $cardHome);
                break;
            case 5:
                break;
            case 6:
                $id = $_GET['id'];
                $card = $DAO->removeCardById($id);
                header('location: ' . $cardHome);
                break;
        }
    }
?>
