function helloWorld() {
	getGreeting();
	document.write (greeting + ' World!');
}
//helloWorld();
//var m = d.getMinutes();
function getGreeting() {
	var d = new Date();
	var n = d.getHours();
	console.log(n);
	var greeting;
	if (n < 12) {
		greeting='Good Morning';
	} 
	else{
		greeting='Good Evening';
		
	}
	alert(greeting + ' World!')
}
//getGreeting();
//};
//greeting=getGreeting()
function sayPersonalHello() {

}
function getUserName() {
	 var fname=prompt("Hi what is your name?","")
  	 document.getElementById("msg").innerHTML="Greetings " + fname
}