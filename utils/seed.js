const connection = require('../config/connection');
const { Course, Student, User, Thought } = require('../models');
const { getRandomName, getRandomAssignments, userData, getThoughts } = require('./data');

// to make seeding easier
const { createUser } = require('../controllers/userController');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Course.deleteMany({});

  // Drop existing students
  await Student.deleteMany({});

  //SDW Drop existing users
  // await User.deleteMany({});
  await User.find();

  await Thought.deleteMany({});

  // Create empty array to hold the students
  const students = [];


  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomAssignments(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // SDW Loop 9 times -- add users to the users array
  for (let i = 0; i < 9; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    // const assignments = getRandomAssignments(20);

    // const fullUserEmail = getRandomUserEmail();
    // const fullName = fullUserEmail.split('*')[0];
    // const emailAddress = fullUserEmail.split('*')[1];

    // users.push({
    //   fullName,
    //   emailAddress,
    // });

    // SDW
    // let username = getSeedDataUsername(i)
    // let email = getSeedDataEmail(i)
    // users.push({
    //   username,
    //   email
    // });

  }


  // Create empty array to hold the users
  // 816pm
  // const users = [];
  
  // userData.forEach( (element, index) => { 
  //   // username = element
  //   // users.push(username, email)
  //   users.push({user: element, email: userData[index].email})
  // })

  // Add students to the collection and await the results
  await Student.collection.insertMany(students);

  // SDW Add users to the collection and await the results
  // SDW DO THIS MANUALLY UNTIL I GET BULK INSERT TO ADD THOUGHTS/FRIENDS...
  //await User.collection.insertMany(userData);

  // getThoughts reads from the list of users
  const thoughtData = getThoughts()
  await Thought.collection.insertMany(thoughtData);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  // no need for users array as data goes straight to DB
  // console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
