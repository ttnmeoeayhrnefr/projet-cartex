<?php
    include '/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php';
    
    // try {
    //     echo "TRUE";
    // } catch (PDOException $e) {
    //     echo "WRONG" . $e->getMessage();
    // }
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

        public function __construct($id, $nom, $image, $image_small, $image_cropped, $id_konami, $description, $type, $race, $attack, $defense, $stars, $archetype, $attribute, $cardmarket_price, $tcgplayer_price, $amazon_price, $ebay_price, $set_nom, $set_rarete) {
            $this->id = $id;
            $this->nom = $nom;
            $this->image = $image;
            $this->$image_small = $image_small;
            $this->image_cropped = $image_cropped;
            $this->id_konami = $id_konami;
            $this->description = $description;
            $this->type = $type;
            $this->race = $race;
            $this->attack = $attack;
            $this->defense = $defense;
            $this->stars = $stars;
            $this->archetype = $archetype;
            $this->attribute = $attribute;
            $this->cardmarket_price = $cardmarket_price;
            $this->ebay_price = $ebay_price;
            $this->amazon_price = $amazon_price;
            $this->tcgplayer_price = $tcgplayer_price;
            $this->set_nom = $set_nom;
            $this->set_rarete = $set_rarete;
        }

        public function getId() {
            return $this->id;
        }
        public function getNom() {
            return $this->nom;
        }
        public function getImage() {
            return $this->image;
        }
        public function getImageSmall() {
            return $this->image_small;
        }
        public function getImageCropped() {
            return $this->image_cropped;
        }
        public function getIdKonami() {
            return $this->id_konami;
        }
        public function getDescription() {
            return $this->description;
        }
        public function getType() {
            return $this->type;
        }
        public function getRace() {
            return $this->race;
        }
        public function getAttack() {
            return $this->attack;
        }
        public function getDefense() {
            return $this->defense;
        }
        public function getStars() {
            return $this->stars;
        }
        public function getArchetype() {
            return $this->archetype;
        }
        public function getAttribute() {
            return $this->attribute;
        }
        public function getEbayPrice() {
            return $this->ebay_price;
        }
        public function getAmazonPrice() {
            return $this->amazon_price;
        }
        public function getCardmarketPrice() {
            return $this->cardmarket_price;
        }
        public function getTcgPlayerPrice() {
            return $this->tcgplayer_price;
        }
        public function getSetNom() {
            return $this->set_nom;
        }
        public function getSetRarete() {
            return $this->set_rarete;
        }

        public function setId($id) {
            $this->id = $id;
        }
        public function setNom($nom) {
            $this->nom = $nom;
        }
        public function setImage($image) {
            $this->image = $image;
        }
        public function setImageSmall($image_small) {
            $this->$image_small = $$image_small;
        }
        public function setImageCropped($image_cropped) {
            $this->image_cropped = $image_cropped;
        }
        public function setIdKonami($id_konami) {
            $this->id_konami = $id_konami;
        }
        public function setDescription($description) {
            $this->description = $description;
        }
        public function setType($type) {
            $this->type = $type;
        }
        public function setRace($race) {
            $this->race = $race;
        }
        public function setAttack($attack) {
            $this->attack = $attack;
        }
        public function setDefense($defense) {
            $this->defense = $defense;
        }
        public function setStars($stars) {
            $this->stars = $stars;
        }
        public function setArchetype($archetype) {
            $this->archetype = $archetype;
        }
        public function setAttribute($attribute) {
            $this->attribute = $attribute;
        }
        public function setCardmarketPrice($cardmarket_price) {
            $this->cardmarket_price = $cardmarket_price;
        }
        public function setEbayPrice($ebay_price) {
            $this->ebay_price = $ebay_price;
        }
        public function setAmazonPrice($amazon_price) {
            $this->amazon_price = $amazon_price;
        }
        public function setTcgplayerPrice($tcgplayer_price) {
            $this->tcgplayer_price = $tcgplayer_price;
        }
        public function setSetNom($set_nom) {
            $this->set_nom = $set_nom;
        }
        public function setSetRarete($set_rarete) {
            $this->set_rarete = $set_rarete;
        }
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
        private $bdd;

        public function __construct($bdd) {
            $this->bdd = $bdd;
        }

        public function listAllUsers() {
            try {
                $row = $this->bdd->prepare("SELECT * FROM utilisateur");
                $row->execute();
                return $row->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo "Erreur lors de l'affichage des utilisateurs: " . $e->getMessage();
                return [];
            }
        }
        public function listUserById($id_user) {
            try {
                $row = $this->bdd->prepare("SELECT * FROM utilisateur WHERE id_user = ?");
                $row->execute([$id_user]);
                return $row->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo "Erreur lors de l'affichage des utilisateurs par id: " . $e->getMessage();
                return [];
            }
        } 
        public function listUserPseudo($id_user) {
            try {
                $row = $this->bdd->prepare("SELECT pseudo FROM utilisateur WHERE id_user = ?");
                $row->execute([$id_user]);
                return $row->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo "Erreur lors de l'affichage du pseudo de l'utilisateur: " . $e->getMessage();
                return [];
            }
        }
        public function listUserPassword() {
            try {
                $row = $this->bdd->prepare("SELECT mdp FROM utilisateur");
                $row->execute();
                return $row->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo "Erreur lors de l'affichage des mots de passe utilisateurs: " . $e->getMessage();
                return [];
            }
        }
        public function listUserRole() {
            try {
                $row = $this->bdd->prepare("SELECT role FROM utilisateur");
                $row->execute();
                return $row->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo "Erreur lors de l'affichage des rôles utilisateurs: " . $e->getMessage();
                return [];
            }
        }    


        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------


        public function addUser($pseudo, $mdp, $role) {
            try {
                $row = $this->bdd->prepare("INSERT INTO utilisateur(pseudo, mdp, role) VALUES(:pseudo, :mdp, :role)");
                $row->bindParam(':pseudo', $pseudo);
                $row->bindParam(':mdp', $mdp);
                $row->bindParam(':role', $role);
                $row->execute();
                return true; 
            } catch (PDOException $e) {
                echo "Erreur lors de l'ajout de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }   
        public function addUserPseudo($pseudo, $id_user) {
            try {
                $row = $this->bdd->prepare("INSERT INTO utilisateur(pseudo) VALUES(:pseudo) WHERE id_user = :id_user");
                $row->bindParam(':pseudo', $pseudo);
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de l'ajout du pseudo de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }
        public function addUserPassword($password, $id_user) {
            try {
                $row = $this->bdd->prepare("INSERT INTO utilisateur(mdp) VALUES(:password) WHERE id_user = :id_user");
                $row->bindParam(':password', $password);
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true; 
            } catch (PDOException $e) {
                echo "Erreur lors de l'ajout du mot de passe de l'utilisateur: " . $e->getMessage();
                return false; 
            }
        }
        public function addUserRole($role, $id_user) {
            try {
                $row = $this->bdd->prepare("UPDATE utilisateur SET role = :role WHERE id_user = :id_user");
                $row->bindParam(':role', $role);
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de l'ajout du rôle de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }


        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        
        public function updateUserById($pseudo, $mdp, $role, $id_user) {
            try {
                $row = $this->bdd->prepare("UPDATE utilisateur SET pseudo = :pseudo, mdp = :mdp, role = :role WHERE id_user = :id_user");
                $row->bindParam(':pseudo', $pseudo);
                $row->bindParam(':mdp', $mdp);
                $row->bindParam(':role', $role);
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de la mise à jour de l'utilisateur: " . $e->getMessage();
                return false;
            }
        } 
        public function updateUserPseudo($id_user, $pseudo) {
            try {
                $row = $this->bdd->prepare("UPDATE utilisateur SET pseudo = :pseudo WHERE id_user = id_user");
                $row->bindParam(':pseudo', $pseudo);
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de la mise à jour du pseudo de l'utilisateur: " . $e->getMessage();
                return false;
            }
        } 
        public function updateUserPassword($id_user, $password) {
            try {
                $row = $this->bdd->prepare("UPDATE utilisateur SET mdp = :mdp WHERE id_user = :id_user");
                $row->bindParam(':mdp', $password);
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de la mise à jour du mot de passe de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }  
        public function updateUserRole($id_user, $role) {
            try {
                $row = $this->bdd->prepare("UPDATE utilisateur SET role = :role WHERE id_user = :id_user");
                $row->bindParam(':role', $role);
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de la mise à jour du rôle de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }   


        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------


        public function removeUserById($id_user) {
            try {
                $row = $this->bdd->prepare("DELETE FROM utilisateur WHERE id_user = :id_user");
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de la suppression de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }
        public function removeUserPseudo($id_user) {
            try {
                $row = $this->bdd->prepare("UPDATE utilisateur SET pseudo = NULL WHERE id_user = :id_user");
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de la suppression du pseudo de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }  
        public function removeUserPassword($id_user) {
            try {
                $row = $this->bdd->prepare("UPDATE utilisateur SET mdp = NULL WHERE id_user = :id_user");
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de la suppression du mot de passe de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }
        public function removeUserRole($id_user) {
            try {
                $row = $this->bdd->prepare("UPDATE utilisateur SET role = NULL WHERE id_user = :id_user");
                $row->bindParam(':id_user', $id_user);
                $row->execute();
                return true;
            } catch (PDOException $e) {
                echo "Erreur lors de la suppression du rôle de l'utilisateur: " . $e->getMessage();
                return false;
            }
        }
        

        // Cqrtes
        // private $id;
        // private $nom;
        // private $image;
        // private $image_small;
        // private $image_cropped;
        // private $id_konami;
        // private $description;
        // private $type;
        // private $race;
        // private $attack;
        // private $defense;
        // private $stars;
        // private $archetype;
        // private $attribute;
        // private $cardmarket_price;
        // private $tcgplayer_price;
        // private $ebay_price;
        // private $amazon_price;
        // private $set_nom;
        // private $set_rarete;
    }
?>