function handleVideoUpload (){
$('.upload_form').append($.cloudinary.unsigned_upload_tag("o8uzrarh", 
  { cloud_name: 'mark-it-cloud' }).bind('cloudinaryprogress', function(e, data) { 

  $('.progress_bar').css('width', 
    Math.round((data.loaded * 100.0) / data.total) + '%'); 
}))
}

$(handleVideoUpload());
/*$(document).ready(function() {
  if($.fn.cloudinary_fileupload !== undefined) {
    $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
  }
});

$('.cloudinary-fileupload').bind('cloudinaryprogress', function(e, data) { 
    $('.progress_bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');});
*/