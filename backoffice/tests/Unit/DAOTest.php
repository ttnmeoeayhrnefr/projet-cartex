<?php

require_once("./src/DAO.php");

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
    }

    public function testAddUser()
    {
        $pseudo = 'test_user';
        $password = 'test_password';
        $role = '0';

        $this->dao->addUser($pseudo, $password, $role);

        $user = $this->dao->listUserById(1);

        $this->assertEquals($pseudo, $user['pseudo']);
        $this->assertTrue(password_verify($password, $user['mdp']));
        $this->assertEquals($role, $user['role']);
    }

    public function testUpdateUserById()
    {
        $pseudo = 'updated_user';
        $password = 'updated_password';
        $role = '1';
        $id = 1;

        $this->dao->updateUserById($pseudo, $password, $role, $id);

        $updatedUser = $this->dao->listUserById($id);

        $this->assertEquals($pseudo, $updatedUser['pseudo']);
        $this->assertTrue(password_verify($password, $updatedUser['mdp']));
        $this->assertEquals($role, $updatedUser['role']);
    }

    public function testRemoveUserById()
    {
        $id = 1;

        $this->assertTrue($this->dao->removeUserById($id));
        $user = $this->dao->listUserById($id);

        $this->assertEmpty($user);
    }

}
