<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Acceuil</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head> 
    <body style="background-image: url('assets/img/pic1.jpg'); background-size: cover;">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="acceuil.php">
                <img src="assets/img/logo.png" width="140" height="40" class="d-inline-block align-top" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                <ul class="navbar-nav" style="margin-left: 10px;">
                    <li><a href="acceuil.php?action=settings"><ion-icon name="build"></ion-icon> Paramétres</a></li>
                </ul>
                <ul class="navbar-nav" style="margin-left: 10px;">
                    <li>
                        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exitModal">
                            <ion-icon name="log-out"></ion-icon> Log out
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
  
        <div class="container-fluid text-center">    
            <div class="row content">
                <div class="col-sm-2 sidenav">
                    <div class="btn-group-vertical  btn-group btn-group-lg">
                        <a class="btn btn-info" href="acceuil.php?action=transportation">Réservation des transports</a>
                        <a class="btn btn-info" href="acceuil.php?action=achat">Achat des voaux</a>
                        <a class="btn btn-info" href="acceuil.php?action=quarentaine">Quarentaine</a>
                        <a class="btn btn-info" href="acceuil.php?action=disponibles">Voaux Disponibles</a>
                        <a class="btn btn-info" href="acceuil.php?action=consultation">Consultation de santé</a>
                        <a class="btn btn-info" href="acceuil.php?action=prestation">Prestation</a>
                        <a class="btn btn-info" href="acceuil.php?action=stock">Stock</a>
                        <a class="btn btn-info" href="acceuil.php?action=vente">Vente des voaux</a>
                    </div>
                </div>
                
                <?php if (isset($_GET['action']) && $_GET['action'] == 'transportation'): ?>
                    <div class="col-sm-9"> 
                        <?php include("Transport.html"); ?>
                    </div>
                <?php elseif (isset($_GET['action']) && $_GET['action'] == 'settings'): ?>
                    <div class="col-sm-9"> 
                        <?php include("Settings.html"); ?>
                    </div>
                <?php elseif (isset($_GET['action']) && $_GET['action'] == 'achat'): ?>
                    <div class="col-sm-9"> 
                        <?php include("Achat.html"); ?>
                    </div>
                <?php elseif (isset($_GET['action']) && $_GET['action'] == 'quarentaine'): ?>
                    <div class="col-sm-9"> 
                        <?php include("Quarentaine.html"); ?>
                    </div>
                <?php elseif (isset($_GET['action']) && $_GET['action'] == 'disponibles'): ?>
                    <div class="col-sm-9"> 
                        <?php include("DisponibleVeals.html"); ?>
                    </div>
                <?php elseif (isset($_GET['action']) && $_GET['action'] == 'consultation'): ?>
                    <div class="col-sm-9"> 
                        <?php include("Consultation.html"); ?>
                    </div>
                <?php elseif (isset($_GET['action']) && $_GET['action'] == 'prestation'): ?>
                    <div class="col-sm-9"> 
                        <?php include("prestation.html"); ?>
                    </div>
                <?php elseif (isset($_GET['action']) && $_GET['action'] == 'stock'): ?>
                    <div class="col-sm-9"> 
                        <?php include("Stock.html"); ?>
                    </div>
                <?php elseif (isset($_GET['action']) && $_GET['action'] == 'vente'): ?>
                    <div class="col-sm-9"> 
                        <?php include("Vente.html"); ?>
                    </div>
                <?php else: ?>
                    <div class="col-sm-9 text-right" style="padding-left: 150px;"> 
                        <h4 id="greeting"></h4><br><br>
                        <div id="messageBlock1" class="alert alert-warning alert-dismissible fade show text-center" role="alert" hidden="hidden">
                          <p id="message1"></p>
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div id="messageBlock2" class="alert alert-warning alert-dismissible fade show text-center" role="alert" hidden="hidden">
                          <p id="message2"></p>
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                    </div>
                <?php endif ?>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exitModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content text-center">
                    <div class="modal-body">
                        <strong>Vous voulez vraiment sortir ?</strong>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
                        <a href="index.html" class="btn btn-primary">Oui</a>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="https://unpkg.com/ionicons@4.4.4/dist/ionicons.js"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script type="module" src="assets/js/home.js"></script>
    </body>
</html>