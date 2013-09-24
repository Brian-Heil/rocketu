<?php

$question = $_POST['question_text'];
$yelpchecked_array = $_POST['yelpchecked_array'];

$mysqli = new mysqli("localhost", "ft_admin", "ft123456", "friendlytables");

foreach ($yelpchecked_array AS $location)
{
   $sql = "INSERT INTO questions_locations(question_location) VALUES('{$location}')";
   $mysqli->query($sql) or die($mysqli->error);
}

?>