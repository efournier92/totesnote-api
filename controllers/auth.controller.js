const passport = require(`passport`);
const mongoose = require(`mongoose`);
const User = mongoose.model(`User`);
const sendJSONresponse = function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.registerUser = function registerUser(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required",
    });
    return;
  }

  let user = new User();
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function saveUser(err) {
    let token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token,
    });
  });

};

module.exports.loginUser = function loginUser(req, res) {
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required",
    });
    return;
  }

  passport.authenticate(`local`, function passportAuthenticate(err, user, info) {
    let token;

    // If Passport throws an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

