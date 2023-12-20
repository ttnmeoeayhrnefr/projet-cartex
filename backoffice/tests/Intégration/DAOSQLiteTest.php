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

    public function testUpdateUserById()
    {
        $dao = new DAO($this->pdo);

        $dao->addUser('userToUpdate', 'passwordToUpdate', 'oldRole');

        $userId = $this->pdo->lastInsertId();

        $result = $dao->updateUserById('updatedUser', 'updatedPassword', 'newRole', $userId);

        $this->assertTrue($result);

        $updatedUser = $dao->listUserById($userId);

        $this->assertNotEmpty($updatedUser);
        $this->assertEquals('updatedUser', $updatedUser[0]['pseudo']);
        $this->assertEquals('newRole', $updatedUser[0]['role']);
    }

    public function testRemoveUserById()
    {
        $dao = new DAO($this->pdo);

        $dao->addUser('userToRemove', 'passwordToRemove', 'roleToRemove');

        $userId = $this->pdo->lastInsertId();

        $result = $dao->removeUserById($userId);

        $this->assertTrue($result);

        $removedUser = $dao->listUserById($userId);

        $this->assertEmpty($removedUser);
    }

    public function testAddCard()
    {
        $dao = new DAO($this->pdo);

        $result = $dao->addCard(
            1,
            'name',
            'image.jpg',
            'small_image.jpg',
            'cropped_image.jpg',
            '1234',
            'description',
            'type',
            'race',
            1,
            2,
            3,
            'archetype',
            'attribute',
            1,
            2,
            3,
            4,
            'rare'
        );

        $this->assertTrue($result);

        $addedCard = $dao->listCardById(1);

        $this->assertNotEmpty($addedCard);
        $this->assertEquals('name', $addedCard[0]['nom']);
        $this->assertEquals('type', $addedCard[0]['type']);
    }

    public function testListAllCards()
    {
        $dao = new DAO($this->pdo);

        $dao->addCard(
            1,
            'name',
            'image.jpg',
            'small_image.jpg',
            'cropped_image.jpg',
            '1234',
            'description',
            'type',
            'race',
            1,
            2,
            3,
            'archetype',
            'attribute',
            1,
            2,
            3,
            4,
            'rare'
        );

        $dao->addCard(
            2,
            'name2',
            'image2.jpg',
            'small_image2.jpg',
            'cropped_image2.jpg',
            '12342',
            'description2',
            'type2',
            'race2',
            12,
            22,
            32,
            'archetype2',
            'attribute2',
            12,
            22,
            32,
            42,
            'rare'
        );

        $cards = $dao->listAllCards();

        $this->assertCount(2, $cards);

        $this->assertEquals('name', $cards[0]['nom']);
        $this->assertEquals('type2', $cards[1]['type']);
    }

    public function testListCardById()
    {
        $dao = new DAO($this->pdo);

        $dao->addCard(
            1,
            'name',
            'image.jpg',
            'small_image.jpg',
            'cropped_image.jpg',
            '1234',
            'description',
            'type',
            'race',
            1,
            2,
            3,
            'archetype',
            'attribute',
            1,
            2,
            3,
            4,
            'rare'
        );

        $card = $dao->listCardById(1);

        $this->assertNotEmpty($card);
        $this->assertEquals('name', $card[0]['nom']);
    }

    public function testUpdateCardById()
    {
        $dao = new DAO($this->pdo);

        $dao->addCard(
            1,
            'name',
            'image.jpg',
            'small_image.jpg',
            'cropped_image.jpg',
            '1234',
            'description',
            'type',
            'race',
            1,
            2,
            3,
            'archetype',
            'attribute',
            1,
            2,
            3,
            4,
            'rare'
        );

        $result = $dao->updateCardById(
            2,
            'name2',
            'image2.jpg',
            'small_image2.jpg',
            'cropped_image2.jpg',
            '12342',
            'description2',
            'type2',
            'race2',
            12,
            22,
            32,
            'archetype2',
            'attribute2',
            12,
            22,
            32,
            42
        );

        $this->assertTrue($result);

        $updatedCard = $dao->listCardById(1);

        $this->assertNotEmpty($updatedCard);
        $this->assertEquals('name2', $updatedCard[0]['nom']);
        $this->assertEquals('type2', $updatedCard[0]['type']);
    }

    public function testRemoveCardById()
    {
        $dao = new DAO($this->pdo);

        $dao->addCard(
            1,
            'name',
            'image.jpg',
            'small_image.jpg',
            'cropped_image.jpg',
            '1234',
            'description',
            'type',
            'race',
            1,
            2,
            3,
            'archetype',
            'attribute',
            1,
            2,
            3,
            4,
            'rare'
        );

        $result = $dao->removeCardById(1);

        $this->assertTrue($result);

        $removedCard = $dao->listCardById(1);

        $this->assertEmpty($removedCard);
    }

    public function testAddUserInvalidUsername()
    {
        $this->expectException(InvalidArgumentException::class);
        $dao = new DAO($this->pdo);

        $dao->addUser('', 'password', '0');
    }

    public function testAddUserInvalidPassword()
    {
        $this->expectException(InvalidArgumentException::class);
        $dao = new DAO($this->pdo);

        $dao->addUser('pseudo', '', '1');
    }

    public function testAddUserInvalidRole()
    {
        $this->expectException(InvalidArgumentException::class);
        $dao = new DAO($this->pdo);

        $dao->addUser('pseudo', 'password', '2');
    }
}
