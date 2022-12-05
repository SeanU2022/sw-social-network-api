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

  // get user from userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')   // return everything except __v (a mongoose idiosyncracy)
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            user
          })
      )
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

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
      )
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            user,
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
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with that ID was found'})
          : Thought.deleteMany({ username: { $in: user.username } })
      )
      .then(() => res.json({ message: 'User and their thoughts deleted!' }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // FRIENDS: future release: use existing friend to make this user (a friend too)
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
    User.findOneAndUpdate(
      { _id: req.params.userId },
      // note the difference to removeReaction
      { $pull: { friends: req.params.friendId  } },
      { runValidators: true, new: true },    
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },
};
