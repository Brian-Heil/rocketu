function hidePickList() {
	var pickListClass = document.getElementsByClassName("picklist");
	console.log('works');
	pickListClass[0].style.display = 'none'
}
function hideMovieList(element) {
	var pickMovieClass = document.getElementsByClassName(element.name);
	console.log(pickMovieClass);
	pickMovieClass[0].style.display = 'none'
}