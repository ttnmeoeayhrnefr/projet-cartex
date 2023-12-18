<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User - AdminPanel</title>
        <link rel="stylesheet" href="style.scss">
    </head>
    <body>
        <div class="page-sct">
            <div class="navbar-sct">
                <div class="logo-sct">
                    <h1>Panneau d'administration</h1>
                </div>
                <div class="disconnect-btn">
                    <a href="panel.php" id="aDisc">
                        <img src="assets/logout.svg" alt="logout" id="disco">
                    </a>
                </div>
            </div>
            <div class="panel-sct">
                <div class="home-sct">
                    <div class="left-btn">
                        <a href="home_panel.php" id="a2l">
                            <img src="assets/l_chevron.svg" alt="left button" id="l_chev2">
                        </a>
                    </div>
                    <div class="content-sct">
                        <div class="user-sct">
                            <div class="title-sct">
                                <h2 id="Usr">
                                    Gestion utilisateurs  
                                </h2>
                            </div>
                            <div class="gest-sct">
                                <div class="template"></div>
                            </div>
                        </div>
                    </div>
                    <div class="right-btn">
                        <a href="card_panel.php" id="a2r">
                            <img src="assets/r_chevron.svg" alt="right button" id="r_chev2">
                        </a>
                    </div>
                </div>
            </div>
        </div>  
    </body>
</html>