// I swear this file has nothing to do with George Orwells' 1984...
// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

const thoughtCount = async (req, res) =>
  Thought.aggregate()
    .count('thoughtCount')
    .then((numberOfThoughts) => numberOfThoughts)
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          thoughtCount: await thoughtCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create document in thought collection and store FK in User associated document
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
        ? res
          .status(404)
          .json({ message: `Thought created, but could not find user with id ` })
        : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },

  // get thought using thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')   // return everything except __v (a mongoose idiosyncracy)
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findByIdAndRemove({ _id: req.params.thoughtId })
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
      )
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
