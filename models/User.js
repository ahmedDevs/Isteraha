const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  // email: { type: String, unique: false },
  email: { type: String, unique: true },
  password: String,
  name: { type: String },
  bio: { type: String },
  image: {
    type: String,
 
    // require: true,
  },
  cloudinaryId: {
    type: String,

    // require: true,
  },
  networks: { type: Array },
  invitations: { type: Array },
  comments: {type: Array },
  following: { type: Array },
  followers: { type: Array },
  messages: { type: Object},
  joined: { type: Date, default: Date.now },

  // numberOfFollowers: {type: Number, default: 0 },
  // numberOfPeopleFollowed: {type: Number, default: 0 },

  numberOfPosts: { type: Number, default: 0},
 

});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
