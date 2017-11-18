const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const should = chai.should();

const {app} = require('../server');

chai.use(chaiHttp);

function seedClassData() {
  console.info('seeding restaurant data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateRestaurantData());
  }
  // this will return a promise
  return Restaurant.insertMany(seedData);
}

function generateRestaurantData() {
  return {
    className: faker.company.companyName(),
    borough: generateBoroughName(),
    cuisine: generateCuisineType(),
    address: {
      building: faker.address.streetAddress(),
      street: faker.address.streetName(),
      zipcode: faker.address.zipCode()
    },
    grades: [generateGrade(), generateGrade(), generateGrade()]
  }
}

/*className: {
		type:String,
		required: true,
	},
	genre: {
		type:String,
		required:true,
	},
	difficulty: {type: String},
    choreographer: {type: String},
    studio: {
    	name: {type:String},
    	address: {
				street: {type:String},
				city: {type:String} ,
				state: {type:String},
				zipcode: {type:String}
			}
    	},
    weeklyDayandTime: {
		type:String,
		required: true,
	},
	dateCreated: {type: Date, default: Date.now},
	description: {type:String},
	currentUsers: [String],
	videos: [{
		videoTitle: {type: String},
		classDate: {type:String},
		dancers: {type:String},
		video_id: {type:String},
		video_url: {type:String}
	}]
	})*/

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
	it('should return HTML and 200 status code for the createClass.html page', function() {
		return chai.request(app)
		.get('/makeClass')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		})
	})
	it('should return HTML and 200 status code for the videoPage.html', function() {
		return chai.request(app)
		.get('/class/:name/upload')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.html;
		})
	})
})

describe('Testing GET endpoints', function() {
	it('should return an empty object with the users info when the user is logged out', function() {
		return chai.request(app)
		.get('/api/user_data') 
		.then(function(res) {
			res.should.be.json;
			res.body.should.be.an('object');
			res.body.should.be.deep.equal({});
		})
	}) // add test for returning username object if user is logged in
})

describe( 'Testing POST endpoints', function() {
	it('should post the cloudinary video to the server', function() {
		return chai.request(app)
		.post('/upload')
		.then(function(res) {
			res.should.be.json;
		})
	})
})