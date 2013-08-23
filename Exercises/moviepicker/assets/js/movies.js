var actionMovies = [
	{ title: 'Superman: Unbound', isNew: true },
	{ title: 'Hansel &amp; Gretel', isNew: true },
	{ title: 'A Good Day to Die Hard', isNew: false },
	{ title: 'Skyfall', isNew: true },
	{ title: 'Night of the Templar', isNew: false }
];

var comedyMovies = [
	{ title: 'Junior High Spy', isNew: false },
	{ title: 'Movie 43', isNew: true },
	{ title: 'Quartet', isNew: false },
	{ title: 'It\'s a Disaster', isNew: true },
	{ title: 'Family Weekend', isNew: false }
];

var scifiMovies = [
	{ title: 'Pan\'s Labyrinth', isNew: false },
	{ title: 'Game of Thrones', isNew: true },
	{ title: 'Merlin', isNew: true },
	{ title: 'Start Trek: First Contact', isNew: false },
	{ title: 'Star Wars', isNew: false }
];

function drawMovies(containerId,movieList) {
	var container = document.getElementById(containerId);
	console.log(container);
	var moviesHTML = '';
	for(i in movieList) {
		moviesHTML += '<li ondblclick="addMovieToPickList(this);"' + (movieList[i].isNew? ' class="new"':'') + '>' + movieList[i].title + '</li>';
	}
	container.innerHTML = moviesHTML;
}

drawMovies('action-movies',actionMovies);
drawMovies('comedy-movies',comedyMovies);
drawMovies('scifi-movies',scifiMovies);