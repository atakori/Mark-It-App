function handleLoginButton() {
	$('.login_page_form').on('click', '.login_button', function(event) {
		if($('.password_input').val().length === 0) {
			event.preventDefault();
			$('.error_message').html('Please enter your password');
		} else if($('.username_input').val().length === 0) {
			event.preventDefault();
			$('.error_message').html('Please enter your username');
		}
	});
}
//Tells the users if there is a missing userName or Password

$(handleLoginButton());