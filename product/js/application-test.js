 
// jquery helper funtion
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function sendRequest() {
    // Get the list of selected friends
    var sendUIDs = '';
    var mfsForm = document.getElementById('mfsForm');
    for(var i = 0; i < mfsForm.friends.length; i++) {
        if(mfsForm.friends[i].checked) {
           sendUIDs += mfsForm.friends[i].value + ',';
        }
    }
console.log(sendUIDs)
	$.ajax({
		url: 'php/save-questions.php',
		type: 'POST',
		dataType: 'json',
		data: {
			user_ids:sendUIDs,
			question_text:sessionStorage['question'],
			question_foodtype:sessionStorage['foodtype'],
			question_location:sessionStorage['location'],
			yelpchecked_array:sessionStorage['yelpchecked'],
			date: (new Date())
		},
		success : function(json) {
			console.log(json);
		}
	});



    // Use FB.ui to send the Request(s)
	// FB.ui({method: 'apprequests',
	// 	to: sendUIDs,
	// 	title: 'My Great Invite',
	// 	message: 'Check out this Awesome App!',
	
	// }, callback);
console.log(sendUIDs)
	FB.ui({
	  method: 'send',
	  to: sendUIDs,
	  link: 'http://friendlytables.com',//'http://rocket-space.com/rocketu/',
	}, callback);
	console.log(sendUIDs)
}

function callback(response) {
    console.log(response);
}

$(document).ready(function() { 

	// $(input#questionbox).on('propertychange keyup input paste', 'input.data_field', function(){
 //    var io = $(this).val().length ? 1 : 0 ;
 //    $(this).next('.icon_clear').stop().fadeTo(300,io);
	// }).on('click', '.icon_clear', function() {
 //    $(this).delay(300).fadeTo(300,0).prev('input').val('');
	// });

	$("#loginjquery").click(function(){
		window.location = "/product/queue.html"
	});

	$("#yelpresults").click(function(){
		window.location = "/product/yelp.html"
	});
	$("#draft").click(function(){
		window.location = "/product/draft.html"
	});
	$("#queuelist").click(function(){
		window.location = "/product/php/queue-list.php"
	});

	$("#vote").click(function(){
		window.location = "/product/vote.html"
	});

	$('button#logout').click(function() {
		FB.logout(function(response) {
    	// user is now logged out
		});
	});

	if($('#yelp-page').length) {
		var location = getParameterByName('location');
		var foodtype = getParameterByName('foodtype');
		console.log(location + ' ' + foodtype);
		getYelpData(location,foodtype);
	};

	//yelp page button send question, location and foodtype > sessionStorage

	$('form#yelp').submit(function() {
		console.log('start');
		var question = $('input#questionbox').val();
		sessionStorage["question"] = JSON.stringify(question);
		console.log(question);
		var location = $('input#location' ).val();
		sessionStorage["location"] = JSON.stringify(location);
		console.log(location);
		var foodtype = $('select#foodtype option:selected').val();
		sessionStorage["foodtype"] = JSON.stringify(foodtype);
		console.log(foodtype);

		// VALIDATION TO MAKE SURE LOCATION AND FOODTYPE IS NOT NULL
		console.log('end');

	});
    
    // create empty array as var to pass checked yelp
	var yelpchecked = [];
    // this is to get checkbox user input from yelp page
	$('#pickpeople').click(function() {

		// iterate to get value of checked
        $('ul#yelplist input[type="checkbox"]:checked').each( function() {
            yelpchecked.push($(this).val());
        });

		//send yelpchecked to 
        $.ajax({
	        type: "POST",
	        url: "php/save-questions.php",
	        data: { 
	            yelpchecked_array: yelpchecked 
	        },
		success : function(json) {
			console.log(json);
		}

        });

		console.log(yelpchecked);
		sessionStorage["yelpchecked"] = JSON.stringify(yelpchecked);
		console.log(sessionStorage["yelpchecked"]);
		//window.location = "/product/people.html";
	});

	// check for people page - var fbfiends from session storage string to array for use in list
	// loop through friends to create list w/ id as value & name displayed
	if($('#people-page').length) {

	    window.fbAsyncInit = function() {
		    FB.init({
		        appId      : '539412832790457', // App ID
		        channelUrl : '/channel.html', // Channel File
		        status     : true, // check login status
		        cookie     : true, // enable cookies to allow the server to access the session
		        xfbml      : true  // parse XFBML
		    });
		};
    // Load the SDK asynchronously
	(function(d){
	    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	    if (d.getElementById(id)) {return;}
	    js = d.createElement('script'); js.id = id; js.async = true;
	    js.src = "//connect.facebook.net/en_US/all.js";
	    ref.parentNode.insertBefore(js, ref);
	    }(document));

		//console, parse string to json array & var sessionStorage
		console.log(JSON.parse(sessionStorage["yelpchecked"]));
		console.log(JSON.parse(sessionStorage["fbfriends"]));
		var fbfriends=JSON.parse(sessionStorage["fbfriends"]);

		//get div mfs, create form w/ id mfsForm
	    var container = document.getElementById('mfs');
	    var mfsForm = document.createElement('form');
	    mfsForm.id = 'mfsForm';

	    // Iterate through the array of friends object and create a checkbox for each one.
	    for(var i = 0; i < Math.min(fbfriends.data.length, 10); i++) {
		    var friendItem = document.createElement('div');
		    friendItem.id = 'friend_' + fbfriends.data[i].id;
		    friendItem.innerHTML = '<input type="checkbox" name="friends" value="'
		    + fbfriends.data[i].id
		    + '" />' + ' ' + fbfriends.data[i].name;
		    mfsForm.appendChild(friendItem);
	    }
	    container.appendChild(mfsForm);

	    // Create a button to send the Request(s)
	    var sendButton = document.createElement('input');
	    sendButton.type = 'button';
	    sendButton.value = 'Send Request';
	    sendButton.onclick = sendRequest;
	    mfsForm.appendChild(sendButton);

	};

	if($('#settings-page').length) {
		console.log(JSON.parse(sessionStorage["yelpchecked"]));
		console.log(JSON.parse(sessionStorage["fbfriends"]));
		var fbfriends=JSON.parse(sessionStorage["fbfriends"]);
		
	    window.fbAsyncInit = function() {
		    FB.init({
		        appId      : '539412832790457', // App ID
		        channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
		        status     : true, // check login status
		        cookie     : true, // enable cookies to allow the server to access the session
		        xfbml      : true  // parse XFBML
		    });

			function renderMFS() {
				// First get the list of friends for this user with the Graph API
			    FB.api('/me/friends', function(response) {
				    var container = document.getElementById('mfs');
				    var mfsForm = document.createElement('form');
				    mfsForm.id = 'mfsForm';

				    // Iterate through the array of friends object and create a checkbox for each one.
				    for(var i = 0; i < Math.min(response.data.length, 10); i++) {
					    var friendItem = document.createElement('div');
					    friendItem.id = 'friend_' + response.data[i].id;
					    friendItem.innerHTML = '<input type="checkbox" name="friends" value="'
					    + response.data[i].id
					    + '" />' + response.data[i].name;
					    mfsForm.appendChild(friendItem);
				    }
				    container.appendChild(mfsForm);

				    // Create a button to send the Request(s)
				    var sendButton = document.createElement('input');
				    sendButton.type = 'button';
				    sendButton.value = 'Send Request';
				    sendButton.onclick = sendRequest;
				    mfsForm.appendChild(sendButton);
			    });
		    };
		};
	};
	if($('#queue-page').length) {

	});

});