
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

	$("#pickpeople").click(function(){
		//window.location = "/product/people.html"
		return false;
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
		location.reload()
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

		//getYelpData(location,foodtype);
		console.log('end');

	});
    
    // create new variable and put below in array to pass to people
	var yelpchecked = [];
    // this is to get checkbox user input from yelp page
	
	$('#pickpeople').click(function() {
		$('ul#yelplist input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				console.log($(this).val());
				//yelpchecked = ($(this).val());
				// console.log(yelpchecked);
				yelpchecked.push($(this).val());
			}
		})
	console.log(yelpchecked);
	})

	if($('#people-page').length) {
		var location = getParameterByName('location');
		var foodtype = getParameterByName('foodtype');
		console.log(location + ' ' + foodtype);
		// getYelpData(location,foodtype);
	}



});