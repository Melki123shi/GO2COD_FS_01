import Joi from "joi";
import jwt from "jsonwebtoken";
// import config from "config";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  profilePicture: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
  },
  
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, process.env.PRIVATE_KEY);
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const userSchema = Joi.object({
    username: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(50),
    profilePicture: Joi.string(),
  });

  return userSchema.validate(user);
};

export default { User, validateUser };