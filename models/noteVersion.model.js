const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const noteVersionSchema = new mongoose.Schema({
  _note: { type: Schema.Types.ObjectId, ref: `Note`, },
  title: String,
  body: String,
});

mongoose.model(`NoteVersion`, noteVersionSchema);

