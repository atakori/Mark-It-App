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

module.exports = router;