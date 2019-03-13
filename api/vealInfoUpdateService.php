<?php  
	if (isset($_POST) && $_POST['action'] == 'insert') {insertVeals($_POST);}
	if (isset($_POST) && $_POST['action'] == 'delete') {deleteVeals($_POST);}

	function insertVeals($data){
		$xml = new DomDocument("1.0", "UTF-8");
		$xml->load('../database/farm.xml');
		$xml->recover = true;

		for ($i = 0; $i < (int)$data["quantity"]; $i++) {
			
			$rootTag = $xml->getElementsByTagName("farm")->item(0);
			$vealTag = $xml->createElement("veal");

			$code = strtoupper($data["origin"]).getAvailableIndex(strtoupper($data["origin"]), $rootTag);
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

	function deleteVeals($data) {
		$xml = new DomDocument("1.0", "UTF-8");
		$xml->load('../database/farm.xml');

		$reference = $data['reference'];
		$rootTag = $xml->getElementsByTagName("farm")->item(0);
		$vealsCollection = $rootTag->childNodes;

		for ($i = 0 ; $i < ($vealsCollection->length - 1) ; $i++) {
			$foundedReference = $vealsCollection->item($i)->getElementsByTagName("reference")->item(0)->firstChild->data;
			if ($foundedReference == $reference) {
				$rootTag->removeChild($vealsCollection->item($i));
			}
		}

		if ($xml->save('../database/farm.xml') != false) {
			echo 'Veaux sont vendus avec succées';
		}
	}

	function getAvailableIndex($origin, $rootTag) {
		$refList = $rootTag->getElementsByTagName("reference");
		$index = 0;
		
		foreach ($refList as $ref) {
			$refString = $ref->firstChild->data;
			if ($origin == substr($refString, 0, strlen($origin))) {
				if ($index < (int)$refString[strlen($refString) - 1]) {$index = (int)$refString[strlen($refString) - 1];}
			}
		}

		return ++$index;
	}
?>