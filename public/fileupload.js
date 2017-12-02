let video_id;
let video_url;
let uploadInProgress = false;

function removePresentUploadButton() {
  if (document.getElementById('upload_button')) {
    let button = document.getElementById('upload_button');
    button.remove();
  }
}

function hideVideoInfo() {
	$('.video_info').hide()
}

function showVideoInfo() {
	$('.video_info').show()
}

function hideUploader() {
	$('.video_uploader').hide();
}

function showUploader(){
	$('.video_uploader').show();
}

function hideLoadingGif() {
  $('.gif_container').hide();
}

function showLoadingGif() {
  $('.gif_container').show();
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
		$('.upload_video_page').html(`<h2 class= "success_message"> Video successfully uploaded! </h2>
			<a href= "/class/${className}"><button class= "btn btn-lg btn-primary class_page_button"> Back to ${className} </button></a>`)
	})
}

function checkforFilledForm() {
  $('.upload_form').on('click', '.post_video_info', function (e) {
    e.preventDefault()
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
}

function handleVideoUpload (){
$('.upload_section').append($.cloudinary.unsigned_upload_tag("o8uzrarh", 
  { cloud_name: 'mark-it-cloud' }).bind('cloudinaryprogress', function(e, data) { 
  /*console.log((Math.round((data.loaded * 100.0) / data.total) + '%'));*/
  //logs percentage loaded -- to be replace by load bar
  let file = data.files[0];

/*if(!uploadInProgress) {
   jqXHR = data.submit();  //for aborting the upload process
   uploadInProgress = true;
} */
//this if statement prevents the upload from continually
//starting then stopping the upload

  /*Check if the selected file meets the upload requirements*/
  if(file.size <= "40000000" && file.type === "video/mp4") {
              //Meets file size and type limits
                    $('.upload_section').hide();
                    showLoadingGif();                  
            } else if (file.size > "40000000") {
              e.preventDefault();
              data.abort(); //supposed to stop the upload
              jqXHR = null;
              $('.error_message').html(`File exceeds 40mb limit. Please choose a smaller file.`);
              return console.log('file too big');
            } else {
              e.preventDefault();
              $('.error_message').html(`${file.type} not currently supported. Please convert file to an mp4 to upload`);
              data.abort(); //supposed to stop the upload
              jqXHR = null;
            }
  }).bind('cloudinarydone', function(e, data) {
    let file = data.files[0];
    if (file.size <= "40000000" && file.type === "video/mp4") {
      let result= data.result
      video_id = result.public_id;
      video_url = result.secure_url;
      hideUploader();
      showVideoInfo();
  }})
  )
}

function handleUserSelectedVideo() {
  $('input').on('click', '.cloudinary_fileupload', function(e) {
    $('.video_uploader').html(`<img class = "loading_gif"src="/ajax-loader-2.gif" alt="File loading">`);
  })
}

$(checkforFilledForm());
$(handleUserSelectedVideo())
$(handleVideoUpload());
hideVideoInfo();
hideLoadingGif();

/*Code for Node JS server upload*/

/*function handleVideoUServerpload() {
  $('#fileupload').fileupload({
    dataType: 'json',
        add: function (e, data) {
            let formelement= document.getElementById("file_upload_form")
            if(data.files[0].size <= "40000000" && data.files[0].type === "video/mp4") {
              console.log('Meets file size and type limits');
              $('.error_message').empty();
              removePresentUploadButton();
              data.context = $(`<button id="upload_button" class= "btn btn-lg btn-primary confirm_upload_button">Upload Video</button>`)
                .appendTo(formelement)
                .click(function () {
                    data.context = $(`<img class = "loading_gif"src="/ajax-loader-2.gif" alt="File loading">`).replaceAll($(this));
                    $('.upload_section').hide();
                    data.submit();
                });
            } else if (data.files[0].size > "40000000") {
              console.log('file too big');
              $('.error_message').html(`File exceeds 40mb limit. Please choose a smaller file.`);
              removePresentUploadButton()
            } else {
              console.log('Video not mp4 file');
              $('.error_message').html(`${data.files[0].type} not currently supported. Please convert file to an mp4 to upload`);
              removePresentUploadButton()
            }
            console.log(data);
          //checks to make sure that file siza and type limits are being met
        },
        done: function (e, data) {
          let result= data.result;
          console.log(result);
            data.context = $(`<p/>`).replaceAll($(this))
            $('.loading_gif').hide();
            console.log('video uploaded to cloudinary!');
          //show user the results and input fields
          //change upload file to finalizing
          video_id = result.public_id;
          video_url = result.secure_url;
          hideUploader();
          showVideoInfo();
        }
/*        progressall: function (e, data) {
        let progress = parseInt(data.loaded / data.total * 100, 10);
        console.log("uploading file to server");
        $('#progress .bar').css(
            'width',
            progress + '%'
        );
        console.log(progress + '%')
    }
    });*/ //removing upload progress bar (not needed for server upload) 
