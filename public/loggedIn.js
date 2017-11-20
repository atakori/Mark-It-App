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

function handleDeleteClassButton() {
	$('.user_class_list').on('click', '.delete_class_button', function(e) {
		e.preventDefault();
		console.log($(this).parent())
		console.log($(this).parent().attr('className'));

/*function handleAddClassButton() {
	$('.class_page_header').on('click', '.add_class_button', function (e) {
		e.preventDefault();
		console.log('button hooked up');
		let className = $(location).attr('pathname').split("/");
			className = className[2].split("%20");
			className = className.join(' ');
		postUsernametoClass(className, currentUser)
	})
}

function postUsernametoClass (className, currentUser) {
	let url= `/class/${className}/addUser?currentUser=${currentUser}`;
	$.post(url, function(data) {
		console.log(data)
	})
	.done(function() {
		console.log('User successfully enrolled');
		renderAddedUsertoClassMessage();
		//need to add $('.').html() to add visual feedback
		//user they have been added!
		//this will reload the page when completed!
	})
}*/
	})
}

function renderUsersClassesList(classes) {
	for(let i=0; i<classes.length; i++) {
		$('.user_class_list').append(`<li id= "class" className= ${classes[i].className}><p class= "class"> ${classes[i].className} | 
			${classes[i].genre} | ${classes[i].studio.name} | 
			${classes[i].weeklyDayandTime}</p> 
			<button class= "delete_class_button">Delete Class</button>
			<a href = "/class/${classes[i].className}"><button class= "class_button"> Go to 
			 <span class= "class_name">${classes[i].className}</span> page</Button></a> </li>`);
	}
}

 getUsername();
 getUserClasses();
 $(handleDeleteClassButton());