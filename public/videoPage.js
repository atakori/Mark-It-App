function getClassInfo() {
	let className = $(location).attr('pathname').split("/");
			className = className[2].split("%20");
			className = className.join(' ');
	let url = `/classdata?className=${className}`;
	$.getJSON(url).then(data => {
  		displayVideoInformation(data.matchingClasses[0])
  }) 
}

function displayVideoInformation(data) {
	let id = $(location).attr('pathname').split("/");
			id = id[3];
			console.log(data);
			console.log(id);
	for (let i=0; i<data.videos.length; i++) {
		if(data.videos[i].video_id === id) {
			let video_object = data.videos[i];
			$('.video_info_section').html(`<h2> showing video Title!!! </h2>
				<p class= "video_title">${video_object.videoTitle} </p>`);
		}
	}
}

getClassInfo();