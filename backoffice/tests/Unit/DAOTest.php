<?php

require_once("/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/DAO.php");

use PHPUnit\Framework\TestCase;

class DAOTest extends TestCase
{
    private $pdo;
    private $dao;

    protected function setUp(): void
    {
        $this->configureDatabase();
        $this->dao = new DAO($this->pdo);
    }

    private function configureDatabase(): void
    {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        try {
            $hote = $_ENV['DB_HOST'];
            $port = $_ENV['DB_PORT'];
            $utilisateur = $_ENV['DB_USER'];
            $motDePasse = $_ENV['DB_PASS'];
            $nomDeLaBase = $_ENV['DB_NAME'];

            $this->pdo = new PDO("mysql:host=$hote;port=$port;dbname=$nomDeLaBase", $utilisateur, $motDePasse);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Erreur de connexion à la base de données: " . $e->getMessage();
            die();
        }
    }

    public function testAddUser()
    {
        $pseudo = 'test_user';
        $password = 'test_password';
        $role = '0';
    
        $userId = $this->dao->addUser($pseudo, $password, $role);
    
        $this->assertNotEmpty($userId, 'id_user ne doit pas etre vide');
    
        $user = $this->dao->listUserById($userId);
    
        $this->assertNotEmpty($user, 'utilisateur ne doit pas etre vide');
        $this->assertEquals($pseudo, $user['pseudo']);
        $this->assertTrue(password_verify($password, $user['mdp']), 'verification du mdp raté');
        $this->assertEquals($role, $user['role']);

        return $userId;
    }
    

public function testUpdateUserById()
{
    $pseudo = 'updated_user';
    $password = 'updated_password';
    $role = '1';

    $id = $this->testAddUser();

    $this->dao->updateUserById($pseudo, $password, $role, $id);

    $updatedUser = $this->dao->listUserById($id);

    $this->assertNotEmpty($updatedUser, 'l utilisateur modifié ne doit pas etre vide');
    $this->assertEquals($pseudo, $updatedUser['pseudo']);
    $this->assertTrue(password_verify($password, $updatedUser['mdp']), 'verification du mdp raté');
    $this->assertEquals($role, $updatedUser['role']);
}

public function testRemoveUserById()
{
    $id = $this->testAddUser();

    $this->assertTrue($this->dao->removeUserById($id));
    $user = $this->dao->listUserById($id);

    $this->assertEmpty($user, 'utilisateur devrait être vide à id correspondant apres suppression');
}

}
