<?php 
	if (isset($_POST['action']) && $_POST['action'] == "reservation") {
		$transports = simplexml_load_file('../database/transports.xml');
		foreach ($transports as $transport) {
			if ($transport->title == $_POST['transport']) {
				$transport->reserve = "true";
				
				$actuel_date = date('d-m-Y');
				$date = strtotime(date("d-m-Y", strtotime($actuel_date)) . " +1 month");
				$expire = date('d-m-Y', $date);

				$transport->expire = $expire;
			}
		}
		file_put_contents('../database/transports.xml', $transports->saveXML());
	}

	if (isset($_POST['action']) && $_POST['action'] == "afterBuying") {
		$transports = simplexml_load_file('../database/transports.xml');
		$total = 0;
		foreach ($transports as $transport) {
			if ($transport->reserve == "true") {
				$total += (int)$transport->charge;
			}
		}
		echo $total;
	}

?>