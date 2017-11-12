function loadClassVideos() {
	let className = $(location).attr('pathname').split("/");
			className = className[2].split("%20");
			className = className.join(' ');
	let url = `/classdata?className=${className}`;
	$.getJSON(url).then(data => {
  		console.log(data);
  }) 
}

loadClassVideos();