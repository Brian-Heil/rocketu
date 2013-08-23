$( document ).ready(function() {
	
	function car(make,color,speed){
		this.make = make
		this.color = color
		this.speed = speed

		this.setSpeed = setSpeed;
		function setSpeed(speed) {
			this.speed = speed;
		}

	}
	var myCar = new car('ford','red',90);
	console.log(myCar);

	$('h1').html('Virtual Car (' + myCar.color + ' ' + myCar.make + ')');
	
	myCar.setSpeed(100);
	console.log(myCar);

	myCar.setSpeed(150);
	console.log(myCar);

});