<?php
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/config.php";
    include "/Applications/XAMPP/xamppfiles/htdocs/projet-cartex/backoffice/src/DAO.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log - AdminPanel</title>
    <link rel="stylesheet" href="style.scss">
</head>
<body>
    <div class="page-sct">
        <div class="navbar-sct">
            <div class="logo-sct">
                <h1>Panneau d'administration</h1>
            </div>
        </div>
        <div class="panel-sct">
            <div class="log-sct">
                <form method="post" action="conn.php">
                    <div class="input-sct">
                        <div class="user-sct">
                            <label for="logUsername">Nom d'utilisateur</label>
                            <input type="text" name="logUser" id="logUser">
                        </div>
                        <div class="pwd-sct">
                            <label for="logPasswd">Mot de passe</label>
                            <input type="password" name="logPwd" id="logPwd">
                        </div>
                    </div>
                    <div class="submit-sct">
                        <input type="submit" value="Connexion">
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

</html>