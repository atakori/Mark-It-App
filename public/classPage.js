let currentUser;

function getUsername() {
	let url = `/api/user_data`;
	$.getJSON(url).then(userdata => {
		currentUser = userdata.currentUser.username;
		getClassData(currentUser);
	})
}
//grabs the current userdata from the server then
//passes the current user to getCLassData function

function getClassData(currentUser) {
	let className = $(location).attr('pathname').split("/");
			className = className[2].split("%20");
			className = className.join(' ');
	let url = `/classdata?className=${className}`;
	$.getJSON(url).then(data => {
  		displayClassData(data)
  		if(currentUser === data.matchingClasses[0].adminUser) {
  			displayAdminInfo();
  		}
  }) 
}
//Looks through all classes in the DB for class
//information to display on the page

function displayAdminInfo() {
	$('.class_admin_section').html(`<button class= "btn btn-lg btn-danger admin_delete_class_button">Permanently Delete Class</button>`)
}
//displays admin features if the user in the admin
//for the class

function handleDeleteClassButton() {
	$('.class_admin_section').on('click', '.admin_delete_class_button', function(e) {
		e.preventDefault();
		let className = $(location).attr('pathname').split("/");
			className = className[2].split("%20");
			className = className.join(' ');
			deleteClassFromDatabase(className);
	})
}

function deleteClassFromDatabase(className) {
	$.ajax({
		url: `/api/${className}/deleteclass`,
		type: 'DELETE',
		success: function(result) {
			$('main').html(`<h1 class = "deleted_message">This class has been deleted</h1>
				<a href= "/userHome"><button class= "home_button">Back to Home Page</button></a>`);
		}
	})
}

function displayClassData (data) {
	$('.class_page_header').html(`<h1 class= "class_header"> 
		Welcome to <span class= class_title>${data.matchingClasses[0].className}</span></h1>
		<div class= "user_button"> </div>`);
	$('.class_page_description').html(`<h2 class= "class_description">
	${data.matchingClasses[0].description}</h2>`);
	$('.class_videos_section').html(`<h2 class= "videos_header"> 
		Class Videos</h2> <div class= video_list></div>`);
	$('.class_upload_section').html(`<a href= "/class/${data.matchingClasses[0].className}/upload">
	 <button class= "btn btn-lg btn-primary upload_video_button"> Upload new class video</button></a>`)
	$('.class_information_section').html(`<div class= "class_info"><h3 class= "info_header"> Class Info</h3><p> Studio: ${data.matchingClasses[0].studioName}
		</p> <p class= "studio_address">${data.matchingClasses[0].studioAddress}</p>
		<p class= "class_time">${data.matchingClasses[0].weeklyDayandTime}</p></div>`)
	let classdata = data.matchingClasses[0];
	let videoData = data.matchingClasses[0].videos;
	renderClassVideos(classdata, videoData);
	checkStudentEnrollment(classdata);
}

function renderClassVideos(data, videos) {
	if(videos.length >0) {
		for(let i= 0; i<videos.length; i++) {
			$('.video_list').append(`<li class= "class_video"><a href= "/class/${data.className}/${videos[i].video_id}"> 
			${videos[i].videoTitle} | ${videos[i].classDate}</li></a>`)
		}
	} else {
		$('.video_list').html(`<h3 class= 'no_videos_message'>No videos uploaded for this class :(</h3>`)
	}
}
//if there are video object in the array, show them to the user
//if not, display a 'no video message'

function checkStudentEnrollment(data) {
	function userMatch(user) {
		return  user === currentUser;
	}
	if(data.currentUsers.length === 0) {
		renderAddClassButton(data);
	}
	for(let i=0; i<data.currentUsers.length; i++) {
		if(data.currentUsers.find(userMatch)) {
			return console.log('User currently enrolled in Class');
		} else {
		renderAddClassButton(data);
		}
	}
}

//checks if the student is added to the course already
//if not, the add Class button shows up on the page

function renderAddClassButton(userdata) {
	$('.user_button').html(`<a href= "/api/${currentUser}/addUser">
	 <button class= "add_class_button"> Add Class</button></a>`)
}
function handleAddClassButton() {
	$('.class_page_header').on('click', '.add_class_button', function (e) {
		e.preventDefault();
		let className = $(location).attr('pathname').split("/");
			className = className[2].split("%20");
			className = className.join(' ');
		postUsernametoClass(className, currentUser)
	})
}

function postUsernametoClass (className, currentUser) {
	let url= `/class/${className}/addUser?currentUser=${currentUser}`;
	$.post(url, function(data) {
		console.log(data);
	})
	.done(function() {
		renderAddedUsertoClassMessage();
		//need to add $('.').html() to add visual feedback
		//user they have been added!
		//this will reload the page when completed!
	})
}

function renderAddedUsertoClassMessage() {
	$('.user_button').html(`<p class= "user_created_message">
			You have successfully been added to the class!</p>`)
}


//**FUTURE CODE for implementation of server-side upload**
/*function postVideoInfotoServer(className, videoTitle, classDate, dancers, video_id, video_url) {
	let url = `/class/${className}/upload?videoTitle=${videoTitle}&classDate=${classDate}&dancers=${dancers}&video_id=${video_id}&video_url=${video_url}`;
	$.post(url, function(data) {
		console.log(data)
	})
	.done(function() {
		$('.upload_video_page').html(`<h2> Video successfully uploaded! </h2>
			<a href= "/class/${className}"><button class= "class_page_button"> Back to ${className} </button></a>`)
	})
}*/

$(getUsername());
$(handleAddClassButton());
$(handleDeleteClassButton());