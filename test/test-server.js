const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const {app} = require('../server');

chai.use(chaiHttp);

describe('Testing ROUTES endpoints', function() {
	it('should return HTML and 200 status code for the index.html page', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		});
	});

	it('should return HTML and 200 status code for the login.html page', function() {
		return chai.request(app)
		.get('/login')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		})
	})
	it('should return HTML and 200 status code for the loggedIn.html page', function() {
		return chai.request(app)
		.get('/userHome')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		})
	})
	it('should return HTML and 200 status code for the search.html page', function() {
		return chai.request(app)
		.get('/searchclasses')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		})
	})
	it('should return HTML and 200 status code for the uploadVideo.html page', function() {
		return chai.request(app)
		.get('/class/:name/upload')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		})
	})
	it('should return HTML and 200 status code for the signup.html page', function() {
		return chai.request(app)
		.get('/signup')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		})
	})
})

