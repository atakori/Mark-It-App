let username;
function getUsername() {
	let url = `/api/user_data`;
	$.getJSON(url).then(data => {
		username = data.currentUser.username;
	})
}

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
		} else {
			e.preventDefault();
			let data = new FormData($('#create_form')[0]);
			 $.ajax( {
			      data: data,
			      dataType: 'json',
			      type: 'POST',
			      url: '/makeClass',
			      contentType:false,
                  cache: false,
                  processData:false,
			      success: function(feedback){
			      	let className = feedback.className;
			      	let currentUser = username;
			         console.log("Class successfully created");
			         console.log(feedback);
			         postUsernametoClass(className, currentUser);
			         $('.create_class_page').html(`<h1 class= "created_message"> Your new class has been created</h1>
			         	<a href= "/class/${feedback.className}"><button> Go to ${feedback.className} class page!</button> </a>`)
			      }
		})
	}
})
}

function postUsernametoClass(className, currentUser) {
	let url= `/class/${className}/addUser?currentUser=${currentUser}`;
	$.post(url, function(data) {
		console.log('Username posted to Class');
	})
}

getUsername();
$(handleCreateClassesButton());
$(handleLoginButton());
$(handleSearchClassesButton());