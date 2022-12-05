const { index } = require("../models/Assignment");

const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const appDescriptions = [
  'Decision Tracker',
  'Find My Phone',
  'Learn Piano',
  'Starbase Defender',
  'Tower Defense',
  'Monopoly Money Manager',
  'Movie trailers',
  'Hello world',
  'Stupid Social Media App',
  'Notes',
  'Messages',
  'Email',
  'Compass',
  'Firefox',
  'Running app',
  'Cooking app',
  'Poker',
  'Deliveries',
];

// const appUser = [
//   'John Jones',
//   'Peter Smith',
//   'David Adams',
// ];

const appUser = [
  'John Jones',
  'Peter Smith',
  'David Adams',
  'Wendel Frankston',
  'Paul Spindle',
  'Rex Tricks',
  'Dan Danone',
  'Edward Parker',
  'Harry Listo',
];
const appEmails = [
  'cyunclescrooge@gmail.com',
  'margieparanoid@yahoo.com',
  'maggieopen-minded@outlook.com',
  'indyegoistic@verizon.net',
  'cheerfulollie@comcast.net',
  'bravebart@comcast.net',
  'revulsioncathy@att.net',
  'compassionatelil@icloud.com',
  'showactive@optonline.net',
];
const dataSeedUserEmail = [];
appUser.forEach( (element, index) => { dataSeedUserEmail.push({user: element, email: appEmails[index]}) });


const POSTuserData = [
  {"username": "John Jones", "email": "cyunclescrooge@gmail.com"},
  {"username": "Peter Smith", "email": "margieparanoid@yahoo.com"},
  {"username": "David Adams", "email": "maggieopen-minded@outlook.com"},
  {"username": "Wendel Frankston", "email": "indyegoistic@verizon.net"},
  {"username": "Paul Spindle", "email": "cheerfulollie@comcast.net"},
  {"username": "Rex Tricks", "email": "bravebart@comcast.net"},
  {"username": "Dan Danone", "email": "revulsioncathy@att.net"},
  {"username": "Edward Parker", "email": "compassionatelil@icloud.com"},
  {"username": "Harry Listo", "email": "showactive@optonline.net"},
]



const userData = [
  {username: "Sean Wallace", email: "sean.wallace.australia@gmail.com"},
  {username: "John Jones", email: "cyunclescrooge@gmail.com"},
  {username: "Peter Smith", email: "margieparanoid@yahoo.com"},
  {username: "David Adams", email: "maggieopen-minded@outlook.com"},
  {username: "Wendel Frankston", email: "indyegoistic@verizon.net"},
  // {username: "Paul Spindle", email: "cheerfulollie@comcast.net"},
  // {username: "Rex Tricks", email: "bravebart@comcast.net"},
  // {username: "Dan Danone", email: "revulsioncathy@att.net"},
  // {username: "Edward Parker", email: "compassionatelil@icloud.com"},
  // {username: "Harry Listo", email: "showactive@optonline.net"},
]

// was comments
const thoughtData = [
  'Decision Tracker',
  'Find My Phone',
  'Learn Piano',
  'Starbase Defender',
  'Tower Defense',
  'Monopoly Money Manager',
  'Movie trailers',
  'Hello world',
  'Stupid Social Media App',
  'Notes',
  'Messages',
  'Email',
  'Compass',
  'Firefox',
  'Running app',
  'Cooking app',
  'Poker',
  'Deliveries',
];



// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

// // Gets a random full name
// don't need this
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// // Gets a random appUser
// const getRandomUserEmail = () =>
// `${getRandomArrItem(appUser)}*${getRandomArrItem(appEmails)}`;

// const getSeedDataUsername = (index) => `${userData[index].username}`
// // function getSeedDataUsername(int) {
// //   return `${userData[int].username}`
// // }
//?
const getSeedDataEmail = (index) => `${userData[index].email}`


const getRandomUserDataName = () => {
  const userObject = getRandomArrItem(userData)
  return userObject.username
}

// Function to generate random comments given a number (ex. 10 comments === getRandomComments(10))
// const getRandomComments = (int) => {

const getThoughtsData = () => {
  const results = []
  thoughtData.forEach( (element) => { results.push({
    thoughtText: element,
    username: getRandomUserDataName()
  })
})
  return results
}


// appUser.forEach( (element, index) => { dataSeedUserEmail.push({user: element, email: appEmails[index]}) });

// const getRandomThoughts = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       text: getRandomArrItem(comments),
//       username: getRandomName().split(' ')[0],
//     });
//   }
//   return results;
// };



// ** orig code 
// Function to generate random assignments that we can add to student object.
const getRandomAssignments = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      assignmentName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions/data for use in seed.js
module.exports = { 
  getRandomName, 
  getRandomAssignments, 
  userData,
  getThoughtsData,
  getRandomUserDataName
};
