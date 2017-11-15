function getUsername() {
	let url = `/api/user_data`;
	$.getJSON(url).then(data => {
		console.log(data);
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

function renderUsersClassesList(classes) {
	for(let i=0; i<classes.length; i++) {
		$('.user_class_list').append(`<p class= "class"> ${classes[i].className} | 
			${classes[i].genre} | ${classes[i].studioname} | 
			${classes[i].weeklyDayandTime}</p> 
			<a href = "/class/${classes[i].className}"><button class= "class_button"> Go to 
			 <span class= "class_name">${classes[i].className}</span> page</Button></a>`);
	}
}

 getUsername();
 getUserClasses();