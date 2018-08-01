let mongoose = require('mongoose');
let jwt_decode = require('jwt-decode');
let User = mongoose.model('User');
let Note = mongoose.model('Note');

module.exports.getUserInfo = function getUserInfo(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "Unauthorized: Private Profile",
    });
  } else {
    User.findById(req.payload._id)
      .exec(function findUser(err, user) {
        res.status(200).json(user);
      });
  }
};

module.exports.getUserNotes = function getUserNotes(req, res) {
  let authToken = req.headers.auth;
  let user = jwt_decode(authToken);
  if (!user._id) {
    res.status(401).json({
      "message" : "Unauthorized: Private Profile",
    });
  } else {
    Note.find({_owner: user._id}, function(err, notes) {
      res.status(200).json({
        "notes": notes,
      });
    });
  }
};


