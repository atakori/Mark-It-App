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
	$('.class_information_section').html(`<div class= "class_info"><h3 class= "info_header"> Class Info</h3><p> Studio: ${data.matchingClasses[0].studioName}
		</p> <p class= "studio_address">${data.matchingClasses[0].studioAddress}</p>
		<p class= "class_time">${data.matchingClasses[0].weeklyDayandTime}</p></div>`)
	let classdata = data.matchingClasses[0];
	let videoData = data.matchingClasses[0].videos;
	renderClassVideos(classdata, videoData);
}

function renderClassVideos(data, videos) {
	if(videos.length >0) {
		for(let i= 0; i<videos.length; i++) {
			$('.video_list').append(`<a href= "/class/${data.className}/${videos[i].video_id}"<li class= "class_video"> 
			${videos[i].videoTitle} | ${videos[i].classDate}</li></a>`)
		}
	} else {
		$('.video_list').html(`<h3 class= 'no_videos_message'>No videos uploaded for this class :(</h3>`)
	}
}
//if there are video object in the array, show them to the user
//if not, display a 'no video message'

getClassData();