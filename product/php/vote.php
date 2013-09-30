<!doctype html>
<html>
<head>
<?php  
    include('webPoll.class.php');  
    webPoll::vote();  
?>	
</head>
<body>
<?php
	$a = new webPoll(array(  
        'What subjects would you like to learn more about?',  
        'HTML & CSS',  
        'JavaScript',  
        'JS Frameworks (jQuery, etc)',  
        'Ruby/Ruby on Rails',  
        'PHP',  
        'mySQL'));  
	$b = new webPoll(array(  
        'What is your question?',  
        'Don\'t have one',  
        'Why?',  
        'When?',  
        'Where?'));
?>
</body>
</html>