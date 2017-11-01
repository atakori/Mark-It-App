const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const {User} = require("../users/models")

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(bodyParser.urlencoded({extended: true}));


router.use(require("express-session") ({
    secret: "This dance website is totally useful!",
    resave: false,
    saveUnintialized: false
}))


router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/",function(req,res) {
	req.body.firstname
	req.body.lastname
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password,
		function(err, user) {
			if(err) {
				console.log("NOT WORKING");
				console.log(err);
				return res.render('signup');
			}
			console.log("MADE IT THIS FAR");
			passport.authenticate("local")(req, res, function() {
				res.redirect("/userHome");
			})
		})
})

module.exports = router;