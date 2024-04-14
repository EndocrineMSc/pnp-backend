const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");

const passport = require("passport");
const initializePassport = require("./passportInit");
const session = require("express-session");

const PORT = process.env.PORT || 8080;

const devOriginPattern = /^http:\/\/localhost:5173/;
const prodOriginPattern = /^https:\/\/rpg-adventure-journal.vercel.app/;
const corsOptions = {
  origin: [devOriginPattern, prodOriginPattern],
  optionSuccessStatus: 200,
  credentials: true,
};

var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use("/", indexRouter);

initializePassport(passport);
app.use(passport.initialize());

app.listen(PORT);

module.exports = app;
