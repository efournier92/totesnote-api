const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  _owner: { type: Number, ref: `User`, },
  versions: [{ type: Schema.Types.ObjectId, ref: `NoteVersion`, }],
  created: { type: Date, },
  isTrashed: { type: Boolean, },
});

mongoose.model(`Note`, noteSchema);
