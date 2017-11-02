var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const {User} = require("./users/models")
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const mongoStore = require('mongo-store');

var app = express();
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const routesRouter = require('./routes/router');
const authRouter = require('./auth/router');
const loginRouter = require('./auth/loginrouter');

mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');

app.use(require("express-session") ({
    secret: "This dance website is totally useful!",
    resave: false,
    saveUninitialized: false
/*    store: new mongoStore({
     url: DATABASE_URL,
     collection: 'sessions'
  })*/
}))

app.use(passport.initialize());
app.use(passport.session());



/*ROUTES*/
app.use('/', routesRouter);

/*AUTH ROUTES*/
app.use('/signup', authRouter);
app.use('/login', loginRouter);
/**/



let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app
                .listen(PORT, () => {
                    console.log(`Your app is listening on port ${PORT}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};