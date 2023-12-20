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
        $this->pdo = new PDO(
            sprintf(
                'mysql:host=%s;port=%s;dbname=%s',
                getenv('DB_HOST'),
                getenv('DB_PORT'),
                getenv('DB_DATABASE')
            ),
            getenv('DB_USERNAME'),
            getenv('DB_PASSWORD')
        );

        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
}
