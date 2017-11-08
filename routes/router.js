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

router.get("/class/:name/upload", isLoggedIn, function (req, res) {
	res.render("uploadVideo");
})

router.get("/searchclasses", isLoggedIn, function (req, res) {
	res.render("search");
})
router.get("/makeClass", isLoggedIn, function (req, res) {
	res.render("createClass");
})

/*router.get("/classPage", function(req,res) {
	res.render("classPage");
})*/

router.get("/class/:name", function(req,res) {
	console.log(req.params);
	Class
	.find({className: req.params.name})
	.then(random => {
		console.log(random);
		res.render("classPage", {random: random})
	});

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

module.exports = router;