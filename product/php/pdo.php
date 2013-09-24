<?php

//create array named 'config' containing login credentials for reuse *usually in seperate file*
$config['db'] = array(
	'host' 		=> 'localhost',
	'username' 	=> 'ft_admin',
	'password' 	=> 'ft123456',
	'dbname' 	=> 'friendlytables'
);

// print_r($config)

//create PDO *PHP Data Object* containing string needed to login to mysql data base using array 'config' containing login credentials
$db = new PDO('mysql:host=' . $config['db']['host'] . ';dbname=' . $config['db']['dbname'], $config['db']['username'], $config['db']['password']);

//name var *$query* = standard query using 'db' PDO *SELECT table.row FROM table*
$query = $db->query("SELECT `questionslocations`.`questionlocation` FROM `questionslocations`");

print_r ($query);

?>