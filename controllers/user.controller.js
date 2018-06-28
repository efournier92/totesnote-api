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
  const defaultArray = [
    {
      "type": "link-widget",
      "sizeX": 1,
      "sizeY": 1,
      "url": "https://www.google.com/",
      "icon": "img/ico/A001_Google.png"
    }, {
      "type": "link-widget",
      "sizeX": 1,
      "sizeY": 1,
      "url": "https://www.youtube.com/",
      "icon": "img/ico/A002_YouTube.png"
    }, {
      "type": "link-widget",
      "sizeX": 1,
      "sizeY": 1,
      "url": "https://www.facebook.com/",
      "icon": "img/ico/A003_Facebook.png"
    }
  ];

      let strngObj = JSON.stringify(defaultArray);
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
