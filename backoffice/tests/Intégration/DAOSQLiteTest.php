<?php

use PHPUnit\Framework\TestCase;

require_once("./backoffice/src/DAO.php");

class DAOSQLiteTest extends TestCase
{
    protected $pdo;

    protected function setUp(): void
    {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->pdo->exec('CREATE TABLE carte (
            id_carte INTEGER(11) PRIMARY KEY,
            nom VARCHAR(255),
            image VARCHAR(255),
            image_small VARCHAR(255),
            image_cropped VARCHAR(255),
            id_carte_konami VARCHAR(255),
            description TEXT,
            type VARCHAR(255),
            race VARCHAR(255),
            attaque INTEGER(11),
            defense INTEGER(11),
            etoiles INTEGER(11),
            archetype VARCHAR(255),
            attribut VARCHAR(255),
            cardmarket_price DECIMAL(10, 2),
            tcgplayer_price DECIMAL(10, 2),
            ebay_price DECIMAL(10, 2),
            amazon_price DECIMAL(10, 2),
            set_nom VARCHAR(255),
            set_rarete VARCHAR(255)
        )');

        $this->pdo->exec('CREATE TABLE utilisateur (
            id_user INTEGER(11) PRIMARY KEY,
            pseudo VARCHAR(255),
            mdp VARCHAR(255),
            role VARCHAR(255)
        )');
    }

    public function testListAllUsers()
    {
        $dao = new DAO($this->pdo);

        $dao->addUser('user1', 'password1', 'role1');
        $dao->addUser('user2', 'password2', 'role2');
        $dao->addUser('user3', 'password3', 'role3');

        $users = $dao->listAllUsers();

        $this->assertCount(3, $users);

        $this->assertEquals('user1', $users[0]['pseudo']);
        $this->assertEquals('role1', $users[0]['role']);
    }

    public function testListUserById()
    {
        $dao = new DAO($this->pdo);

        $dao->addUser('user1', 'password1', 'role1');
        $dao->addUser('user2', 'password2', 'role2');
        $dao->addUser('user3', 'password3', 'role3');

        $userId = $dao->listAllUsers()[0]['id_user'];

        $user = $dao->listUserById($userId);

        $this->assertNotEmpty($user);
        $this->assertEquals('user1', $user[0]['pseudo']);
    }

    public function testAddUser()
    {
        $dao = new DAO($this->pdo);

        $result = $dao->addUser('user4', 'password4', 'role4');

        $this->assertTrue($result);

        $addedUser = $dao->listUserById($this->pdo->lastInsertId());

        $this->assertNotEmpty($addedUser);
        $this->assertEquals('user4', $addedUser[0]['pseudo']);
        $this->assertEquals('role4', $addedUser[0]['role']);
    }
}
