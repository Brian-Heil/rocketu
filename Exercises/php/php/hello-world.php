<?php
	include('settings.php');
?>
<!DOCTYPE = html>
<html>
	<head>
		<title>Hello world page</title>
	</head>
	<body>

		<h1>Hello World</h1>

		<?php
			echo "Hello from $name I am a {$role}man";
		?>
		<?php
			include('footer.html');
		?>
	</body>

</html> 