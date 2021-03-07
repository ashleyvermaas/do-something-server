const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  date: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;