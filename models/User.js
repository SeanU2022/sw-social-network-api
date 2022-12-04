const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');
// const Thought = require('./Thought');
// const { Thought } = require('../models');


// const friendsSchema = require('./Friends');

// email validator
var mongoose = require('mongoose');
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Sean says Email address is invalid'

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
    email: mongoose.SchemaTypes.Email,
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
