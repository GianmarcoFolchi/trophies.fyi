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
const { verify } = require("crypto");
const axios = require("axios");
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
require("dotenv").config();
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
			id = identifier.split("/");
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

/* This get request will have the following request format
{
    psn: boolean,
    steam: boolean,
    jwtToken: string
}
*/
app.post("/api/getUserAchievements", async (req, res, next) => {
	const obj = req.body;
    console.log(obj)
	try {
		// const correctFormat = verifyObject(obj, {
		// 	Steam: "boolean",
        //     PSN: "boolean",
		// 	// JwtToken: "string",
		// });

		// if (correctFormat !== null) {
		// 	console.log("here");
		// 	throw correctFormat;
		// }

		// Verify and decode token
		// if (token.isExpired(obj.JwtToken)) {
		// 	throw "Token is expired";
		// }
		// let ud = jwt.decode(obj.JwtToken, { complete: true }).payload;

		// check the db to see what data we hav
		// const db =
		//get the userID

		// let userAchievements = {};
		// if (obj.PSN === true) {
		// 	//get psn npsso from database
		// 	//use the psn-api to get the data
		// 	//add the data to userAchievements
		// }
		if (obj.Steam === true) {
			console.log("inside of steam ");
			//get steamid from database
			const steamid = "76561198194969479";
			//use the OswaldoAPIKey to get the data
			const response = await axios.get(
				"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
					process.env.STEAM_API_KEY +
					"&steamid=" +
					steamid
			);
			console.log(response);
			res.status(200).json(response);

			//add the data to userAchievements
		}
	} catch (e) {
		console.log("here");
		const errorResponse = { Error: e.toString() };
		res.status(200).json(errorResponse);
	}
});

function verifyObject(obj, desc) {
	for (let field in desc) {
		// Determine the expected (desc) type and the actual (obj) type
		let desc_ty;
		if (typeof desc[field] === "object") {
			if (Array.isArray(desc[field])) {
				desc_ty = "array";
			} else {
				desc_ty = "object";
			}
		} else {
			desc_ty = desc[field];
		}
		const obj_ty = typeof obj[field];

		switch (obj_ty) {
			// Primitives are handled simply
			case "string":
			case "number":
			case "boolean":
				if (desc_ty !== obj_ty) {
					return "field `" + field + "` expected type of `" + desc_ty + "` but received `" + obj_ty + "`";
				}
				break;

			// Objects are special because technically arrays are also objects
			case "object":
				// Cannot be null
				if (desc[field] === null || obj[field] === null) {
					return "field `" + field + "` cannot be `null`";
				}

				// If one of the two fields is an array, they must both be arrays.
				const desc_is_arr = Array.isArray(desc[field]);
				const obj_is_arr = Array.isArray(obj[field]);
				if (desc_is_arr || obj_is_arr) {
					if (!desc_is_arr) {
						return "field `" + field + "` expected type of `object` but received `array`";
					}

					if (!obj_is_arr) {
						return "field `" + field + "` expected type of `array` but received `object`";
					}

					// Both are arrays. Now verify contents.
					if (desc[field].length === 0) {
						return "field `" + field + "` is an array but contains no descriptor";
					}

					// If the elements of the array are meant to be objects, recurse
					const inner = desc[field][0];
					if (typeof inner === "object") {
						// Cannot be null
						if (desc[field][0] === null) {
							return "field `" + field + "` cannot be `null`";
						}

						for (let i = 0; i < obj[field].length; ++i) {
							// Cannot be null
							if (obj[field][i] === null) {
								return "field `" + field + "` cannot be `null`";
							}

							const res = verifyObject(obj[field][i], inner);
							if (res !== null) {
								return res;
							}
						}
					}
					// Otherwise they are primitives
					else {
						for (let i = 0; i < obj[field].length; ++i) {
							if (typeof obj[field][i] !== inner) {
								return (
									"field `" +
									field +
									"` is an array, but not all contents are of type `" +
									inner +
									"`."
								);
							}
						}
					}
				}
				// Both the expected and actual types are not array, so recurse
				else {
					const res = verifyObject(obj[field], desc[field]);
					if (res !== null) {
						return res;
					}
				}
				break;

			case "undefined":
				return "missing field `" + field + "`";

			default:
				return "unexpected type `" + desc_ty + "`";
		}
	}

	return null;
}

module.exports = app;
