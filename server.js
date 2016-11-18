var express = require('express');

var cors = require('cors');

var session = require('express-session');

var bodyParser = require('body-parser');

var passport = require('passport');

var initPassport = require('./passport/init');

var jwt = require('jsonwebtoken');

var mongoose = require("mongoose");

var auth = require('./authentication');

var config = require('./config');

var flash = require('connect-flash');

mongoose.connect("mongodb://localhost");

var app = express();

// the following are for passport.js
app.set('jwtSecret', config.jwtSecret);
app.use(passport.initialize());
// trying to get flash to work, I needed to 
// app.use(cookieParser());
// app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
initPassport(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(function(req, res, next) {
	console.log("request received for ", req.url);
	next();
});

require("./passport/passport.routes")(app, passport);


app.get('/mazeChoice', auth.isAuthenticated, function(req, res){
	// sendFile requires an absolute path, so we
	// have to use the __dirname, which tells us
	// what directory we are running node in.
	res.sendFile(__dirname + "/public/mazeChoice.html");
});


//var addRoutesPages = require("./routes_pages.js");
//addRoutesPages(app);

//var addAPIRoutes = require('./routes_api.js');
//addAPIRoutes(app);


// app.get("/", function(req, res) {
// 	res.sendFile(__dirname + "/index.html");
// });

//app.post("/api", function(req, res) {
//	res.send("success");
//});

var PORT = process.env.PORT || 8000;

app.use(express.static("public"));

app.listen(PORT, function() {
	console.log("Navigate " + PORT);
});

