var express     = require('express');
var bodyParser  = require('body-parser');
var passport	= require('passport');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var port        = process.env.PORT || 5000; 
var cors        = require('cors');

/////////
const nodemailer = require("nodemailer");
////////////


var app = express();
app.use(cors());
const User = require('./models/user');
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

var routes = require('./routes');
const user = require('./models/user');
app.use('/api', routes);

// Demo Route (GET http://localhost:5000)
app.get('/', function(req, res) {
    return res.send('Hello Word! The API is at http://localhost:' + port + '/api');
  });
  
app.get ('/addUser', (req,res) => {
    const user = new User({
        email: 'i.elabdar@gos.ma',
        password:'admin2022'
    });

    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

 
mongoose.connect(config.db, { useNewUrlParser: true });

const connection = mongoose.connection;
 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
 
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});
 
// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);
