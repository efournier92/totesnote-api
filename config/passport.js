const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const mongoose = require(`mongoose`);
const User = mongoose.model(`User`);

passport.use(new LocalStrategy({
    usernameField: `email`,
  },
  function passportStrategy(username, password, done) {
    User.findOne({ email: username }, function findUser(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, {
          message: `User Not Found`,
        });
      }

      if (!user.validatePassword(password)) {
        return done(null, false, {
          message: `Wrong Password`,
        });
      }
      // Return the user object if credentials are accepted
      return done(null, user);
    });
  }
));
