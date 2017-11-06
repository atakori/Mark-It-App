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

function handleSearchClassesButton() {
	$('.class_results_form').on('click', '.search_button',function(e){
	  e.preventDefault();
	  /*const choreographer = $(e.target).find('input[name=choreographer]').val()*/
	  const choreographer = $('.search_term').val();
	  getClasses(choreographer);
	});
}

function handleGoToClassPageButton() {
	$('.search_results').on('click', '.class_button', function(e) {
		e.preventDefault();
		console.log("WORKING");
		let className = $(this).find('.class_name').text();
		getPageInformation(className);
		//this should be substitued for the class ID in the future
	})
}

$(handleSearchClassesButton());
$(handleGoToClassPageButton());
$(handleTestButton());