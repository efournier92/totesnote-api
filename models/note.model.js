const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

class NoteVersion {
  content: String; 
  time: Date;
}

const noteSchema = new mongoose.Schema({
  _owner: { type: Schema.Types.ObjectId, ref: `User`, },
  versions: [{ type: NoteVersion }],
  created: { type: Date, },
  isTrashed: { type: Boolean, },
});

mongoose.model(`Note`, noteSchema);

