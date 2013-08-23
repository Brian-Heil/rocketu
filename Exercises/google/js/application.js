function errorHandler() {
	console.log('Error');
}
/*
	Goal: Display a map of your current location
	Logic:
		1. Get the current location
		2. "Construct" the map, getting the map url with parameters
		3. Display the map (drawing it out to the page)
		Optional, create custom getStaticMapUrl and drawMap functions
*/
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
		function(position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			/* OPTION 1 - EASIEST WAY - BRUTE FORCE 
			var url = 'http://maps.googleapis.com/maps/api/staticmap?';
				url += 'center=' + lat + ',' + lng + '&';
				url += 'zoom=13' + '&';
				url += 'sensor=false' + '&'; 	
				url += 'size=600x300' + '&';
				url += 'key=AIzaSyDuiqjtORQSJr1cTdjMWh8Q66xpKfOojQA';
			console.log(url);
			var map = document.getElementById('map');
			map.innerHTML = '<img src="' + url + '"/>';		
			*/
			url = getStaticMapUrl(position.coords);
			console.log(url);
			drawMap(url);
		}, 
		errorHandler
	);
} else {
	// SORRY, Geolocation is not supported
}

function getStaticMapUrl(params) {
	var url = 'http://maps.googleapis.com/maps/api/staticmap?',
		options = {
			zoom: 13,
			sensor: false,
			size: '600x600',
			key: 'AIzaSyDuiqjtORQSJr1cTdjMWh8Q66xpKfOojQA'	
		};
	if (params.latitude && params.longitude) {
		options.center = params.latitude + ',' + params.longitude;
	} else {
		options.center = 'San Francisco, CA';
	}
	for(var i in options) {
		// console.log(i)
		url += i + '=' + encodeURI(options[i]) + '&';
	}
	// added do not understand
	url += "markers=" + params.latitude + "," + params.longitude;
	console.log(url);
	// end added do not understand	
	return url;
}
function drawMap(url) {
	var map = document.getElementById('static-map');f
	map.innerHTML = '<img src="' + url + '"/>';
}

// Marker

function initialize() {
  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  var mapOptions = {
    zoom: 4,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('dynamic-map'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

// Dynamic

function getDynamicMap(position) {
	var mapOptions = {
		center: new google.maps.LatLng(37.797677,-122.394339),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(
		document.getElementById("dynamic-map"),
		mapOptions
	);
}
google.maps.event.addDomListener(window, 'load' , getDynamicMap);