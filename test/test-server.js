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
    seedData.push(generateClassData());
  }
  // this will return a promise
  return Class.insertMany(seedData);
}

function generateClassData() {
  return {
    className: faker.company.companyName(),
    genre: generateGenreName(),
    difficulty: generateDifficultyType(),
    choreographer: generateChoreographerName(),
    studio: {
    	name: faker.company.companyName(),
    	address: {
      street: faker.address.streetName(),
      City: generateState(),
      zipcode: faker.address.zipCode()
      	}
    },
    weeklyDayandTime: generateWeeklyDayandTime(),
    dateCreated: '11/19/2017',
    currentUsers: [generateUser(), generateUser(), generateUser()],
    Videos: [generateRandomVideo(), generateRandomVideo()]
  }
}

function generateGenreName() {
	const genres = ['Modern', 'Contemporary', 'Hip-Hop', 'Jazz', 'Tap'];
	return genres[Math.floor(Math.random() * genres.length)]
}

function generateDifficultyType() {
	const difficulty = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
	return difficulty[Math.floor(Math.random() * difficulty.length)]
}

function generateChoreographerName() {
	const names = ['Tonya Hardy', 'Ben Jameson', 'Lucy Fields', 'Eric McDonald'];
	return names[Math.floor(Math.random() * names.length)]
}

function generateState() {
	const states = ['GA', 'TX', 'NY', 'CA', ];
	return states[Math.floor(Math.random() * states.length)]
}

function generateWeeklyDayandTime() {
	const schedule = ['Tuesdays at 9PM', 'Wednesdays at 3PM', 'Sundays at 5PM', 'Saturdays at 10AM'];
	return schedule[Math.floor(Math.random() * schedule.length)]
}

function generateUser() {
	const users = ['theUser', 'mBrody94', 'Tlang55' 'Staib1'];
	return users[Math.floor(Math.random() * user.length)]
}
function generateRandomVideo() {
	return {videoTitle: generateVideoName(),
		classDate: '12/31/2017',
		dancers: generateChoreographerName(),
		video_id: '15658',
		video_url: 'http://res.cloudinary.com/mark-it-cloud/video/upload/v1510889040/koyeqo04hnomlvwuolfo.mp4'}
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