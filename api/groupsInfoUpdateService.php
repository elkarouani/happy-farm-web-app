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
?>