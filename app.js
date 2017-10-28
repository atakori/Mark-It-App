let MOCK_CREATED_CLASSES = {
	"createdClasses:": [
		{
			"id": "111111",
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
			"description": "If you want a good workout, take this class!"
		},
		{
			"id": "222222",
			"className": "Discover Hip Hop",
			"genre": "Hip Hop",
			"difficulty": "Beginner",
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
			"weeklyDayandTime": "Saturdays at 2PM",
			"dateCreated": "02/24/2017",
			"description": "Perfect for beginners!"
		},
		{
			"id": "333333",
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
			"description": "Only the strong survive in this class!"
		},
		{
			"id": "444444",
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
			"description": "Make sure you bring your tap shoes!"
		},
		{
			"id": "555555",
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
			"description": "Barre, tehcnique, and choreography all in one class."
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
//this will be used to implement the validate password feature

function getCreatedClasses(callback) {
	setTimeout(function() { callback(MOCK_CREATED_CLASSES)}, 100);
}

function displaycreatedClasses(data) {
	for (index in data.createdClasses) {
		$('.class_results_page').html(`<li class = "class_name"> ${data.className} |
			 ${data.genre} | ${data.studio.name} | ${data.weeklyDayandTime}
			</li>`)
	}
}

function getAndDisplayCreatedClasses () {
	getCreatedClasses(displaycreatedClasses);
}

//RESULTS SECTION
function getUserSearchterm() {
	let searchterm = $('.search_term').val();
	//this is the value I will be using to pass in as a parameter
	//for mongoose once the DB it is created
	// .find{choreographer: ${searchterm}} to filter out the database
	//with classes
}

$(getAndDisplayCreatedClasses());