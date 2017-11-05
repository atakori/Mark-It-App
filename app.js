const {PORT, DATABASE_URL} = require('./config');

let MOCK_CLASSES = {
	"classes:": [
		{
			"_id": "111111",
			"className": "Ebb and Flow",
			"genre": "Modern",
			"difficulty": "Intermediate",
			"choreographer": "Alfredo Takori",
			"studio": {
				"name": "Dance101",
				"address": {
					"street": "123 dance avenue" ,
					"city": "Atlanta" ,
					"state": "GA",
					"zipcode": "30329"
				},
			},
			"weeklyDayandTime": "Tuesdays at 8PM",
			"dateCreated": "10/28/2017",
			"description": "If you want a good workout, take this class!",
			"currentUsers": ["atakori", "otheruser"],
			"videos": []
		},
		{
			"_id": "222222",
			"className": "Discover Hip Hop",
			"genre": "Hip Hop",
			"difficulty": "Beginner",
			"choreographer": "Alfredo Takori",
			"studio": {
				"name": "Dance101",
				"address": {
					"street": "123 dance avenue",
					"city": "Atlanta" ,
					"state": "GA",
					"zipcode": "30329"
				},
			},
			"weeklyDayandTime": "Saturdays at 2PM",
			"dateCreated": "02/24/2017",
			"description": "Perfect for beginners!",
			"currentUsers": ["testuser", "otheruser"],
			"videos": []
		},
		{
			"_id": "333333",
			"className": "Breaking it down",
			"genre": "Hip Hop",
			"difficulty": "Advanced",
			"choreographer": "Chealsea Stevens",
			"studio": {
				"name": "Steven Studios",
				"address": {
					"street": "898 hip street",
					"city": "Austin",
					"state": "TX",
					"zipcode": "73301"
				},
			},
			"weeklyDayandTime": "Thursdays at 12PM",
			"dateCreated": "10/28/2017",
			"description": "Only the strong survive in this class!",
			"currentUsers": []
		},
		{
			"_id": "444444",
			"className": "Slide and Tap",
			"genre": "Tap",
			"difficulty": "Intermediate",
			"choreographer": "Eliza Shumucker",
			"studio": {
				"name": "Gotta Dance ATL",
				"address": {
					"street": "1879 tip tap avenue",
					"city": "Atlanta",
					"state": "GA",
					"zipcode": "30328"
				},
			},
			"weeklyDayandTime": "Mondays at 3PM",
			"dateCreated": "05/22/2018",
			"description": "Make sure you bring your tap shoes!",
			"currentUsers": ["otheruser"],
			"videos": []
		},
		{
			"_id": "555555",
			"className": "Full Out",
			"genre": "Ballet",
			"difficulty": "Professional",
			"choreographer": "Sarah Hilmer",
			"studio": {
				"name": "The Ballet Institute",
				"address": {
					"street": "5463 Alastair Road",
					"city": "New York",
					"state": "NY",
					"zipcode": "12764"
				},
			},
			"weeklyDayandTime": "Mondays at 10AM",
			"dateCreated": "06/07/2019",
			"description": "Barre, tehcnique, and choreography all in one class.",
			"currentUsers": ["atakori", "otheruser", "testuser"],
			"videos": []
		}
	]
}

let MOCK_USERS = {
	"users": [
		{
			"userName": "atakori",
			"password": "passwordhash",
			"firstName": "Alfredo",
			"lastName": "Takori"
		},
		{
			"userName": "otheruser",
			"password": "passwordhash1",
			"firstName": "Joe",
			"lastName": "Morganson"
		},
		{
			"userName": "testuser",
			"password": "passwordhash2",
			"firstName": "Aiesha",
			"lastName": "Taylor"
		}
	]
}
//adding jquery to create classes page

function getClasses(callback) {
	setTimeout(function() { callback(MOCK_CLASSES)}, 100);
	$.getJSON(DATABASE_URL, callback)
}

function displayClasses(data) {
	for (index in data.classes) {
		$('.class_results_page').html(`<li class = "class_name"> ${data.className} |
			 ${data.genre} | ${data.studio.name} | ${data.weeklyDayandTime}
			</li>`)
	}
}

function getAndDisplayClasses () {
	getClasses(displayClasses);
}

//RESULTS SECTION
function getUserSearchterm() {
	let searchterm = $('.search_term').val();
	//this is the value I will be using to pass in as a parameter
	//for mongoose once the DB it is created
	// .find{choreographer: ${searchterm}} to filter out the database
	//with classes
}

function displaySearchResults(data) {
	for (index in data.classes) {
		$('.search_results').html(`<li class = "class_name"> ${data.className} |
			 ${data.genre} | ${data.studio.name} | ${data.weeklyDayandTime}
			</li>`)
	}
}

function getAndDisplaySearchResults() {
	getClasses(displaySearchResults);
}

//MY CLASSES SECTION
function getUserCurrentClasses(callback) {
	//this will be used to look in the mongoose db and filter 
	//for all classes with the user's username under the 
	//currentStudents Field. All of those classes will then 
	//display on the users My Classes Screen
}

function displayUserClasses(data) {
	for (index in data.classes) {
		$('.class_list_page').html(`<li class = "class_name"> ${data.className} |
			 ${data.genre} | ${data.studio.name} | ${data.weeklyDayandTime}
			</li>`)
	}
}

function getandDisplayCurrentUserClasses() {
	getUserCurrentClasses(displayUserClasses);
}

//DANCE PAGE SECTION
function getAllClassVideos(callback) {
	//this function will be used to look in the mongoose DB 
	//for the cooresponding class name using .find() to return 
	//that class infromation. It will the find look for the 
	//videos section to grab that data
}

function displayClassVideos(data) {
	for (index in data.classes.videos) {
		$('.videos').html(`<div class= "class_video"> 
			${data.classes.videos.title} | Performed by: 
			${data.classes.videos.dancers} | Class Date: 
			${data.classes.videos.uploadDate}</div>`);
	}
}

function getAndDisplayClassVideos() {
	getAllClassVideos(displayClassVideos);
}

//UPLOAD NEW VIDEO SECTION


// DANCE VIDEO PAGE SECTION
function getSelectedDanceVideo(callback) {
	//this function will look for the cooresponding video
	//in the mongoose db and will return actual video
	//information and file path
} 

function displaySelectedDanceVideo(data) {
	$('.dance_video_page').html(`<h1 class= "video_title">
		${data.title}</h1>`)
	//insert dance video here (src?)
}

function getAndDisplayDanceVideo() {
	getSelectedDanceVideo(displaySelectedDanceVideo);
}

$(getAndDisplayClasses());
$(getandDisplayCurrentUserClasses());
$(getAndDisplaySearchResults());
$(getAndDisplayClassVideos());
$(getAndDisplayDanceVideo());