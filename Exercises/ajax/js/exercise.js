$( document ).ready(function(){
	$('form').on('submit',function() {
		var firstname = $(this).find('input#firstname').val();
		console.log(firstname);
		var lastname = $(this).find('input#lastname').val();
		console.log(lastname);

		$.ajax({
			url: 'http://bootcamp-rocketu.rhcloud.com/api?',
			type: 'GET',
			dataType: 'json',
			data: {
				fname: firstname,
				lname: lastname,
				date: (new Date())
			},
			success : function(json) {
				console.log(json);
			}
		});

		return false;
	});

	$('#getjson').on('click',
	function(){
		var person = {
			firstname: 'Brian',
			lastname: 'Heil',
			email: 'brianheil3@gmail.com',
			address: '333 Harrison St.',
			age: '53',
			cell: '239-810-2398',
			bands: ['Lynard Skynard','Pink Floyd','Led Zepplin']
		}
		console.log('Hi, I\'m ' + person.firstname + '.' + ' I\'m ' + person.age + ' years old and I like listening to ' + person.bands[0]);
	})
	$('#getmovie').on('click',function() {
		console.log('Getting Movie');

		$.ajax({
			url:'data/movie.json',
			dataType:'json',
			success: function(data) {
				console.log(data);
				for(i=0;i<data.length;i++) {
					$('body').append( $('<p/>').html(data[i].title) );
				}
			}
		});
	});
	$('#getjsonajax').on('click',function() {
		console.log('Ajax on me');

		$.ajax({
			url:'data/mydata.json',
			dataType:'',
			success: function()
			{
				console.log()
			}
		})

	});
	$('#testget').on('click',function() {
		console.log('Get');

		$.ajax({
			url:'http://bootcamp-rocketu.rhcloud.com/api?submit=Submit&firstname=Brian&lastname=Heil',
			type: 'GET',
			dataType: 'json',
			success: function(json){
				console.log('working');
				console.log(json);
				for(var k in json.data) {
					$('body').append('<p>' + k + '=' + json.data[k]);
				}
			}
		});		
	});
});