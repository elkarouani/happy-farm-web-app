<?php 
	if (isset($_POST['action']) && $_POST['action'] == "afterBuying") {
		$groups = simplexml_load_file('../database/vealsGroups.xml');
		foreach ($groups as $group) {
			if ($group->origin == $_POST['origin']) {
				$group->max = (int)$group->max - (int)$_POST['quantity'];
			}
		}

		$result = file_put_contents('../database/vealsGroups.xml', $groups->saveXML());
		if ($result != false) {
			echo 'Les informations sont bien enregistrés';
		}
	}

	if (isset($_POST['action']) && $_POST['action'] == "afterDeath") {
		$data = getVealInfoByReference($_POST['reference']);
		$groups = simplexml_load_file('../database/vealsGroups.xml');
		foreach ($groups as $group) {
			if ($group->origin == $data[0] && $group->market == $data[1]) {
				$group->max = (int)$group->max + 1;
			}
		}
		$result = file_put_contents('../database/vealsGroups.xml', $groups->saveXML());
		if ($result != false) {
			echo 'Les informations sont bien enregistrés';
		}
	}

	function getVealInfoByReference($reference){
		$farm = simplexml_load_file('../database/farm.xml');
		$origin = $market = "";
		foreach ($farm as $veal) {
			if ($veal->reference == $reference) {
				$origin = $veal->origin->__toString();
				$market = $veal->market->__toString();
			}
		}
		return array($origin, $market);
	}
?>