function handleLoginButton() {
	$('.login_page_form').on('click', '.login_button', function(event) {
		console.log("WORKS!");
	});
}

function handleTestButton() {
	$('.class_results_page').on('click', '.test', function (e) {
		e.preventDefault();
		console.log("WORKING!")
	})
}

function handleSearchResultsButton() {
	$('.class_results_form').on('click', '.search_button', function(event) {
		event.preventDefault();
		console.log("works");
		getUserSearchterm();
	})
}

$(handleSearchResultsButton());