const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema({
  _owner: { type: Schema.Types.ObjectId, ref: `User`, },
  versions: [{ type: Object }],
  created: { type: Date, },
  isTrashed: { type: Boolean, },
});

mongoose.model(`Note`, noteSchema);

