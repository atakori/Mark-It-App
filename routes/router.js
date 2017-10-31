const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get("/", function (req,res) {
    res.render("index");
})

router.get("/userHome", function (req,res) {
    res.render("loggedIn");
})

router.get("/login", function (req, res) {
	res.render("login");
})

router.get("/signup", function (req,res) {
	res.render("signup");
})

router.get("/upload", function (req, res) {
	res.render("uploadVideo");
})

module.exports = router;