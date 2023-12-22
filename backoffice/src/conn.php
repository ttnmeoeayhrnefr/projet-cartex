<?php
    
    include '/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php';
    include '/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/DAO.php';

    $dao = new DAO($connexion);

    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['logUser']) && isset($_POST['logPwd'])) {
            $username = $_POST['logUser'];
            $password = $_POST['logPwd'];

            $user = $dao->listUserByUsername($username);
            session_destroy();

            if ($user && $user['role'] == '1' && password_verify($password, $user['mdp'])) {
                session_start();
                setcookie('role','1');
                header("Location: home_panel.php");
                exit();
            } else {
                session_destroy();
                echo "identifiant et/ou mdp incorrect";
                header("Location: panel.php");
            }
        }
    }
?>