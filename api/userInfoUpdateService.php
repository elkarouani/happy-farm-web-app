<?php 
	if (isset($_POST['action']) && $_POST['action'] == "settings") {
		$user = simplexml_load_file('../database/users.xml');
		$user->name = $_POST['name'];
		$user->email = $_POST['email'];
		$user->password = $_POST['password'];
		$user->budget = $_POST['budget'];

		$result = file_put_contents('../database/users.xml', $user->saveXML());
		if ($result != false) {
			echo 'Les informations sont bien enregistrés';
		}
	}

	if (isset($_POST['action']) && $_POST['action'] == "reservation") {
		$user = simplexml_load_file('../database/users.xml');
		$user->budget = $_POST['newBudget'];

		$result = file_put_contents('../database/users.xml', $user->saveXML());
	}
?>