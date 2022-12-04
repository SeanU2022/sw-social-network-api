// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const headCount = async (req, res) =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers)
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create an ancient user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // get user from userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')   // return everything except __v (a mongoose idiosyncracy)
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            user,
            // grade: await grade(req.params.userId),
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a user and clear their mind
  // BONUS: Remove a user's associated thoughts when deleted.
  deleteUser(req, res) {
    User.findByIdAndRemove({ _id: req.params.userId })
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          // Thought.findByIdAndDelete need to insert userID to thought first

          : res.json({
            user,
            // grade: await grade(req.params.userId),
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // use existing user to make a friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true },
    )
    .then((user) => 
      !user
      ? res.status(404).json({ message: 'friendId not in the user collection!'})
      : res.json(user))
    .catch((err) => res.status(500).json(err));
  },

  // pull friend _id from user friends array
  removeFriend(req, res) {
    console.log('hello')

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
    .then(console.log('user:=>'+req.params.userId))
    .then(console.log('friend:=>'+req.params.friendId))
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
     console.log('hello')
    },
};
