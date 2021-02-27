const mongoose = require('mongoose');
const Activity = require('../models/activity-model');

const DB_NAME = 'do-something-server';
 
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const activities = [
  {
    title: 'Go for a walk',
    description: 'Get some fresh air while exercising',
    category: 'Active',
    status: 'To do',
  },
  {
    title: 'Make a drawing of your favourite object',
    description: 'Go wild, use colors',
    category: 'Creative',
    status: 'To do',
  },
  {
    title: 'Call a friend or relative',
    description: 'Just have a chat',
    category: 'Social',
    status: 'To do',
  },
  {
    title: 'Put on some music and dance',
    description: 'Act crazy',
    category: 'Active',
    status: 'To do',
  },
]

Activity.create(activities)
  .then(activitiesFromDB => {
    console.log(`Created ${activitiesFromDB.length} activities`);
 
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating activities from the DB: ${err}`));