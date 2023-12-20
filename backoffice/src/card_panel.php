<?php
include "./config.php";
include "./DAO.php";

$DAO = new DAO($connexion);
$card = $DAO->listAllCards();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card - AdminPanel</title>
    <link rel="stylesheet" href="style.scss">
</head>

<body>
    <div class="page-sct">
        <div class="navbar-sct">
            <div class="logo-sct">
                <h1>Panneau d'administration</h1>
            </div>
            <div class="disconnect-btn">
                <a href="panel.php" id="aDisc">
                    <img src="assets/logout.svg" alt="logout" id="disco">
                </a>
            </div>
        </div>
        <div class="panel-sct">
            <div class="home-sct">
                <div class="left-btn">
                    <a href="user_panel.php" id="a3l">
                        <img src="assets/l_chevron.svg" alt="left button" id="l_chev3">
                    </a>
                </div>
                <div class="content-sct">
                    <div class="user-sct">
                        <div class="title-sct">
                            <h2 id="Usr">
                                Gestion cartes Yu-Gi-Oh !
                            </h2>
                        </div>
                        <div class="gest-sct">
                            <div class="cardUpdateSct">
                                <?php
                                echo "<table>";
                                echo "<td><a href='card_add.php'>Ajouter carte</a></td>";
                                echo "<tr><th>ID</th><th>Nom</th><th>Description</th><th>Ebay_Price</th><th>Actions</th></tr>";
                                foreach ($card as $cd) {
                                    echo "<tr>";
                                    echo "<td>" . $cd['id_carte'] . "</td>";
                                    echo "<td>" . $cd['nom'] . "</td>";
                                    echo "<td>" . $cd['description'] . "</td>";
                                    echo "<td>" . $cd['ebay_price'] . "</td>";
                                    echo "<td><a href='card_add.php?userId=" . $cd['id_user'] . "'>Modifier carte</a></td>";
                                    echo "<td><a href='request.php'>Supprimer carte</a></td>";
                                    echo "</tr>";
                                }
                                echo "</table>";
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-btn">
                    <img src="assets/r_chevron.svg" alt="right button" id="r_chev3">
                </div>
            </div>
        </div>
    </div>
</body>

</html>