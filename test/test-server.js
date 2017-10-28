const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const {app} = require('../server');

chai.use(chaiHttp);

describe('TEST endpoint', function() {
	it('should return HTML and 200 status code', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			res.should.have.status(200)
			res.should.be.html;
		});
	});
})

