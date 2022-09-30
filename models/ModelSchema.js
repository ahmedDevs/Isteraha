const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  location: String,
  bio: String,
  lookingFor: String,
  modelPlan: String,
  heat: String,
  products: String,
  travel: String,
  twitter: String,
  instagram: String,
  facebook: String,
});

// Password hash middleware.

ModelSchema.pre("save", function save(next) {
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

ModelSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("Model", ModelSchema);