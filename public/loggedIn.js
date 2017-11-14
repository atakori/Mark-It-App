function getUsername() {
	let url = `/api/user_data`;
	$.getJSON(url).then(data => {
		console.log(data);
		displayUserName(data);
	})

}

function displayUserName(data) {
	$('.welcome_message').html(`Welcome ${data.currentUser.username}, you are now logged into`)
}

 getUsername();