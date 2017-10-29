function handleLoginButton() {
	$('.login_page_form').on('click', '.login_button', function(event) {
		console.log("WORKS!");
	});
}

function handleSignUpLink() {
		$('.nav').on('click', '.sign_up_link', function(event) {
		event.preventDefault();
		showSignUpPage();
		hideLandingPage();
		hideResultsPage()
	})
}

function handleNavLoginButton() {
	$('.nav').on('click', '.login_link', function(event) {
		event.preventDefault();
		showLoginPage();
		hideLandingPage();
		hideResultsPage()
		hideSignUpPage();
	})
}

function handleNavLogOutButton() {
	$('.nav').on('click', '.logout_link', function(event) {
		event.preventDefault();
		hideLoginPage();
		showLandingPage();
		hideResultsPage();
		hideSignUpPage();
	})
}

function handleSearchLinkButton() {
	$('.nav').on('click', '.search_link', function(event) {
		event.preventDefault();
		showResultsPage();
		hideLandingPage();
		hideLoginPage();
		hideSignUpPage();
	})
}

function handleLogoButton() {
	$('.navbar').on('click', '.navbar-brand', function(event) {
		event.preventDefault();
		showLandingPage();
		hideLoginPage();
		hideResultsPage();
		hideUploadPage();
		hideSignUpPage
	})
}

function handleSearchResultsButton() {
	$('.class_results_form').on('click', '.search_button', function(event) {
		event.preventDefault();
		console.log("works");
		getUserSearchterm();
	})
}


function hideLandingPage() {
	$('.landing_page').hide();
}

function showLandingPage() {
	$('.landing_page').show();
}

function hideSignUpPage() {
	$('.sign_up_page').hide();
}

function showSignUpPage() {
	$('.sign_up_page').show();
}

function hideLoginPage() {
	$('.login_page').hide();
}

function showLoginPage() {
	$('.login_page').show();
}

function showResultsPage() {
	$('.class_results_page').show();
}

function hideResultsPage() {
	$('.class_results_page').hide();
}

function showUploadPage() {
	$('.upload_video_page').show();
}

function hideUploadPage() {
	$('.upload_video_page').hide();
}

$(handleLoginButton());
$(handleSignUpLink());
$(handleNavLoginButton());
$(handleSearchLinkButton());
$(handleSearchResultsButton());
$(handleLogoButton());
$(handleNavLogOutButton());
hideLoginPage();
hideResultsPage();
hideUploadPage();
hideSignUpPage();