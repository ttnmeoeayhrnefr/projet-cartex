<?php
    require '/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php';
    try {
        echo "TRUE";
    } catch (PDOException $e) {
        echo "WRONG" . $e->getMessage();
    }
    class Cards {
        private $id;
        private $nom;
        private $image;
        private $image_small;
        private $image_cropped;
        private $id_konami;
        private $description;
        private $type;
        private $race;
        private $attack;
        private $defense;
        private $stars;
        private $archetype;
        private $attribute;
        private $cardmarket_price;
        private $tcgplayer_price;
        private $ebay_price;
        private $amazon_price;
        private $set_nom;
        private $set_rarete;
    }
    class Utilisateurs {
        private $id;
        private $pseudo;
        private $password;
        private $role;

        public function __construct($id, $pseudo, $password, $role) {
            $this->id = $id;
            $this->pseudo = $pseudo;
            $this->password = $password;
            $this->role = $role;
        }

        public function getId() {
            return $this->id;
        }
        public function getPseudo() {
            return $this->pseudo;
        }
        public function getPassword() {
            return $this->password;
        }
        public function getRole() {
            return $this->role;
        }
        
        public function setId($id) {
            $this->id = $id;
        }
        public function setPseudo($pseudo) {
            $this->pseudo = $pseudo;
        }
        public function setPassword($password) {
            $this->password = $password;
        }
        public function setRole($role) {
            $this->role = $role;
        }

    }
    class DAO {

    }
?>