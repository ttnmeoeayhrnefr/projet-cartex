<?php

require_once("./projet-cartex/backoffice/src/DAO.php");

use PHPUnit\Framework\TestCase;

class DAOTest extends TestCase
{
    public function testListAllUsers()
    {
        // Créer un objet PDO fictif pour simuler la connexion à la base de données
        $fakePDO = $this->createMock(PDO::class);

        // Créer un objet DAO avec le faux PDO
        $dao = new DAO($fakePDO);

        // Données fictives d'utilisateurs pour tester la méthode listAllUsers
        $fakeUsersData = [
            ['id_user' => 1, 'pseudo' => 'utilisateur1', 'mdp' => 'motdepasse1', 'role' => 'role1'],
            ['id_user' => 2, 'pseudo' => 'utilisateur2', 'mdp' => 'motdepasse2', 'role' => 'role2'],
            // Ajouter d'autres données fictives si nécessaire
        ];

        // Mock de l'exécution de la requête SQL pour simuler le résultat de la base de données
        $stmtMock = $this->createMock(PDOStatement::class);
        $stmtMock->method('fetchAll')->willReturn($fakeUsersData);

        // Mock de la préparation de la requête SQL pour simuler l'exécution réussie
        $fakePDO->method('prepare')->willReturn($stmtMock);

        // Appeler la méthode à tester
        $result = $dao->listAllUsers();

        // Vérifier si la méthode retourne un tableau de données d'utilisateurs
        $this->assertIsArray($result);
        // Vérifier le nombre d'utilisateurs retournés
        $this->assertCount(count($fakeUsersData), $result);
        // Vous pouvez également ajouter d'autres assertions pour vérifier la structure des données retournées

        // Vérifier l'exécution de la méthode PDO prepare
        $fakePDO->expects($this->once())->method('prepare');

        // Vérifier l'appel à fetchAll sur le PDOStatement
        $stmtMock->expects($this->once())->method('fetchAll');
    }
}
