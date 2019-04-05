<?php  

	if (isset($_POST['action']) && $_POST['action'] == 'addFoodQuantity') {
		$stock = simplexml_load_file('../database/stock.xml');
		$stock->nourriture->quantite += (int)$_POST['quantity'];

		$result = file_put_contents('../database/stock.xml', $stock->saveXML());
		if ($result != false) {
			echo 'la quantité est bien modifiée';
		}
	}

	if (isset($_POST['action']) && $_POST['action'] == 'addMedicenceQuantity') {
		$stock = simplexml_load_file('../database/stock.xml');
		foreach ($stock->medicaments->medicament as $medicament) {
			if ($medicament->titre == $_POST['title']) {
				$medicament->quantite += (int)$_POST['quantity'];
			};
		};

		$result = file_put_contents('../database/stock.xml', $stock->saveXML());
		if ($result != false) {
			echo 'la quantité est bien modifiée';
		}
	}

	if (isset($_POST['action']) && $_POST['action'] == 'updateFoodQuantity'){
		$stock = simplexml_load_file('../database/stock.xml');
		$stock->nourriture->quantite -= (int)$_POST['quantity'];

		$result = file_put_contents('../database/stock.xml', $stock->saveXML());
		if ($result != false) {
			echo 'la quantité est bien modifiée';
		}
	}

	if (isset($_POST['action']) && $_POST['action'] == 'updateMedicenceQuantity'){
		$stock = simplexml_load_file('../database/stock.xml');
		foreach ($stock->medicaments->medicament as $medicament) {
			if ($medicament->titre == $_POST['title']) {
				$medicament->quantite -= (int)$_POST['quantity'];
			};
		};

		$result = file_put_contents('../database/stock.xml', $stock->saveXML());
		if ($result != false) {
			echo 'la quantité est bien modifiée';
		}
	}

?>