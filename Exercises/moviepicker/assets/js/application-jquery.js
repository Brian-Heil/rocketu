$(document).ready(function() {
	$('picklist ul.picklist').hide();
	$('input[type=checkbox]').attr('checked','checked');
	$('input[type=checkbox]').on('change',function(){
		console.log($(this).attr('name'));
	});
	// $('input[type=checkbox]').on('change')hide();
	$('button#btn-newmovies').on('click',function() {

	})
})