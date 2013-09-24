<?php

$conn = mysql_connect("localhost", "ft_admin", "ft123456", "friendlytables");

if (!$conn) {
    echo "Unable to connect to DB: " . mysql_error();
    exit;
}

if (!mysql_select_db("friendlytables")) {
    echo "Unable to select friendlytables: " . mysql_error();
    exit;
}

$sql = "SELECT id as id, question_text, question_location, question_foodtype
        FROM   questions";
        //WHERE  id = 8";

$result = mysql_query($sql);

if (!$result) {
    echo "Could not successfully run query ($sql) from DB: " . mysql_error();
    exit;
}

if (mysql_num_rows($result) == 0) {
    echo "No rows found, nothing to print so am exiting";
    exit;
}

// While a row of data exists, put that row in $row as an associative array
// Note: If you're expecting just one row, no need to use a loop
// Note: If you put extract($row); inside the following loop, you'll
//       then create $userid, $fullname, and $userstatus

echo "Queue";

while ($row = mysql_fetch_assoc($result)) {
    echo "<ul>";
    echo '<li>';
    echo $row["question_text"];
    echo "      ";
    echo $row["question_location"];
    echo "      ";
    echo $row["question_foodtype"];
    echo '</li>';
    echo "</ul>";
}

mysql_free_result($result);

?>