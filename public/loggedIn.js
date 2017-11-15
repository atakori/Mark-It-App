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
	})
}

function displayUserName(data) {
	$('.welcome_message').html(`Welcome ${data.currentUser.username}, you are now logged into`)
}

/*function renderUsersClassesList(data) {
	$('.')
}*/

 getUsername();
 getUserClasses();