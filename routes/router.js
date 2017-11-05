const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Class} = require('../models/classes');

const router = express.Router();

const jsonParser = bodyParser.json();
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", function (req,res) {
    res.render("index");
})

router.get("/userHome", isLoggedIn, function (req,res) {
    res.render("loggedIn");
})

router.get("/login", function (req, res) {
	res.render("login");
})

router.get("/signup", function (req,res) {
	res.render("signup");
})

router.get("/upload", isLoggedIn, function (req, res) {
	res.render("uploadVideo");
})

router.get("/searchclasses", isLoggedIn, function (req, res) {
	res.render("search");
})
router.get("/makeClass", isLoggedIn, function (req, res) {
	res.render("createClass");
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
/*const classSchema = mongoose.Schema({
	className: {
		type:String,
		required: true,
	},
	genre: {
		type:String,
		required:true,
	},
	difficulty: {type: String},
    choreographer: {type: String}
    studio: {
    	name: {type:String},
    	address: {
				street: {type:String},
				city: {type:String} ,
				state: {type:String},
				zipcode: {type:String}
			}
    	}
    weeklyDayandTime: {
		type:String,
		required: true,
	},
	dateCreated: {type: Date, default: Date.now}
	description: {type:String},
	currentUsers: [String],
	currentVideos: [String]
	})*/
/*router.post("/makeClass",function (req,res) {
	const requiredFields = ["className", "genre", "difficulty", "choreographer", "weeklyDayandTime"];
	console.log(req.body);
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
    	if (!(field in req.body)) {
     	 const message = `Missing \`${field}\` in request body`;
     	 console.error(message);
     	 return res.status(400).send(message);
		}*/
/* Class
    .create({
      className: req.body.className,
      genre: req.body.genre,
      difficulty: req.body.difficulty,
      choreographer: req.body.choreographer,
      address: req.body.address,
      weeklyDayandTime: req.body.weeklyDayandTime,
      description: req.body.description
  })
    .then(
      newclass => res.status(201).json(newclass.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });*/
/*	}

}*/

router.post("/makeClass",(req,res) => {
	/*console.log(req.body);*/
	const requiredFields = ["className", "genre", "weeklyDayandTime", "difficulty", "choreographer"];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		console.log(req.body[field]);
		console.log(req.body);
		if(req.body[field] === undefined || req.body[field] === '') {
			const message = `Missing \`${field}\` in request body`
			console.log(message);
			return res.status(400).send(message);
		}
	}
	Class
    .create({
      className: req.body.className,
      genre: req.body.genre,
      difficulty: req.body.difficulty,
      choreographer: req.body.choreographer,
      address: req.body.address,
      weeklyDayandTime: req.body.weeklyDayandTime,
      description: req.body.description
  })
    .then(
      newclass => res.status(201).json(newclass.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
})

function displayError(field) {
	$('.feedback_section').html(`<p> Please fill out 
		the missing \`${field}\` field;`)
}

/*function displayError() {
	$('.create_class_form').on('click', '.create_class_button', function(e) {
		if ()
	})
	if ($('.class_name_input').val()
}*/

module.exports = router;