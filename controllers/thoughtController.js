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
          .json({ message: 'Thought created, but could not find user with id' })
        : res.json('Thought created 🎉!')
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
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

  deleteThought(req, res) {
		// req.params.thought gets destroyed after the first .then but kept in temp to be used in the second .then
		const tempThoughtId = req.params.thoughtId
    Thought.findByIdAndRemove({ _id: tempThoughtId })
      .then(async (thought) => 
					!thought
						? res.status(404).json({ message: `thoughtId ${(tempThoughtId)} was not found!` })
						: User.findOneAndUpdate(
							{ thoughts: tempThoughtId },
							{ $pull: { thoughts: tempThoughtId } },
							{ new: true }
						)
      )
      .then((user) =>
					!user
						? res
							.status(404)
							.json({ message: `thoughtId ${(tempThoughtId)} had no user linked to it` })
						: res.json({ message: `thought  ${(tempThoughtId)} successfully removed!` })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

	// Reactions on thoughts
	// FROM 26 Stu_CRUD-Subdoc
	// Add a video response
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'This thought has no id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
		},
		// // Remove video response
		// removeVideoResponse(req, res) {
		// 	Video.findOneAndUpdate(
		// 		{ _id: req.params.videoId },
		// 		{ $pull: { reactions: { responseId: req.params.responseId } } },
		// 		{ runValidators: true, new: true }
		// 	)
		// 		.then((video) =>
		// 			!video
		// 				? res.status(404).json({ message: 'No video with this id!' })
		// 				: res.json(video)
		// 		)
		// 		.catch((err) => res.status(500).json(err));
		// },
};
