var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const {User} = require("./users/models")
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const expressValidator = require('express-validator');


const passportConfig = require('./config/passport');

var app = express();
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

/*const routesRouter = require('./routes/router');
const authRouter = require('./auth/router');
const loginRouter = require('./auth/loginrouter');*/

mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');


/*ROUTES*/
/*app.use('/', routesRouter);*/


/*AUTH ROUTES*/
/*app.use('/signup', authRouter);
app.use('/login', loginRouter);*/

/*app.use(passport.initialize());
app.use(passport.session());*/
/**/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "this is a string!",
  store: new MongoStore({
    url: 'mongodb://localhost/mark-it-app',
    autoReconnect: true,
    clear_interval: 3600
  })
}));
/*app.use(session({
    store: new MongoStore({ url: 'mongodb://localhost/mark-it-app' })
}));*/
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path === '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

const homeController = require('./controllers/home');
const userController = require('./controllers/user');

app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);

/*passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require("express-session") ({
    secret: "This dance website is totally useful!",
    resave: false,
    saveUninitialized: false
}))*/


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