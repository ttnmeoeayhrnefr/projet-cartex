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

    public function testAddCard()
    {
        $nom = 'test Test';
        $image = 'test_Test.jpg';
        $imageSmall = 'test_Test_small.jpg';
        $imageCropped = 'test_Test_cropped.jpg';
        $idKonami = '123456789';
        $description = 'Powerful with test magic.';
        $type = 'monstre';
        $race = 'spellcaster';
        $attack = 2500;
        $defense = 2100;
        $stars = 7;
        $archetype = 'test Test';
        $attribute = 'test';
        $cardmarketPrice = 50.00;
        $ebayPrice = 45.00;
        $amazonPrice = 48.00;
        $tcgplayerPrice = 55.00;
        $collection = 'Test\'s Collection';
        $rarete = 'Ultra Rare';
    
        $cardId = $this->dao->addCard($nom, $image, $imageSmall, $imageCropped, $idKonami, $description, $type, $race, $attack, $defense, $stars, $archetype, $attribute, $cardmarketPrice, $ebayPrice, $amazonPrice, $tcgplayerPrice, $collection, $rarete);
    
        $this->assertNotEmpty($cardId, 'id_carte ne doit pas etre vide');
    
        $card = $this->dao->listCardById($cardId);
    
        $this->assertNotEmpty($card, 'carte ne doit pas etre vide');
    
        $this->assertEquals($nom, $card['nom']);
        $this->assertEquals($image, $card['image']);
        $this->assertEquals($imageSmall, $card['image_petite']);
        $this->assertEquals($imageCropped, $card['image_cropped']);
        $this->assertEquals($idKonami, $card['id_carte_konami']);
        $this->assertEquals($description, $card['description']);
        $this->assertEquals($type, $card['type']);
        $this->assertEquals($race, $card['race']);
        $this->assertEquals($attack, $card['attaque']);
        $this->assertEquals($defense, $card['defense']);
        $this->assertEquals($stars, $card['etoiles']);
        $this->assertEquals($archetype, $card['archetype']);
        $this->assertEquals($attribute, $card['attribut']);
        $this->assertEquals($cardmarketPrice, $card['cardmarket_price']);
        $this->assertEquals($ebayPrice, $card['ebay_price']);
        $this->assertEquals($amazonPrice, $card['amazon_price']);
        $this->assertEquals($tcgplayerPrice, $card['tcgplayer_price']);
        $this->assertEquals($collection, $card['set_nom']);
        $this->assertEquals($rarete, $card['set_rarete']);

        return $cardId;
    }
    

        public function testUpdateCardById()
    {
        $nom = 'Updated Test Card';
        $image = 'updated_test_card.jpg';
        $imageSmall = 'updated_test_card_small.jpg';
        $imageCropped = 'updated_test_card_cropped.jpg';
        $idKonami = '987654321';
        $description = 'Updated description for the test card.';
        $type = 'monstre';
        $race = 'dragon'; 
        $attack = 3000; 
        $defense = 2500; 
        $stars = 8; 
        $archetype = 'Updated Archetype';
        $attribute = 'light'; 
        $cardmarketPrice = 60.00; 
        $ebayPrice = 55.00; 
        $amazonPrice = 58.00; 
        $tcgplayerPrice = 65.00; 
        $collection = 'Updated Collection';
        $rarete = 'Secret Rare'; 

        $id = $this->testAddCard();

        $this->dao->updateCardById(
            $nom,
            $image,
            $imageSmall,
            $imageCropped,
            $idKonami,
            $description,
            $type,
            $race,
            $attack,
            $defense,
            $stars,
            $archetype,
            $attribute,
            $cardmarketPrice,
            $ebayPrice,
            $amazonPrice,
            $tcgplayerPrice,
            $collection,
            $rarete,
            $id
        );

        $updatedCard = $this->dao->listCardById($id);

        $this->assertNotEmpty($updatedCard, 'The updated card should not be empty');
        $this->assertEquals($nom, $updatedCard['nom']);
        $this->assertEquals($image, $updatedCard['image']);
        $this->assertEquals($imageSmall, $updatedCard['image_petite']);
        $this->assertEquals($imageCropped, $updatedCard['image_cropped']);
        $this->assertEquals($idKonami, $updatedCard['id_carte_konami']);
        $this->assertEquals($description, $updatedCard['description']);
        $this->assertEquals($type, $updatedCard['type']);
        $this->assertEquals($race, $updatedCard['race']);
        $this->assertEquals($attack, $updatedCard['attaque']);
        $this->assertEquals($defense, $updatedCard['defense']);
        $this->assertEquals($stars, $updatedCard['etoiles']);
        $this->assertEquals($attribute, $updatedCard['attribut']);
        $this->assertEquals($cardmarketPrice, $updatedCard['cardmarket_price']);
        $this->assertEquals($ebayPrice, $updatedCard['ebay_price']);
        $this->assertEquals($amazonPrice, $updatedCard['amazon_price']);
        $this->assertEquals($tcgplayerPrice, $updatedCard['tcgplayer_price']);
        $this->assertEquals($collection, $updatedCard['set_nom']);
        $this->assertEquals($rarete, $updatedCard['set_rarete']);
    }


    public function testRemoveCardById()
    {
        $id = $this->testAddCard();

        $this->assertTrue($this->dao->removeCardById($id));
        $card = $this->dao->listCardById($id);

        $this->assertEmpty($card, 'carte devrait être vide à id correspondant apres suppression');
    }

}
