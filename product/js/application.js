
// jquery helper funtion
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
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
	}

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
		console.log(JSON.parse(sessionStorage["yelpchecked"]));
		console.log(JSON.parse(sessionStorage["fbfriends"]));
		var fbfriends=JSON.parse(sessionStorage["fbfriends"]);
		for (i=0,len=fbfriends.data.length;i<len;i++) {
			console.log(i);
			content = '<li><input type="checkbox" name="friends" value="' + fbfriends.data[i].id + '"> ';
            content += fbfriends.data[i].name;
            content += "</li>";
            $("ul#peoplelist").append(content);
		}
	}
});
