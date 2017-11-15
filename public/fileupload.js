let video_id;
let video_url;

function handleVideoUpload() {
	$('#fileupload').fileupload({
		dataType: 'json',
        add: function (e, data) {
            data.context = $('<button/>').text('Upload')
                .appendTo(document.body)
                .click(function () {
                    data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                    data.submit();
                });
        },
        done: function (e, data) {
        	let result= data.result;
        	console.log(result);
            data.context.text('');
            console.log('video uploaded to cloudinary!');
       		//show user the results and input fields
       		//change upload file to finalizing
       		video_id = result.public_id;
       		video_url = result.secure_url;
       		hideUploader();
       		showVideoInfo();

        },
        progressall: function (e, data) {
        let progress = parseInt(data.loaded / data.total * 100, 10);
        console.log("uploading file to server");
        $('#progress .bar').css(
            'width',
            progress + '%'
        );
        console.log(progress + '%')
    }
    });
}

function hideVideoInfo() {
	$('.video-info').hide()
}

function showVideoInfo() {
	$('.video-info').show()
}

function hideUploader() {
	$('.video_uploader').hide();
}

function showUploader(){
	$('.video_uploader').show();
}

function grabVideoData() {
		let videoTitle = $('.video_title_input').val();
		let classDate = $('.class_date_input').val();
		let dancers =  $('.video_dancers_input').val();
		let className = $(location).attr('pathname').split("/");
			className = className[2].split("%20");
			className = className.join(' ');
		postVideoInfotoServer(className, videoTitle, classDate, dancers, video_id, video_url);
}

function postVideoInfotoServer(className, videoTitle, classDate, dancers, video_id, video_url) {
	let url = `/class/${className}/upload?videoTitle=${videoTitle}&classDate=${classDate}&dancers=${dancers}&video_id=${video_id}&video_url=${video_url}`;
	$.post(url, function(data) {
		console.log(data)
	})
	.done(function() {
		$('.upload_video_page').html(`<h2> Video successfully uploaded! </h2>
			<a href= "/class/${className}"><button class= "class_page_button"> Back to ${className} </button></a>`)
	})
}

function checkforFilledForm() {
  $('.upload_form').on('click', '.post_video_info', function (e) {
    e.preventDefault()
    console.log('button works')
    console.log($('.video_title_input').val().length === 0)
    if ($('.video_title_input').val().length === 0) {
      $('.response_message').html(`Please fill out the video's title`);
    } else if ($('.class_date_input').val().length === 0) {
      $('.response_message').html(`Please enter a class date for the video`);
    } else if ($('.video_dancers_input').val().length === 0) {
      $('.response_message').html(`Please list a few of the featured dancers`);
    } else {
      grabVideoData();
    }
  })

  /*if ($('.class_name_input').val().length === 0) {
      e.preventDefault()
      $('.create_class_error_message').html(`Please fill in the class name`);
    } else if*/
}
/*function getClasses(choreographer) {
	let url = `/searchresults?choreographer=${choreographer}`;
  	$.getJSON(url).then( data => {
  		displaySearchResults(data);*/

/*<p> Now just give a few more details...</p>					<label>Video Title</label>
			<input type="text" class="video_title_input" placeholder= "New Rules -- Dua Lipa">
				<label> Class Date:</label>
				<input type="text" class="class_date_input" placeholder= "MM/DD/YYYY">				<label> Featured Dancers</label>
			<input type="text" class="video_title_input" placeholder= "John Doe, Beyonce...">
			<button class= "post_video_info"> Upload new Video! </button>
*/
/*function handleVideoUpload (){
$('.video-info').append($.cloudinary.unsigned_upload_tag("o8uzrarh", 
  { cloud_name: 'mark-it-cloud' }).bind('cloudinaryprogress', function(e, data) { 
  $('.progress_bar').css('width', 
    Math.round((data.loaded * 100.0) / data.total) + '%'); 

  console.log(data);
  console.log(data.results);

  if((Math.round((data.loaded * 100.0) / data.total) + '%') === "100%") {
  	$('.progress_bar').html('Video Ready to be uploaded');
  	$('.progress_bar').css('background-color', 'green');
  	console.log("video uploaded");
  } else if ((Math.round((data.loaded * 100.0) / data.total) + '%') === undefined) {
	$('.progress_bar').html('Please select a video to upload');
  	$('.progress_bar').css('background-color', 'none');
  } else {
  	$('.progress_bar').html('Video Loading');
  	$('.progress_bar').css('background-color', 'red');
  }
}))
console.log($(".progress_bar").widthPerc());
}

function handleUserSelectedVideo() {
	$('input').on('click', '.cloudinary_fileupload', function(e) {
		$('.upload_video_page').append(`<div class= "progress_bar_border"> 
					<p class="progress_bar"></p>
			</div>`)
	})
}

$.fn.widthPerc = function(){
    var parent = this.parent();
    return ~~((this.width()/parent.width())*100)+"%";
}
*/
/*$(handleUserSelectedVideo());*/
$(checkforFilledForm());
$(handleVideoUpload());
hideVideoInfo();