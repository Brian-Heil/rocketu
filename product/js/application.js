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



});