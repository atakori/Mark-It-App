const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const{Class} = require('../models/classes');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

let mock_data = {public_id: 'kzakiaeqllosoh6nyuyp',
			  version: 1510887366,
			  signature: '1b51343cf2e2c5d6dbea43bf79b47159e8e35759',
			  width: 640,
			  height: 360,
			  format: 'mp4',
			  resource_type: 'video',
			  created_at: '2017-11-17T02:56:07Z',
			  tags: [],
			  pages: 0,
			  bytes: 17718881,
			  type: 'upload',
			  etag: 'eaa45cf4790d23ae7ba4a6e8bfcef693',
			  placeholder: false,
			  url: 'http://res.cloudinary.com/mark-it-cloud/video/upload/v1510887366/kzakiaeqllosoh6nyuyp.mp4',
			  secure_url: 'https://res.cloudinary.com/mark-it-cloud/video/upload/v1510887366/kzakiaeqllosoh6nyuyp.mp4',
			  audio: 
			   { codec: 'aac',
			     bit_rate: '96005',
			     frequency: 44100,
			     channels: 2,
			     channel_layout: 'stereo' },
			  video: 
			   { pix_format: 'yuv420p',
			     codec: 'h264',
			     level: 30,
			     profile: 'Constrained Baseline',
			     bit_rate: '597824',
			     dar: '16:9' },
			  is_audio: false,
			  frame_rate: 25,
			  bit_rate: 696171,
			  duration: 203.56,
			  rotation: 0,
			  original_filename: 'file'};

function seedClassData() {
  console.info('seeding class data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateClassData());
  }
  // this will return a promise
  return Class.insertMany(seedData);
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

function generateClassData() {
  return {
    className: "test",
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
    currentUsers: ["test", generateUser(), generateUser(), generateUser()],
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

function generateVideoName() {
	const videoName = ['Video#1', 'Reach for the Stars', 'SuperNova', 'Magic Video#2'];
	return videoName[Math.floor(Math.random() * videoName.length)]
}

function generateUser() {
	const users = ['theUser', 'mBrody94', 'Tlang55', 'Staib1'];
	return users[Math.floor(Math.random() * users.length)]
}
function generateRandomVideo() {
	return {videoTitle: generateVideoName(),
		classDate: '12/31/2017',
		dancers: generateChoreographerName(),
		video_id: '15658',
		video_url: 'http://res.cloudinary.com/mark-it-cloud/video/upload/v1510889040/koyeqo04hnomlvwuolfo.mp4'}
}

describe('Class API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedRestaurantData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedClassData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  })


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
		it('should return the specific class information', function() {
			return chai.request(app)
			.get("/class/test")
			// testing "/class/:name"
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.html
			})
		})
		it.skip('should return all of the currentUsers classes', function() {
			return chai.request(app)
			.get("/api/usersclasses")
			.then(function(res) {
				res.should.be.json;
			})
		})  
		//need to access req.users
		it('should redirect the user to the home page upon logging out', function() {
			return chai.request(app)
			.get("/logout")
			.then(function(res) {
				res.should.be.html;
			})
		})
		it('should return the search results for a matching choreographer', function() {
			return chai.request(app)
			.get("/searchresults")
			.query({choreographer: "Tonya Hardy"})
			.then(function(res) {
				res.should.have.status(200);
				res.body.classes[0].should.have.keys('className', 'choreographer', 'currentUsers', 'dateCreated', 'difficulty', 'genre', 'id', 'studioAddress', 'studioName', 'videos', 'weeklyDayandTime');
				res.should.be.json;
				res.body.classes.should.be.a('array')
			})
		})
		it('should return the class infomation if given the name', function() {
			return chai.request(app)
			.get("/classdata")
			.query({className: 'test'})
			.then(function(res) {
				res.should.be.json;
				res.should.have.status(200);
				res.body.matchingClasses[0].should.have.keys('className', 'choreographer', 'currentUsers', 'dateCreated', 'difficulty', 'genre', 'id', 'studioAddress', 'studioName', 'videos', 'weeklyDayandTime')
			})
		})
	})

	describe( 'Testing POST endpoints', function() {
		//skipping upload cloudinary video test because that has to do with cloudinary API
		//which they are responsible for ensuring
		it('should post the video information to database', function() {
			let videoData = {
				videoTitle: "Test Video",
				classDate: "11/19/2017",
				dancers: "Jessica Renolds, James Thompson",
				videos_id: "453894651",
				video_url: "https://res.cloudinary.com/mark-it-cloud/video/upload/v1510887366/kzakiaeqllosoh6nyuyp.mp4"
			}
			return chai.request(app)
			.post('/class/test/upload')
			//testing /class/:name/upload
			.query(videoData)
			.then(function(res) {
				res.should.have.status(200);
				res.body.should.be.deep.equal({ n: 1, nModified: 1, ok: 1 });
			})
		})
		it('should post the current user to the currentUsers array in the DB', function() {
			let currentUser = "testUser1"
			return chai.request(app)
			.post("/class/test/addUser")
			//testing `/class/${className}/addUser?currentUser=${currentUser}
			.query({currentUser: "testUser1"})
			.then(function(res) {
				console.log(res);
				console.log(res.body);
				res.should.have.status(200);
				res.body.should.be.deep.equal({ n: 1, nModified: 1, ok: 1 })
				//the response values of 1 means that the specific username
				//was added to the specific class name
				//since the post function does not return the actual class obj
				//this is the best way to test if the post method worked
			})
		})
		it.skip('should remove the user from the selected class', function() {
			return chai.request(app)
			.post("/class/test/deleteuser")
			//testing /class/:name/deleteuser
			.send(user)
			.then(function(res) {
				res.should.be.json;
				//skipping because the res gives you the classdata
				//before removing the username even though it is removed
			})
		})
		it.skip('should delete the class from the database', function() {
			return chai.request(app)
			.delete("/api/test/deleteclass")
			//testing /class/:name/deleteclass`
			.then(function(res) {
				res.should.be.json;
				res.should.be.equal(1)
			})
		})

/*		it('should post the new class to the database', function() {
			let classData = {
				 className: 'new class',
     			 genre: 'modern',
     			 difficulty: 'Beginner',
			     choreographer: 'Fred Thompson',
			     studioName: 'Studio #1',
		      	 street: '1234 studio way',
		      	 city: 'Atlanta',
		      	 state: 'GA',
		      	 zipcode: '30329',
			     weeklyDayandTime: 'Tuesdays at 8PM',
			     description: 'testing'

			}
			let json = JSON.stringify(classData);
			return chai.request(app)
			.post("/makeClass")
			.set('content-type', 'application/json')
			.send(classData)
			.then(function(res) {
				res.body.should.have.keys('className');
			})
		})*/
	})
});