function getClassData() {
	let className = $(location).attr('pathname').split("/");
			className = className[2].split("%20");
			className = className.join(' ');
	let url = `/classdata?className=${className}`;
	$.getJSON(url).then(data => {
		console.log(data);
  		displayClassData(data)

  }) 
}

function displayClassData (data) {
	$('.class_page_header').html(`<h1 class= "class_header"> 
		Welcome to <span class= class_title>${data.matchingClasses[0].className}</span></h1>`);
	$('.class_page_description').html(`<h2 class= "class_description">
	${data.matchingClasses[0].description}</h2>`);
	$('.class_videos_section').html(`<h2 class= "videos_header"> 
		Class Videos</h2> <div class= video_list></div>`);
	$('.class_upload_section').html(`<a href= "/class/${data.matchingClasses[0].className}/upload">
	 <button class= "upload_video_button"> Upload new class video</button></a>`)
}

getClassData();