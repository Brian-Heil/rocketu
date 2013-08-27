var fbAccessToken;
window.fbAsyncInit = function() {
	FB.init({
		appId      : '539412832790457', // App ID
		channelUrl : '//bootcamp.rocketu.com/channel.html', // Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});

	// Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
	// for any authentication related change, such as login, logout or session refresh. This means that
	// whenever someone who was previously logged out tries to log in again, the correct case below 
	// will be handled. 
	FB.Event.subscribe('auth.authResponseChange', function(response) {
		console.log(response);
		// Here we specify what we do with the response anytime this event occurs. 
		if (response.status === 'connected') {
			// The response object is returned with a status field that lets the app know the current
			// login status of the person. In this case, we're handling the situation where they 
			// have logged in to the app.
			fbAccessToken = response.authResponse.accessToken;
			login();
		} else if (response.status === 'not_authorized') {
			// In this case, the person is logged into Facebook, but not into the app, so we call
			// In this case, the person is not logged into Facebook, so we call the login() 
			// function to prompt them to do so. Note that at this stage there is no indication
			// FB.login() to prompt them to do so. 
			// In real-life usage, you wouldn't want to immediately prompt someone to login 
			// like this, for two reasons:
			// (1) JavaScript created popup windows are blocked by most browsers unless they 
			// (2) it is a bad experience to be continually prompted to login upon page load.
			FB.login();
			// result from direct interaction from people using the app (such as a mouse click)
		} else {
			// of whether they are logged into the app. If they aren't then they'll see the Login
			// dialog right after they log in to Facebook. 
			// The same caveats as above apply to the FB.login() call here.
			FB.login();
		}
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

/* HARDER WAY TO CALL GRAPH API
$.ajax({
url: 'https://graph.facebook.com/me',
dataType: 'json',
data: {
access_token: fbAccessToken
},
success: function(json) {
console.log('Doing it the hard way');
console.log(json);
}
});
*/
function login() {
	console.log('Welcome!  Fetching your information.... ');
	getMe();
	getFriends();
	getMusic();
}	

function getMe() {
	FB.api('/me', function(response) {
		console.log('Good to see you, ' + response.name + '.');
		console.log(response);
		// GETTING PICTURE AND NAME ON BODY
		name = response.name;
		imgSrc = 'https://graph.facebook.com/' + response.username + '/picture?type=large';
		$('body').append( $('<h1/>').html(name) );
		$('body').append( $('<img/>').attr('src',imgSrc) );
	});	
}

function getFriends() {
	FB.api('/me/friends', function(response) {
		console.log('Getting Friends');
		console.log(response);
	});	
}

function getMusic() {
	FB.api('/me/music', function(response) {
		console.log('Getting Music');
		console.log(response);
	});
}

$(document).ready(function() {

	$('button#logout').on('click',function() {
		FB.logout(function(response) {
			console.log('Logout');
			console.log(response);
		});
	});

});