const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');
// const Thought = require('./Thought');
// const { Thought } = require('../models');

// const friendsSchema = require('./Friends');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,    
      required: true,
      unique: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      // unique: true, replace by index>beautifyUnique
      unique: true,
      trim: true,
      // npmjs.com/package/mongoose-type-email => https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
      // match: [/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Please use valid email address'],
      // above shortened for readability
      match: [/^[\w.!#$%&'*+\/=?^_`{|}~-]+@\w(?:[\w-]{0,61}\w)?(?:\.\w(?:[\w-]{0,61}\w)?)*$/, 'Please use valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    // friends: [userSchema],
  },
    // thoughts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'thought',
    //   },
    // ],
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
