require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');
const MongoStore = require('connect-mongo')(session);

require('./configs/passport');

mongoose
  .connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Cors
app.use(cors({
  credentials: true,
  origin: [process.env.CORS_ALLOWED]
}))

// Express view engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Session settings
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none',
    httpOnly: false,
    maxAge: 60000 // 10 * 60 * 1000 ms === 10 min
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
  })
}));

app.set('trust proxy', 1);
app.use(passport.initialize());
app.use(passport.session());

// Default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Routes middleware
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/auth-routes'));
app.use('/api', require('./routes/activity-routes'));
app.use('/api', require('./routes/file-upload-routes'));
app.use('/api', require('./routes/profile-routes'));
app.use('/api', require('./routes/experience-routes'));


module.exports = app;
