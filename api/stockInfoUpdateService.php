<?php  

	if (isset($_POST['action']) && $_POST['action'] == 'updateFoodQuantity') {
		$stock = simplexml_load_file('../database/stock.xml');
		$stock->nourriture->quantite += (int)$_POST['quantity'];

		$result = file_put_contents('../database/stock.xml', $stock->saveXML());
		if ($result != false) {
			echo 'la quantité est bien modifiée';
		}
	}

?>