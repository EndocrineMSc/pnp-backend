let dotenv = require("dotenv").config();
const User = require("./models/user");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//const bcrypt = require("bcrypt");

const opts = {
  secretOrKey: process.env.JWT_SECRET || dotenv.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

function initializePassport(passport) {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = User.findById(payload.id);
        if (user) return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;
