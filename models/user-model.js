const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  imageUrl: {
    type: String,
    default: 'avatar.png'
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  experiences: [{
    type: Schema.Types.ObjectId,
    ref: 'Experience'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;