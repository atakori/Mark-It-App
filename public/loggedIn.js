function getUsername() {
	let url = `/api/user_data`;
	$.getJSON(url).then(data => {
		displayUserName(data);
	})
}

function getUserClasses() {
	let url = `/api/usersclasses`;
	$.getJSON(url).then(data => {
		console.log(data);
		if(data[0] === undefined) {
			$('.user_class_list').html(`<h3 class= "no_classes_message">
				It looks like you do not have any classes. Let's see if
				 we can fix that :)</h3> <a href = "/searchClasses"><button class= "search_classes_button">
				 Search for classes</Button></a>`);
		} else{
			renderUsersClassesList(data);
		}
	})
}
//if the user does not have any classes, it will tell the user
//that they should search for classes to add to their page

function displayUserName(data) {
	$('.welcome_message').html(`Welcome ${data.currentUser.username}, you are now logged into`)
}

function handleDeleteClassButton() {
	$('.user_class_list').on('click', '.delete_class_button', function(e) {
		e.preventDefault();
		let className = $(this).parent().attr('className')
		deleteUsernameFromClass(className);
	})
}

function deleteUsernameFromClass(className) {
	let url= `/class/${className}/deleteuser`;
	$.post(url, function(data) {
		$('.user_class_list').empty();
	})
	.done(function(feedback) {
		getUserClasses();
	})
}
//after deleting the user from the class, the user's 
//classes updates on the page by running getUserClasses()

function renderUsersClassesList(classes) {
	for(let i=0; i<classes.length; i++) {
		$('.user_class_list').append(`<li id= "class" className= "${classes[i].className}"> <span class= "class_name_title">${classes[i].className} </span> <p class= "class_info"> 
			${classes[i].genre} | ${classes[i].studio.name} | 
			${classes[i].weeklyDayandTime} </p> 
			<button class= "btn btn-danger delete_class_button">Delete Class</button>
			<a href = "/class/${classes[i].className}"><button class= "btn btn-success class_button"> Go to 
			 <span class= "class_name">${classes[i].className}</span> page</Button></a> </li>`);
	}
}

 getUsername();
 getUserClasses();
 $(handleDeleteClassButton());