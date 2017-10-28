function handleLoginButton() {
	$('.login_page_form').on('click', '.login_button', function(event) {
		event.preventDefault();
		console.log("WORKS!");
	});
}

function handleNavLoginButton() {
	$('.nav').on('click', '.login_link', function(event) {
		event.preventDefault();
		showLoginPage();
		hideLandingPage();
	})
}

function hideLandingPage() {
	$('.landing_page').hide();
}

function hideLoginPage() {
	$('.login_page').hide();
}

function showLoginPage() {
	$('.login_page').show();
}

$(handleLoginButton());
$(handleNavLoginButton());
hideLoginPage();