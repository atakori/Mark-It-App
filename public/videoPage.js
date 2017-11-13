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
			$('.class_video').html(`<video id="my_video_1" class="video-js vjs-default-skin" width="640px" height="267px"
      controls preload="none" poster="https://res.cloudinary.com/mark-it-cloud/video/upload/${video_object.video_id}.jpeg"
      data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'> 
      <source src="${video_object.video_url}" type='video/mp4' /></video>`)
			$('.video_info_section').html(`<h2> showing video Title!!! </h2>
				<p class= "video_title">${video_object.videoTitle} </p>`);
		}
	}
}

getClassInfo();