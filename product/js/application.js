
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
    // Use FB.ui to send the Request(s)
	// FB.ui({method: 'apprequests',
	// 	to: sendUIDs,
	// 	title: 'My Great Invite',
	// 	message: 'Check out this Awesome App!',
	// }, callback);

	FB.ui({
	  method: 'send',
	  to: sendUIDs,
	  link: 'http://rocket-space.com/rocketu/',
	});
}

function callback(response) {
    console.log(response);
}

$( document ).ready(function() {

	$("#loginjquery").click(function(){
		window.location = "/product/queue.html"
	});

	$("#yelpresults").click(function(){
		window.location = "/product/yelp.html"
	});
	$("#draft").click(function(){
		window.location = "/product/draft.html"
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

	$('form#yelp').submit(function() {
		console.log('start');
		var location = $('input#location' ).val();
		console.log(location);
		var foodtype = $('select#foodtype option:selected').val();
		console.log(foodtype);

		// VALIDATION TO MAKE SURE LOCATION AND FOODTYPE IS NOT NULL
		console.log('end');

	});
    
    // create empty array as var to pass checked yelp
	var yelpchecked = [];
    // this is to get checkbox user input from yelp page
	$('#pickpeople').click(function() {
		$('ul#yelplist input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				console.log($(this).val());
				//yelpchecked = ($(this).val());
				yelpchecked.push($(this).val());
			}
		});
		console.log(yelpchecked);
		sessionStorage["yelpchecked"] = JSON.stringify(yelpchecked);
		console.log(sessionStorage["yelpchecked"]);
		window.location = "/product/people.html";
	});

	// check for people page - var fbfiends from session storage string to array for use in list
	// loop through friends to create list w/ id as value & name displayed
	if($('#people-page').length) {

	    window.fbAsyncInit = function() {
		    FB.init({
		        appId      : '539412832790457', // App ID
		        channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
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
});