<?php
    require '/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php';
    try {
        echo "TRUE";
    } catch (PDOException $e) {
        echo "WRONG" . $e->getMessage();
    }
    class Cards {
        // CRUD card 
    }
    class Utilisateurs {
        // if user admin ?
        // CRUD user 
    }
    class DAO {}
?>