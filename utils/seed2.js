const connection = require('../config/connection');
const { Course, Student, User, Thought } = require('../models');
const { getRandomName, getRandomAssignments, userData, getThoughtsData, getRandomUserDataName } = require('./data');

// to make seeding easier
const { createUser } = require('../controllers/userController');

const {
  getThoughts,
  createThought,
  getSingleThought,
  deleteThought,
  updateThought
} = require('../controllers/thoughtController');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Thought.deleteMany({});

  const createManyThoughts = async () => {
    try {
  
      let thoughts = await Thought.create(
        [
          {
          thoughtText: "If you want to keep a secret, you must also hide it from yourself.",
          username: "Sean Wallace",
          userid: "638be501af5caffdbf7aedae"
          },
          {
            name: "Elijah Azubuike",
            title: "Backend Developer"
          },
          {
            name: "Emeka Isiolu",
            title: "Web Developer"
          }
        ]
      )
      return thoughts
    }
    catch (error) {
      throw error
    }
  }





  // getThoughts reads from the list of users
  const thoughtData = getThoughtsData()
  // await Thought.collection.insertMany(thoughtData);

  let res;
  thoughtData.forEach( (element) => {
    personsName = getRandomUserDataName()
    createThought({
      thoughtText: element,
      username: personsName
    }, res)
  })
  // Log out the seed data to indicate what should appear in the database
  
  //
  // console.table(thoughts);

  console.info('Seeding 22222222222 complete! 🌱');
  process.exit(0);
});
