<?php  
	if (isset($_POST) && $_POST['action'] == 'insert') {insertVeals($_POST);}

	function insertVeals($data){
		$xml = new DomDocument("1.0", "UTF-8");
		$xml->load('../database/farm.xml');

		for ($i = 0; $i < (int)$data["quantity"]; $i++) {
			
			$rootTag = $xml->getElementsByTagName("farm")->item(0);
			$vealTag = $xml->createElement("veal");

			$code = strtoupper($data["origin"]).getAvailableIndex($rootTag);
			$refTag = $xml->createElement("reference", $code);
			$marketTag = $xml->createElement("market", $data["market"]);
			$origin = $xml->createElement("origin", $data["origin"]);
			$weight = $xml->createElement("weight", $data["weight"]);
			$age = $xml->createElement("age", $data["age"]);
			$bougthBy = $xml->createElement("bougthBy", $data["price"]);

			$vealTag->appendChild($refTag);
			$vealTag->appendChild($marketTag);
			$vealTag->appendChild($origin);
			$vealTag->appendChild($weight);
			$vealTag->appendChild($age);
			$vealTag->appendChild($bougthBy);

			$rootTag->appendChild($vealTag);
		
		}

		if ($xml->save('../database/farm.xml') != false) {
			echo 'Veaux sont achetés avec succées';
		}
	}

	function getAvailableIndex($rootTag) {
		$refList = $rootTag->getElementsByTagName("reference");
		$index = 1;
		
		foreach ($refList as $ref) {
			$refString = $ref->firstChild->data;
			if ($index < (int)$refString[strlen($refString) - 1]) {$index = (int)$refString[strlen($refString) - 1];}
		}

		return ++$index;
	}
?>