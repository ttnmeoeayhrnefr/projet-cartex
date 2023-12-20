<?php
include "./config.php";
include "./DAO.php";

$DAO = new DAO($connexion);

$userHome = "./user_panel.php";

switch ($_POST['userSelection']) {
    case 1:
        $user = $DAO->addUser($_POST['userPseudo'], $_POST['userMdp'], $_POST['userMdp']);
        header('location: ' . $userHome);
        break;
    case 2:
        break;
    case 3:
        break;
    case 4;
        break;
}
