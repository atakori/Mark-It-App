function getUsername() {
	let url = `/api/user_data`;
	$.getJSON(url).then(data => {
		console.log(data);
	})

}
/*let url = `/searchresults?choreographer=${choreographer}`;
  	$.getJSON(url).then( data => {
  		displaySearchResults(data);*/

 getUsername();