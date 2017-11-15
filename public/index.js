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

function handleTestButton() {
	$('.class_results_page').on('click', '.test', function (e) {
		e.preventDefault();
		console.log("WORKING!")
	})
}

function handleSearchClassesButton() {
	$('.class_results_form').on('click', '.search_button',function(e){
	  e.preventDefault();
	  const choreographer = $('.search_term').val();
	  getClasses(choreographer);
	});
}

function handleCreateClassesButton() {
	$('.create_class_form').on('click', '.create_class_button', function (e) {
		if ($('.class_name_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the class name`);
		} else if ($('.class_genre_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the class genre`);
		} else if ($('.class_schedule_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the weekly day and time of the class`);
		} else if ($('.difficulty_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the class difficuty`);
		} else if ($('.choreographer_name_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the choreographer's name`);
		} else if ($('.studio_name_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the Studio Name`);
		}  else if ($('.street_name_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the Studio's street name`);
		} else if ($('.city_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the Studio's city location`);
		} else if ($('.state_name_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please enter the studio's state location`);
		} else if ($('.zipcode_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please fill in the Studio location's zipcode`);
		} else if ($('.class_description_input').val().length === 0) {
			e.preventDefault()
			$('.create_class_error_message').html(`Please enter a class description`);
		} 
	})
}

$(handleCreateClassesButton());
$(handleLoginButton());
$(handleSearchClassesButton());
$(handleTestButton());