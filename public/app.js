let currentClassData;

function getClasses(choreographer) {
	let url = `/searchresults?choreographer=${choreographer}`;
  	console.log(choreographer);
  	$.getJSON(url).then( data => {
  		displaySearchResults(data);
  	//makes a call to the server to grab the classes with a matching
  	//choreographer name that is entered by the user
  });
}

function displaySearchResults(data) {
	$('.search_results').empty();
	$('.search_results').html(`<h2 class= "search_results_header">Available Classes</h2>`);
	if (data.classes.length === 0) {
		$('.search_results').append(`<h2 class= "no_results_message"> Sorry, there are no matching choreographers found. Try another person! </h2>`)
	} else {
	for (let i=0; i<data.classes.length; i++) {
		$('.search_results').append(`<li class = "class_info"> <span class= "class_title">${data.classes[i].className} </span>
			 <span class= "class_details">${data.classes[i].genre} | ${data.classes[i].studioName} | 
			 ${data.classes[i].weeklyDayandTime}</span> </li> 
			 <a href = "/class/${data.classes[i].className}"><button class= "btn btn-primary class_button"> Go to 
			 <span class= "class_name">${data.classes[i].className}</span> page</Button></a> <hr class="line_seperator">`)
		}	
	}
}

//CLASS PAGE SECTION
function getPageInformation(className) {
	let url = `/classdata?className=${className}`;
	$.getJSON(url).then(data => {
  		displayClassPage(currentClassData);
  	//makes a call to the server to grab the classes with a matching
  	//choreographer name that is entered by the user
  });
}