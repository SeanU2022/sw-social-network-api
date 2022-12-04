const { index } = require("../models/Assignment");


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





const userData = [
  {username: 'John Jones', email: 'cyunclescrooge@gmail.com'},
  {username: 'Peter Smith', email: 'margieparanoid@yahoo.com'},
  {username: 'David Adams', email: 'maggieopen-minded@outlook.com'},
  {username: 'Wendel Frankston', email: 'indyegoistic@verizon.net'},
  {username: 'Paul Spindle', email: 'cheerfulollie@comcast.net'},
  {username: 'Rex Tricks', email: 'bravebart@comcast.net'},
  {username: 'Dan Danone', email: 'revulsioncathy@att.net'},
  {username: 'Edward Parker', email: 'compassionatelil@icloud.com'},
  {username: 'Harry Listo', email: 'showactive@optonline.net'},
]


// thughts: [
//   {
//     fke'rf'fsof'as
//   }

// ]


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// // Gets a random full name
// const getRandomName = () =>
//   `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// // Gets a random appUser
// const getRandomUserEmail = () =>
// `${getRandomArrItem(appUser)}*${getRandomArrItem(appEmails)}`;

// const getSeedDataUsername = (index) => `${userData[index].username}`
// // function getSeedDataUsername(int) {
// //   return `${userData[int].username}`
// // }

const getSeedDataEmail = (index) => `${userData[index].email}`

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

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomAssignments, userData };
