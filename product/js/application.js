
// jquery helper funtion
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

$( document ).ready(function() {

	$("#loginjquery").on('click',(function(){
		window.location = "/product/queue.html"
	}));

	$("#yelpresults").on('click',(function(){
		window.location = "/product/yelp.html"
	}));

	$("#pickpeople").on('click',(function(){
		window.location = "/product/people.html"
	}));

	$("#draft").on('click',(function(){
		window.location = "/product/draft.html"
	}));

	$("#vote").on('click',(function(){
		window.location = "/product/vote.html"
	}));

	$('button#logout').on('click',function() {
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

	$('form#yelp').on('submit',function() {
		console.log('start');
		var location = $('input#location' ).val();
		console.log(location);
		var foodtype = $('select#foodtype option:selected').val();
		console.log(foodtype);

		// VALIDATION TO MAKE SURE LOCATION AND FOODTYPE IS NOT NULL

		//getYelpData(location,foodtype);
		console.log('end');

	});
        
    // this is to get checkbox user input from yelp page

	$('button').on('click',function() {
		$('ul#yelplist input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				console.log($(this).val());

			}
		})
	})
    
    	if($('#people-page').length) {
		var location = getParameterByName('location');
		var foodtype = getParameterByName('foodtype');
		console.log(location + ' ' + foodtype);
		// getYelpData(location,foodtype);
	}
	


});