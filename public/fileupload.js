function handleVideoUpload() {
	$('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
    		console.log('uploading to server');
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('body');
            });
        },
        progressall: function (e, data) {
        let progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .bar').css(
            'width',
            progress + '%'
        );
        console.log(progress + '%')
    }
});
}


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