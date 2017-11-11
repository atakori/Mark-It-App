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

function handleVideoInfoButton() {
	$('.upload_form').on('click', '.post_video_info', function(e) {
		e.preventDefault();
		let videoTitle = $('.video_title_input').val();
		let classDate = $('.class_date_input').val();
		let dancers =  $('.video_dancers_input').val();
		let className = $(location).attr('pathname').split("/")
			className = className[2].split("%20");
			className = className.join(' ');
		console.log(className);
	})
}

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
$(handleVideoUpload());
$(handleVideoInfoButton());
hideVideoInfo();