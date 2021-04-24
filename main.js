var cues = null;
var sports = null;
var title = null;

// Called once the page has loaded
document.addEventListener('DOMContentLoaded', function(event) {
	loadCues();
	loadSports();
});

// Replace this with your Sheety URL
// Make sure NOT to include the sheet name in the URL (just the project name!)
var projectUrl = 'https://api.sheety.co/6087c045e0474f4f8b8e9cd4c972c0a8/productQuest';

function loadCues() {
	fetch(projectUrl + '/Cues')
	.then((response) => response.json())
	.then(json => {
		this.cues = json.cues.sort((a, b) => {
			return a.votes < b.votes;
		})
		showAllCues();
	});
}

function loadSports() {
	fetch(projectUrl + '/sports')
	.then((response) => response.json())
	.then(json => {
		this.sports = json.sports;
		drawSports();
	})
}

function drawCues(cues) {
	var template = Handlebars.compile(document.getElementById("cues-template").innerHTML);
	document.getElementById('cues-container').innerHTML = template({
		title: this.title,
		cues: cues	
	});
}

function drawSports() {
	var template = Handlebars.compile(document.getElementById("menu-template").innerHTML);
	console.log('draw ', this.cues);
	document.getElementById('menu-container').innerHTML = template(this.sports);
}

function showAllCues() {
	this.title = "All Cues";
	drawCues(this.Cues);
}

function showSport(sport) {
	this.title = sport;
	let filteredCues = this.Cues.filter(Cue => {
		return Cue.sport == sport;
	});
	drawCues(filteredCues);
}

function upvoteCue(id) {
	let cue = this.Cues.find(Cue => {
		return Cue.id == id;
	});
	Cue.votes = Cue.votes + 1;
	Cue.hasVoted = true;
	
	let headers = new Headers();
	headers.set('content-type', 'application/json');
	fetch(projectUrl + '/Cues/' + id, {
		method: 'PUT',
		body: JSON.stringify({ Cue: Cue }),
		headers: headers
	});
	
	showAllCues();
}
