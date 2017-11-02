const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
/*const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");*/
const {User} = require("../users/models")

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(bodyParser.urlencoded({extended: true}));


/*router.use(require("express-session") ({
    secret: "This dance website is totally useful!",
    resave: false,
    saveUninitialized: false
}))*/

/*passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/

//this is for the login route!
router.post("/", passport.authenticate("local", {
    successRedirect: "/userHome",
    failureRedirect: "/login"
}),function(req, res) {
})

module.exports = router;