function handleLoginButton() {
	$('.login_page_form').on('click', '.login_button', function(event) {
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

$(handleLoginButton());
$(handleNavLoginButton());
$(handleSearchResultsButton());
hideLoginPage();