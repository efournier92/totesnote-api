const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;


const noteVersionSchema = new mongoose.Schema({
  _owner: Schema.Types.ObjectId,
  _note: { type: Schema.Types.ObjectId, ref: `Note`, },
  title: String,
  content: String,
});

mongoose.model(`NoteVersion`, noteVersionSchema);
