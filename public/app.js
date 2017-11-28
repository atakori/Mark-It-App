let currentClassData;

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
/*function handleSearchClassesButton() {
	$('.class_results_form').on('click', '.search_button',function(e){
	  e.preventDefault();
	  const choreographer = $(e.target).find('input[name=choreographer]').val()
	  getClasses(choreographer);
	});
}*/

function getClasses(choreographer) {
	let url = `/searchresults?choreographer=${choreographer}`;
  	$.getJSON(url).then( data => {
  		displaySearchResults(data);
  	//makes a call to the server to grab the classes with a matching
  	//choreographer name that is entered by the user
  });
}

function displaySearchResults(data) {
	$('.search_results').empty();
	$('.search_results').html(`<h2 class= "search_results_header">Available Classes</h2>`);
	if (data.classes.length === 0) {
		$('.search_results').append(`<h2 class= "no_results_message"> Sorry, there are no matching choreographers found. Try another person! </h2>`)
	} else {
	for (let i=0; i<data.classes.length; i++) {
		$('.search_results').append(`<li class = "class_info"> <span class= "class_title">${data.classes[i].className} </span>
			 ${data.classes[i].genre} | ${data.classes[i].studioName} | 
			 ${data.classes[i].weeklyDayandTime} </li> 
			 <a href = "/class/${data.classes[i].className}"><button class= "btn btn-primary class_button"> Go to 
			 <span class= "class_name">${data.classes[i].className}</span> page</Button></a> <hr class="line_seperator">`)
		}	
	}
}

//CLASS PAGE SECTION
function getPageInformation(className) {
	let url = `/classdata?className=${className}`;
	$.getJSON(url).then(data => {
  		displayClassPage(currentClassData);
  	//makes a call to the server to grab the classes with a matching
  	//choreographer name that is entered by the user
  });
}

function displayClassPage(classdata) {
	window.location.replace("/classPage");
	displayPageInformation(classdata);
	//displayPageInformation not running due to the 
	//re-rendering of the page
}

function displayPageInformation(data) {
	$('.class-title').html(`<h1> displayPageInformation is still being called!</h1>`);
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
$(getAndDisplayClassVideos());
$(getAndDisplayDanceVideo());