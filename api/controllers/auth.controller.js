import Joi from "joi";
import bcrypt from "bcryptjs";
import _ from "lodash";

import UserModel from "../models/user.js";
const { User, validateUser } = UserModel;

const signup = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already registered");

  const userNameExist = await User.findOne({ username: req.body.username });
  if (userNameExist) return res.status(400).send("username already registered");

  const user = new User(_.pick(req.body, ["username", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "username", "email"]));
};

//! signin
const signin = async (req, res) => {
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send({
    token,
    user,
  });
};

const validateSignIn = (user) => {
  const userSchema = Joi.object({
    email: Joi.string().required().email().min(5).max(255),
    password: Joi.string().required().min(7).max(255),
  });

  return userSchema.validate(user);
};

//! Google signin
const googleSignin = async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "username", "email", "profilePicture"]));
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const newUser = new User({
      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(10).slice(-4),
      email: email,
      password: generatedPassword,
      profilePicture: googlePhotoUrl,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    const token = newUser.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(newUser, ["_id", "username", "email", "profilePicture"]));
  }
};

export { signup, signin, googleSignin };
