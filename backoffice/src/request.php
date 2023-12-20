<?php
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php";
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/DAO.php";
    
    $DAO = new DAO($connexion);

    $userHome = "/projet-cartex/backoffice/src/user_panel.php";
    
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
                // Cas 4
                break;
        }
    }
?>
