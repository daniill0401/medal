<?php

	// $mail = "zakaz@geraldzavod.ru";
	$mail = "daniill0401@ya.ru";

	$message = "";
	$data = $_POST;
	foreach($data as $key=>$value){
		$message.="$key: $value\n";
	}

	$domain = preg_replace("/www\./", "", $_SERVER["SERVER_NAME"]);
	$headers = "From: =?UTF-8?B?".base64_encode("Заявка с $domain")."?=<info@$domain>\r\nContent-Transfer-Encoding: base64". "\r\n";

	if(mail($mail, "Заявка с $domain", base64_encode($message), $headers))
		echo "1";

 ?>