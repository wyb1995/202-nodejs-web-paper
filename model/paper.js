const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paperSchema = new Schema({
  paperName: String,
  sections: {
    count: Number,
    section: [{
      type: Schema.Types.ObjectId,
      ref: 'Section'
    }]
  }
});

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;