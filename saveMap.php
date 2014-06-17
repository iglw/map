<?php
	$data = $_POST["data"];
	$fh = fopen("test.xml", 'w');
	fwrite($fh, $data);
	fclose($fh);
	echo "asd";
?>
