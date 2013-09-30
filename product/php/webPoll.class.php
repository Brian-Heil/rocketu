<?php

// http://net.tutsplus.com/tutorials/php/creating-a-web-poll-with-php/

// Step 5: Decide on the Class Properties
// There’s certain data that’s going to be needed by each poll; we’re going to store some of this in class properties.
// We’ll need to store the question and the answers, the basic HTML, the question identifier, and some information on
// how to draw the results bars. Here’s the start:

class webPoll {  

    # makes some things more readable later  
    const POLL = true;  
    const VOTES = false;  
  
    # number of pixels for 1% on display bars  
    public $scale = 2;  
  
    # the poll itself  
    public $question = '';  
    public $answers = array();  
  
    # the HTML  
    private $header = '<form class="webPoll" method="post" action="%src%"> 
                       <input type="hidden" name="QID" value="%qid%" /> 
                       <h4>%question%</h4> 
                       <fieldset><ul>';  
    private $center = '';  
    private $footer = "\n</ul></fieldset>%button%\n</form>\n";  
    private $button = '<p class="buttons"><button type="submit" class="vote">Vote!</button></p>';  
  
    # question identifier  
    private $md5 = '';

    // The initial constants will be used in one of the methods to make it more readable so it’s easier to know whats going on.
    // Take note of the hidden input that’s been added here. This is the question identifier used to store information in the database.
    // All the values in the HTML surrounded by percent signs will be replaced.


	// Step 6: Create the HTML Poll or Answers
	// Since it’s already been decided the poll will be made by creating an object, let’s examine the __construct method.

	public function __construct($params) {  

	    $this->question = array_shift($params);  
	    $this->answers = $params;  
	    $this->md5 = md5($this->question);    
	  
	    $this->header = str_replace('%src%', $_SERVER['SCRIPT_NAME'], $this->header);  
	    $this->header = str_replace('%qid%', $this->md5, $this->header);  
	    $this->header = str_replace('%question%', $this->question, $this->header);  
	  
	    # has the user voted yet?  
	    isset($_COOKIE[$this->md5]) ? $this->poll(self::VOTES) : $this->poll(self::POLL);      
	}

	// In the first line, we peel the question off the array stack with array_shift, and store it in a property.
	// We also store the questions, leaving them as an array.
	// We also create the question identifier here, by making an md5 hash of the question itself.
	// The next three lines perform some replacements on the HTML.
	// The first sets our form action to point at the page the poll is one.
	// The second puts our question identifier in a hidden form field. The third puts our question into the HTML.
	// In the final line of the constructor we check if the user has voted on this particular poll, and if he has, we show the votes.
	// If he hasn’t, we show the poll.


	// Step 7: Generate the pole
	// Both generating the poll and generating the results are very similar operations.
	// In order to keep our code DRY we break the creation into three methods. The main one is “poll”.

	private function poll($show_poll) {  
	    $replace = $show_poll ? $this->button : '';  
	    $this->footer = str_replace('%button%', $replace, $this->footer);  
	  
	    # static function doesn't have access to instance variable  
	    if(!$show_poll) {  
	        $results = webPoll::getData($this->md5);  
	        $votes = array_sum($results);  
	    }  
	  
	    for( $x=0; $x<count($this->answers); $x++ ) {  
	        $this->center .= $show_poll ? $this->pollLine($x) : $this->voteLine($this->answers[$x],$results[$x],$votes);  
	    }  
	  
	    echo $this->header, $this->center, $this->footer;  
	}

	// Here’s the breakdown of what’s going on in this function:
	// lines 2 & 3: We only need a vote button if the user hasn’t voted.
	// Here we determine if we’re going to use the button HTML or not, and then either insert the HTML,
	// or replace the %button% placeholder with an empty string.
	// lines 6 – 8: If we’re not showing the poll, we obviously need the results, so here we go fetch them.
	// We also calculate the total votes cast for use later in determining percentages.
	// lines 11 – 12: This generates the LI tags in our HTML.
	// Depending on if we’re showing the poll or the results, we generate different HTML.
	// This HTML generation is handed off to two functions:
	// pollLine
	// voteLine
	// line 15: Simply dumps out the data to the page.


	// Step 8: The poleLine() method
	// This is a very simple method, which takes the current index of the answer as an argument.

	private function pollLine($x) {  
	    isset($this->answers[$x+1]) ? $class = 'bordered' : $class = '';  
	    return " 
	    <li class='$class'> 
	            <label class='poll_active'> 
	            <input type='radio' name='AID' value='$x' /> 
	                {$this->answers[$x]} 
	            </label> 
	    </li> 
	";  
	}

	// It checks if there’s an answer after the current one on its first line, and if there is, applies a class of bordered to that LI tag.
	// The very last answer won’t get this class, allowing us to achieve the visual effect intended.


	// Step 9: The voteLine() Method
	// This method is getting 3 parameters passed into it:
	// $answer : The question answer for this line
	// $result : The number of votes this option has gotten
	// $votes : The total number of votes cast in this poll
	// With that information, the LI tags for the voting results can be produced.

	private function voteLine($answer,$result,$votes) {  
	    $result = isset($result) ? $result : 0;  
	    $percent = round(($result/$votes)*100);  
	    $width = $percent * $this->scale;  
	    return " 
	    <li> 
	            <div class='result' style='width:{$width}px;'>&nbsp;</div>{$percent}% 
	            <label class='poll_results'> 
	                $answer 
	            </label> 
	    </li> 
	";  
	}

	// This method is getting 3 parameters passed into it:
	// $answer : The question answer for this line
	// $result : The number of votes this option has gotten
	// $votes : The total number of votes cast in this poll
	// With that information, the LI tags for the voting results can be produced.

	// Step 11: Handling a Vote
	// We’re going to add a second static method to the class, and this one will handle incoming votes.
	// Votes will only be counted if the user hasn’t voted before (as determined by a cookie)
	// and once the user has voted we’ll set a cookie indicating this.
	// In this type of web application, it’s nearly impossible to stop multiple votes without excluding some legitimate users.
	// Setting a cookie is just a basic precaution.
	// This is one of the more complex methods in our webPoll class, and we’re going to look at it in three parts.


	static function vote() {  
	    if(!isset($_POST['QID']) ||  
	       !isset($_POST['AID']) ||  
	       isset($_COOKIE[$_POST['QID']])) {  
	        return;  
	    }

		// A call to the vote() method will be at the top of our PHP page, so the first thing we want to do is decide
		// if there’s a vote to process or not. The above statement is how we determine this. Here’s what it says:
		// If there’s no Question Identifier in our POST data (OR!!)
		// If there’s no Answer Identifier in our POST data (OR!!)
		// If a cookie has been set already matching the Question Identifier
		// If any of those are true, we don’t have to process a vote, and we leave the method.
		$config['db'] = array(
			'host' 		=> 'localhost',
			'username' 	=> 'ft_admin',
			'password' 	=> 'ft123456',
			'dbname' 	=> 'friendlytables'
		);
		$dbh = new PDO('mysql:host=' . $config['db']['host'] . ';dbname=' . $config['db']['dbname'], $config['db']['username'], $config['db']['password']);
		$dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );  

		try {  
		    $sth = $dbh->prepare( "INSERT INTO tally (QID,AID,votes) values (:QID, :AID, 1)" );  
		    $sth->execute(array(':QID'=>$_POST['QID'],':AID'=>$_POST['AID']));  
		}  
		catch(PDOException $e) {
		    # 23000 error code means the key already exists, so UPDATE!   
		    echo $e;
		    if($e->getCode() == 23000) {  
		        try {  
		            $sth = $dbh->prepare( "UPDATE tally SET votes = votes+1 WHERE QID=:QID AND AID=:AID");  
		            $sth->execute(array($_POST['QID'],$_POST['AID']));  
		        }  
		        catch(PDOException $e) {  
		            echo $e->getMessage();  
		        }  
		    }  
		    else {  
		        echo $e->getMessage();  
		    }  
		}

		// This looks a lot more complicated then it really is.
		// What happens here is we check if a particular answer has gotten a vote before.
		// If it hasn’t we create a new record for that answer, and give it one vote.
		// If it has, we update the existing record. So how’s it decide which to do?
		// PDO exception magic.
		// Remember at the very beginning we created our multi-column primary key?
		// When we try to insert a record into the table which matches an existing QID/AID pair,
		// an exception is thrown, and in particular the exception code is 23000 (duplicate key).
		// If the insert throws an exception, we’re going to check the exception code, and if it matches 23000,
		// we’ll try to update the record instead. Of course if the insert fails for a different reason,
		// or the update fails as well, we’re going to just issue a call to a method called db_error()
		// which just echos a generic error message. Like before, a production environment would log this error and/or notify the admin.


		# entry in $_COOKIE to signify the user has voted, if he has  
		if($sth->rowCount() == 1) {  
		    setcookie($_POST['QID'], 1, time()+60*60*24*365);  
		    $_COOKIE[$_POST['QID']] = 1;  
		}
	}


	// Step 10: Write the getData() Method
	// If you look back up a bit, you’ll see we call the getData() method which is defined as a static method in the class.
	// Why static? Because if we decide to enhance this poll later by making it AJAX based, we’ll want access to that method
	// without object creation. Here’s the method:

	static function getData($question_id) {  
	    try {  
	        // $dbh = new PDO('mysql:.db');
			
			//create array named 'config' containing login credentials for reuse *usually in seperate file*
			$config['db'] = array(
				'host' 		=> 'localhost',
				'username' 	=> 'ft_admin',
				'password' 	=> 'ft123456',
				'dbname' 	=> 'friendlytables'
			);

			//create PDO *PHP Data Object* containing string needed to login to mysql data base using array 'config' containing login credentials
	        $dbh = new PDO('mysql:host=' . $config['db']['host'] . ';dbname=' . $config['db']['dbname'], $config['db']['username'], $config['db']['password']);
 
	        $dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );  
	  
	        $STH = $dbh->prepare('SELECT AID, votes FROM tally WHERE QID = ?');  
	        $STH->execute(array($question_id));  
	    }  
	    catch(PDOException $e) {    
	        # Error getting data, just send empty data set  
	        return array(0);   
	    }  
	  
	    while($row = $STH->fetch()) {  
	        $results[$row['AID']] = $row['votes'];     
	    }  
	  
	    return $results;  
	}

	// The question ID is passed into the method and it will return an array containing the answer ID’s
	// and the number of votes that answer has.
	// If an answer has no votes, it won’t have an entry in the array, which we’ve already dealt with in the voteLine() method.
	// Since database errors in web polls are particularly tragic, we’re simply going to return an empty array if one occurs.
	// The user will get 0 votes for each result. In a production environment you might want to log this error to a file,
	// or send the admin an email.


	// Step 11: Handling a Vote
	// We’re going to add a second static method to the class, and this one will handle incoming votes.
	// Votes will only be counted if the user hasn’t voted before (as determined by a cookie)
	// and once the user has voted we’ll set a cookie indicating this.
	// In this type of web application, it’s nearly impossible to stop multiple votes without excluding some legitimate users.
	// Setting a cookie is just a basic precaution.
	// This is one of the more complex methods in our webPoll class, and we’re going to look at it in three parts.


}

?>