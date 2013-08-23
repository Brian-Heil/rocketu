// Goal: Get JSON data from 'API'
// http://bootcamp-rocketu.rhcloud.com/exercises/ajax/data/movies-box-office.json
$( document ).ready(function(){
	$.ajax({
		// Request
		type: 'get',
		url: 'http://bootcamp-rocketu.rhcloud.com/exercises/ajax/data/movies-box-office.json',
		data: {},
		// Response
		dataType: 'json',
		success : function(json) {
			console.log(json);
			// Goal: Display move titles in a list in the HTML
			// List:
				// 1. Identify list of movies
				// 2. Loop through list of movies
				// 3. Find the movie title and add it to a list in HTML
			console.log(json.movies);
			// for(var i in json.movies) {
			// 	$('#movielist').append( $('<li>').html (json.movies[i].title));

			for (var i in json.movies) {
				// 
				var movieItem = '<li>';
					movieItem += json.movies[i].title;
					movieItem += '<img src"' + json.movies[i].posters.thumbnail + '"/>';
					movieItem += '<li>';
				
				// Using inline mustache template
				var movieTemplate = '<li>{{title}}<img src="{{posters.thumbnail}}"/>{{ratings.critics_rating}}<li>';
				
				// Using html mustache template (preferred)
				var movieTemplate = $('#movie-template').html();

				// Rendering the output using mustache
				var output = Mustache.render(movieTemplate, json.movies[i]);
				
				// $('#movies').append(movieItem);
				$('#movies').append(output);
			}
		},	
		error: function(err) {
			console.log('err');
		},
	});

});