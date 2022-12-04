const { Schema, model } = require('mongoose');

const reactionSchema = require("./Reaction")

const thoughtSchema = new Schema(
  {
    // thoughtId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      default: 'a random thought',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // getter to format data
    username: {
      type: String,
      // unique and trimmed
      required: true,
      max_length: 50,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    // id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought
