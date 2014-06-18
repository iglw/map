<?php
	ini_set('track_errors', 1);
	$data = $_POST["data"];
	//$data = "yay";
	$fh = fopen("data/test.xml", 'w') or die($php_errormsg);
	fwrite($fh, $data);
	fclose($fh);
?>
