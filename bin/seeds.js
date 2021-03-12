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
    description: 'Can you notice anything new in your neighbourhood?',
    category: 'Active',
    status: 'To do',
  },
  {
    title: 'Call a friend or relative',
    description: `No need to always talk to yourself`,
    category: 'Social',
    status: 'To do',
  },
  {
    title: 'Put on some music and dance',
    description: `Don't hold back, go crazy!`,
    category: 'Active',
    status: 'To do',
  },
  {
    title: `Look at your childhood photo's`,
    description: 'Relive some happy memories alone or with someone else',
    category: 'Social',
    status: 'To do',
  },
  {
    title: `Bake a cake`,
    description: `Create a delicious masterpiece`,
    category: 'Creative',
    status: 'To do',
  },
  {
    title: `Read a book`,
    description: `Give Netflix a break`,
    category: 'Relaxing',
    status: 'To do',
  },
  {
    title: `Write a bucketlist`,
    description: `Think of all the things you'd like to do or achieve`,
    category: 'Creative',
    status: 'To do',
  },
  {
    title: `Go on a bike ride`,
    description: `Choose a scenic route and enjoy the views`,
    category: 'Active',
    status: 'To do',
  },
  {
    title: `Do some yoga`,
    description: `Create a mindful moment for yourself`,
    category: 'Active',
    status: 'To do',
  },
  {
    title: `Practice a new skill`,
    description: 'What have you always wanted to learn?',
    category: 'Educational',
    status: 'To do',
  },
  {
    title: `Re-watch your favorite movie`,
    description: `Don't forget the popcorn!`,
    category: 'Relaxing',
    status: 'To do',
  },
  {
    title: `Watch a TED Talk`,
    description: 'A place of inspiration, motivation and education',
    category: 'Educational',
    status: 'To do',
  },
  {
    title: `Eat your favorite food`,
    description: `Because you deserve it`,
    category: 'Relaxing',
    status: 'To do',
  },
  {
    title: `Wear your coolest outfit`,
    description: `Don't forget to strike some poses in the mirror`,
    category: 'Creative',
    status: 'To do',
  },
  {
    title: `Go stargazing`,
    description: `Can you see the man on the moon?`,
    category: 'Relaxing',
    status: 'To do',
  },
  {
    title: `Go on a picnic`,
    description: `Restaurants are sooo overrated`,
    category: 'Relaxing',
    status: 'To do',
  },
  {
    title: `Discover new music`,
    description: `Expand your Spotify playlist with new gems`,
    category: 'Creative',
    status: 'To do',
  },  
  {
    title: `Do some stretches`,
    description: `Your body will thank you later`,
    category: 'Active',
    status: 'To do',
  },
  {
    title: `Draw imaginary creatures`,
    description: `Bring your fantasies to life without judgement`,
    category: 'Creative',
    status: 'To do',
  },
  {
    title: `Make a time capsule`,
    description: `What do you want to tell, show or ask your future self?`,
    category: 'Creative',
    status: 'To do',
  },
  {
    title: `Have a self-made spa day`,
    description: `You deserve only the best care possible`,
    category: 'Relaxing',
    status: 'To do',
  },
  {
    title: `Create your own Frankenstein meal`,
    description: `Can you still make it taste good?`,
    category: 'Creative',
    status: 'To do',
  },
  {
    title: `Make a list of things you're grateful for`,
    description: `A little gratitude goes a long way`,
    category: 'Relaxing',
    status: 'To do',
  },
  {
    title: `Go for a run`,
    description: `Get your heart pumping`,
    category: 'Active',
    status: 'To do',
  },
  {
    title: `Try a new hairstyle`,
    description: `New hair, new you`,
    category: 'Creative',
    status: 'To do',
  },
  {
    title: `Listen to a podcast`,
    description: `You do this while doing another activity`,
    category: 'Educational',
    status: 'To do',
  }, 
  {
    title: `Watch a live-concert online with friends`,
    description: `If you can't go to a festival, make the festival come to you`,
    category: 'Social',
    status: 'To do',
  },
  {
    title: `Learn to say your name in sign language`,
    description: `Too easy? Try the alphabet`,
    category: 'Educational',
    status: 'To do',
  },
  {
    title: `Do an act of kindness`,
    description: `Surely someone deserves some TLC`,
    category: 'Social',
    status: 'To do',
  },
  {
    title: `Learn a magic trick`,
    description: `You're the next Harry Potter`,
    category: 'Educational',
    status: 'To do',
  },
]

Activity.create(activities)
  .then(activitiesFromDB => {
    console.log(`Created ${activitiesFromDB.length} activities`);
 
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating activities from the DB: ${err}`));