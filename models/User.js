const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  },
  surveys: [{type: Schema.Types.ObjectId, ref: 'Users'}]
});

const User = mongoose.model('users', UserSchema);

module.exports = User;