const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  sectionName: String,
  homeworks: {
    homework: [{
      type: Schema.Types.ObjectId,
      ref: 'Homework'
    }],
    count: Number
  }
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
