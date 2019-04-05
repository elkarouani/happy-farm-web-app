<?php 

if (isset($_POST['action']) && $_POST['action'] == "save") {
	$xml = new DomDocument("1.0", "UTF-8");
	$xml->load('../database/consultation.xml');
	$xml->recover = true;
	$consultations = $xml->getElementsByTagName("consultations")->item(0);
	
	$consultation = $xml->createElement("consultation");
	
	$reference = $xml->createElement("reference", $_POST['reference']);
	$age = $xml->createElement("age", $_POST['age']);
	$poid = $xml->createElement("poids", $_POST['poids']);
	$veterinaire = $xml->createElement("veterinaire", $_POST['doctor']);
	$status = $xml->createElement("status", $_POST['status']);
	$medicaments = $xml->createElement("médicaments");

	$medicamentsList = explode(",", $_POST['medicences']);
	foreach ($medicamentsList as $element) {
		$medicament = $xml->createElement("médicament", $element);
		$medicaments->appendChild($medicament);
	}

	$consultation->appendChild($reference);
	$consultation->appendChild($age);
	$consultation->appendChild($poid);
	$consultation->appendChild($veterinaire);
	$consultation->appendChild($status);
	$consultation->appendChild($medicaments);

	$consultations->appendChild($consultation);

	if ($xml->save('../database/consultation.xml') != false) {
		echo 'well saved';
	}
}

?>