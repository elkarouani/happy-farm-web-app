<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Acceuil</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    </head> 
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="acceuil.php">
                <img src="assets/img/logo.png" width="140" height="40" class="d-inline-block align-top" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                <ul class="navbar-nav" style="margin-left: 10px;">
                    <li><a href="#"><ion-icon name="build"></ion-icon> Paramétres</a></li>
                </ul>
                <ul class="navbar-nav" style="margin-left: 10px;">
                    <li><a href="connexionPage.html"><ion-icon name="log-out"></ion-icon> Log out</a></li>
                </ul>
            </div>
        </nav>
  
        <div class="container-fluid text-center">    
            <div class="row content">
                <div class="col-sm-2 sidenav">
                    <div class="btn-group-vertical  btn-group btn-group-lg">
                        <a class="btn btn-info" href="acceuil.php?action=transportation">Réservation des transports</a>
                        <button type="button" class="btn btn-info">Samsung</button>
                        <button type="button" class="btn btn-info">Sony</button>
                        <button type="button" class="btn btn-info">Apple</button>
                        <button type="button" class="btn btn-info">Samsung</button>
                        <button type="button" class="btn btn-info">Sony</button>
                        <button type="button" class="btn btn-info">Apple</button>
                        <button type="button" class="btn btn-info">Samsung</button>
                        <button type="button" class="btn btn-info">Sony</button>
                    </div>
                </div>
                
                <?php if (isset($_GET['action']) && $_GET['action'] == 'transportation'): ?>
                    <div class="col-sm-9"> 
                        <?php include("Transport.html"); ?>
                    </div>
                <?php else: ?>
                    <div class="col-sm-9 text-right"> 
                        <h4 id="greeting">Welcome [User Name]</h4>
                    </div>
                <?php endif ?>
            </div>
        </div>
        
        <script src="assets/js/home.js"></script>
        <script src="https://unpkg.com/ionicons@4.4.4/dist/ionicons.js"></script>
        <script src="assets/js/jquery.js"></script>
        <script src="assets/js/popper.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
    </body>
</html>