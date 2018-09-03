let mongoose = require('mongoose');
let jwt_decode = require('jwt-decode');
var User = mongoose.model('User');
let Note = mongoose.model('Note');

module.exports.saveNote = function (req, res) {
  if (!req.headers.auth) {
    res.status(401).json({
      "message" : "Unauthorized: Private Profile"
    });
  } else {
    let authToken = req.headers.auth;
    let user = jwt_decode(authToken);
    User.findById(user._id, function (err, user) {
      if (err) return handleError(err);
      let reqNote = req.body; 
      let note;
      if (!reqNote._id) {
        note = new Note({
          _owner: user._id,
          created: new Date(),
          isTrashed: false,
        });
      } else {
        note = reqNote; 
      }

      class NoteVersion {
        constructor(content) {
          this.content = content;
          this.time = new Date();
        }
      }

      noteVersion = new NoteVersion(reqNote.content);

      note.versions.unshift(noteVersion);

      if (!reqNote._id) {
        note.save(function saveNote(err) {
          res.status(200);
          res.json({
            "note": note,
            "noteVersion": noteVersion,
          });
        });
      } else {
        Note.findById(reqNote._id, function (err, note) {
          if (err) return handleError(err);

          note.save(function (err, updatedNote) {
            if (err) return handleError(err);
            res.send(updatedNote);
          });
        }); 
      }
    });
  };
};


module.exports.getTest = function getTest(req, res) {
  console.log("response.json sets the appropriate header and performs JSON.stringify");
  res.json({ 
    anObject: { item1: "item1val", item2: "item2val" }, 
    anArray: ["item1", "item2"], 
    another: "item"
  });
};

