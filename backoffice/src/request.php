<?php
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php";
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/DAO.php";
    
    $DAO = new DAO($connexion);

    $userHome = "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/user_panel.php";
    
    switch ($_POST['userSelection']) {
        case 1:
            $user = $DAO->addUser($_POST['userPseudo'],$_POST['userMdp'],$_POST['userMdp']);
            header('location: ' . $userHome);
            break;
        case 2:
            break;
        case 3:
            break;
        case 4;
            break;
    }
?>