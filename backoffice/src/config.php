<?php
require '/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
    $hote = $_ENV['DB_HOST'];
    $port = $_ENV['DB_PORT'];
    $utilisateur = $_ENV['DB_USER'];
    $motDePasse = $_ENV['DB_PASS'];
    $nomDeLaBase = $_ENV['DB_NAME'];

    $connexion = new PDO("mysql:host=$hote;port=$port;dbname=$nomDeLaBase", $utilisateur, $motDePasse);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion à la base de données: " . $e->getMessage();
    die();
}
?>
