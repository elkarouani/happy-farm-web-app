<?php 
	$user = simplexml_load_file('../database/users.xml');
	$user->name = $_POST['name'];
	$user->email = $_POST['email'];
	$user->password = $_POST['password'];
	$user->budget = $_POST['budget'];

	$result = file_put_contents('../database/users.xml', $user->saveXML());
	if ($result != false) {
		echo 'Les informations sont bien enregistrés';
	}
?>