let mongoose = require('mongoose');
let Note = mongoose.model('Note');

module.exports.createNote = function createNote(req, res) {
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

module.exports.getTest = function getTest(req, res) {
  console.log("response.json sets the appropriate header and performs JSON.stringify");
  res.json({ 
    anObject: { item1: "item1val", item2: "item2val" }, 
    anArray: ["item1", "item2"], 
    another: "item"
  });
};

