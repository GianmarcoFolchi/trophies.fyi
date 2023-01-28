var createError = require("http-errors");
var express = require("express");
var passport = require("passport");
var SteamStrategy = require("passport-steam").Strategy;
// var authRoutes = require("./routes/auth");
// var appRoutes = require("./routes/app");
// var apiRoutes = require("./routes/api");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

passport.use(
	new SteamStrategy(
		{
			returnURL: "http://localhost:3000/auth/steam/return",
			realm: "http://localhost:3000/",
			profile: false,
		},
		function (identifier, profile, done) {
            
			id = identifier.split('/')
			return done(id[id.length - 1]);
		}
	)
);

app.get("/auth/steam", passport.authenticate("steam"), function (req, res) {
	// The request will be redirected to Steam for authentication, so
	// this function will not be called.
});

app.get("/auth/steam/return", passport.authenticate("steam", { failureRedirect: "/" }), function (req, res) {
	// Successful authentication, redirect home.
	res.redirect("/");
});

module.exports = app;
