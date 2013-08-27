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