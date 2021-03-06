const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Class} = require('../models/classes');
const cloudinary = require('cloudinary');
const upload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

cloudinary.config({
	cloud_name: "mark-it-cloud",
	api_key: '275687273372991',
	api_secret: "8mO_7-rlQd0SPy_GHej1pCeiHFM"

})

const router = express.Router();

const jsonParser = bodyParser.json();
router.use(bodyParser.urlencoded({extended: true}));
router.use(upload());

router.get("/", function (req,res) {
    res.render("index");
})

router.get("/userHome", isLoggedIn, function (req,res) {
    res.render("loggedIn", {username: req.user.username});
})

router.get("/login", function (req, res) {
	res.render("login");
})

router.get("/signup", function (req,res) {
	res.render("signup");
})

router.get("/class/:name/upload", isLoggedIn, function (req, res) {
	res.render("uploadVideo");
})

router.get("/class/:name/:videoID", isLoggedIn, function (req, res) {
	res.render("videoPage");
})

router.get("/searchclasses", isLoggedIn, function (req, res) {
	res.render("search");
})
router.get("/makeClass", isLoggedIn, function (req, res) {
	res.render("createClass");
})

router.get('/api/user_data', function (req, res) {
	if(req.user === undefined) {
		res.json({});
	} else {
		res.json({
			currentUser:req.user
		});
	}
})
//route for getting the username

router.post("/upload", function (req, res) {
	console.log(req.body);
	if(process.env.NODE_ENV != "test")
{
	if(req.files) {
		let file = req.files.filename;
		let filename = file.name;
		file.mv('./uploads/' +filename, function(err) {
			if (err) {
				console.log(err)
				res.send("error occurred")
			} else {
				console.log("video loaded to server!")
			}
		})
		let filepath= path.join(__dirname, `/uploads/${filename}`);
		/*let filepath= './uploads/' +filename*/
			cloudinary.uploader.upload_large(filepath, 
            function(result) {
            	res.json(result);
            	console.log(result)
            	console.log('video uploaded to Cloudinary')
            	if(result.public_id) {
            		fs.unlink('./uploads/' +filename)
            		//delete the file from the server
            		//after cloud upload is complete
            	}
        }, 
            {resource_type: "video"});
	}
} else {
	let mock_data = `{public_id: 'kzakiaeqllosoh6nyuyp',
			  version: 1510887366,
			  signature: '1b51343cf2e2c5d6dbea43bf79b47159e8e35759',
			  width: 640,
			  height: 360,
			  format: 'mp4',
			  resource_type: 'video',
			  created_at: '2017-11-17T02:56:07Z',
			  tags: [],
			  pages: 0,
			  bytes: 17718881,
			  type: 'upload',
			  etag: 'eaa45cf4790d23ae7ba4a6e8bfcef693',
			  placeholder: false,
			  url: 'http://res.cloudinary.com/mark-it-cloud/video/upload/v1510887366/kzakiaeqllosoh6nyuyp.mp4',
			  secure_url: 'https://res.cloudinary.com/mark-it-cloud/video/upload/v1510887366/kzakiaeqllosoh6nyuyp.mp4',
			  audio: 
			   { codec: 'aac',
			     bit_rate: '96005',
			     frequency: 44100,
			     channels: 2,
			     channel_layout: 'stereo' },
			  video: 
			   { pix_format: 'yuv420p',
			     codec: 'h264',
			     level: 30,
			     profile: 'Constrained Baseline',
			     bit_rate: '597824',
			     dar: '16:9' },
			  is_audio: false,
			  frame_rate: 25,
			  bit_rate: 696171,
			  duration: 203.56,
			  rotation: 0,
			  original_filename: 'file'};`;
	res.json(mock_data);
	}
})

router.post("/class/:name/upload", function (req,res) {
	console.log(req.query)
	Class
	.findOne({className: req.params.name})
	.update({$push: {videos: req.query}})
	.then(videoObject => {
		console.log('video object successfully added to class');
		console.log(videoObject);
		res.status(200).send(videoObject);
	})
})
//add this video object to the specific class's 
//list of videos

router.post("/class/:name/addUser", function (req,res) {
	Class
	.findOne({className: req.params.name})
	.update({$push: {currentUsers: req.query.currentUser}})
	.then(user => {
		/*Class.findOne({className: req.params.name}, function(className) */{
			res.status(200).send(user);
		}
	})
})

router.get("/class/:name", function(req,res) {
	Class
	.find({className: req.params.name})
	.then(classJSON => {
		console.log(classJSON);
		res.status(200).render("classPage", {classJSON: classJSON})
	});
})
//returns the class data

router.get("/api/usersclasses", function (req, res) {
	Class
	.find({currentUsers: req.user.username})
	.then(usersClasses => {
		res.json(usersClasses);
	})
})

router.get("/logout", function(req,res) {
	req.logout();
	res.redirect("/");
})

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) {
		console.log(req.isAuthenticated())
		return next();
	}
	res.redirect("/login")
	console.log(req.isAuthenticated())
}

router.post("/makeClass",(req,res) => {
	const requiredFields = ["className", "genre", "weeklyDayandTime", "difficulty", "choreographer"];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if(req.body[field] === undefined || req.body[field] === '') {
			const message = `Missing \`${field}\` in request body`
			console.log(message);
			return res.status(400).send(message);
		}
	}
	Class
    .create({
      adminUser: req.user.username,
      className: req.body.className,
      genre: req.body.genre,
      difficulty: req.body.difficulty,
      choreographer: req.body.choreographer,
      studio: {
      	name: req.body.studioName,
      	address: {
      		street: req.body.street,
      		city: req.body.city,
      		state: req.body.state,
      		zipcode: req.body.zipcode
      	}
      },
      weeklyDayandTime: req.body.weeklyDayandTime,
      description: req.body.description,
      videos: []
  })
    .then(
      newclass => res.status(201).json(newclass.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })
})

// search classes GET request

/*function getUserSearchterm() {
	let searchterm = $('.search_term').val();
	//this is the value I will be using to pass in as a parameter
	//for mongoose once the DB it is created
	// .find{choreographer: ${searchterm}} to filter out the database
	//with classes
}

function displaySearchResults(data) {
	for (index in data.classes) {
		$('.search_results').html(`<li class = "class_name"> ${data.className} |
			 ${data.genre} | ${data.studio.name} | ${data.weeklyDayandTime}
			</li>`)
	}
}*/

router.get("/searchresults", (req, res) => {
	Class
	.find({choreographer: req.query.choreographer})
	.then(classes => {
		console.log(res.json);
		res.json({
			classes: classes.map((foundclass) => foundclass.apiRepr())
		});
	});
})

router.get("/classdata", (req, res) => {
	Class
	.find({className: req.query.className})
	.then(matchingClasses => {
			res.json({
				matchingClasses: matchingClasses.map((matchingClass) => matchingClass.apiRepr())
		});
	});
})

router.post("/class/:name/deleteuser", (req,res) => {
	Class
	.findOneAndUpdate({className: req.params.name}, {$pull: {currentUsers: req.user.username}})
	.then(deletedClass => {
		res.json(deletedClass);
	})
})

router.delete("/api/:name/deleteclass", (req,res) => {
	Class
	.remove({className: req.params.name})
	.then(deletedClass => {
		res.json(deletedClass);
	})
})

module.exports = router;