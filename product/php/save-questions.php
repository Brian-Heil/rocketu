<?php
	$mysqli = new mysqli("localhost", "ft_admin", "ft123456", "friendlytables");
	if ($mysqli->connect_errno) {
	    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	echo $mysqli->host_info . "\n";

	$question_text = $_POST['question_text'];
	$question_location = $_POST['question_location'];
	$question_foodtype = $_POST['question_foodtype'];

	$sql = "insert into questions(question_text,question_location,question_foodtype) values($question_text,$question_location,$question_foodtype)";
	$mysqli->query($sql);
	echo "it worked";

	$user_ids = $_POST['user_ids'];
	$user_ids_array = explode(',', $user_ids);
	foreach ($user_ids_array as $id) {
		$sql = "insert into questions_friends(question_friendid) values($id)";
		$mysqli->query($sql);
	}
	$yelpchecked_array = $_POST['yelpchecked_array'];
	foreach ($yelpchecked_array AS $location){
		$location = $mysqli->real_escape_string($location);
	    $sql = "INSERT INTO questions_locations(question_location) VALUES('{$location}')";
	    $mysqli->query($sql) or die($mysqli->error);

	// $yelpchecked_array = $_POST['yelpchecked_array'];
	// $yelpchecked_array_text = $yelpchecked_array;
	// foreach ($yelpchecked_array as $yctext) {
	// 	$sql = "insert into questions_locations(question_location) values('$yctext')";
	// 	$mysqli->query($sql);
	}

?>