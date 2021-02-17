const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, "Password is required."],
  },
  imageUrl: {
    type: String,
    default: 'https://www.vets4pets.com/siteassets/species/cat/close-up-of-cat-looking-up.jpg?w=585&scale=down'
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  event: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;