let mongoose = require('mongoose');
let User = mongoose.model('User');

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

module.exports.getTestInfo = function getTestInfo(req, res) {
  let xObj = {
    "test": "test",
    "test": "test",
    "test": "test"
  };
  let strngObj = JSON.stringify(xObj);
  res.status(200).send(strngObj);
};
// module.exports.updateWidgets = function updateWid(req, res) {
//   if (!req.payload._id) {
//     res.status(401).json({
//       "message" : "Unauthorized: Private Profile"
//     });
//   } else {
//     User.findById(req.payload._id, function (err, user) {
//       if (err) return handleError(err);

//       user.widgetsLg = JSON.stringify(req.body[0]);
//       user.widgetsSm = JSON.stringify(req.body[1]);

//       user.save(function (err, updatedUser) {
//         if (err) return handleError(err);
//         res.send(updatedUser);
//       });
//     });
//   };
// };
