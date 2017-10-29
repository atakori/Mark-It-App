const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const {app} = require('../server');

chai.use(chaiHttp);

describe('TEST endpoint', function() {
	it('should return HTML and 200 status code for the index.html page', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		});
	});

	it('should return HTML and 200 status code for the loggedIn.html page', function() {
		return chai.request(app)
		.get('/loggedIn.html')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		})
	})
})

