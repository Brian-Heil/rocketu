<?php
 $Names = array ('a' => 'Angela', 'b' => 'Bradley', 'c' => array ('Cade', 'Caleb')); 
 
 print_r ($Names);

$config['db'] = array(
	'host' 		=> 'localhost',
	'username' 	=> 'ft_admin',
	'password' 	=> 'ft123456',
	'dbname' 	=> 'friendlytables'
);

$db = new PDO('mysql:host=' . $config['db']['host'] . ';dbname=' . $config['db']['dbname'], $config['db']['username'], $config['db']['password']);

$query = $db->query("SELECT `questionslocations`.`questionlocation` FROM `questionslocations`");

print_r ($query);


?>