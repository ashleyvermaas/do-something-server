const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Creative', 'Active', 'Social', 'Relaxing', 'Educational']
  },
  status: {
    type: String,
    enum: ['To do', 'Doing', 'Completed'],
    default: 'To do'
  },
  experiences: [{
    type: Schema.Types.ObjectId,
    ref: 'Experience'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;