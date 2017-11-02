const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = express.Router();

const jsonParser = bodyParser.json();

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

router.get("/logout", function(req,res) {
    req.logout();
    res.redirect("/")
});


//if logged in the user can have access to the content
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		console.log(req.isAuthenticated());
		return next();
	}
	res.redirect("/login");
	console.log(req.isAuthenticated());
}

module.exports = router;