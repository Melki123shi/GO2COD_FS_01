import userModule from "../models/user.js";
const { User, validateUser } = userModule;
import bcrypt from "bcryptjs";

const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

const updateUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,

      profilePicture: req.body.profilePicture,
    },
    { new: true }
  );

  const salt = bcrypt.genSaltSync(10);
  updatedUser.password = bcrypt.hashSync(req.body.password, salt);

  if (!updatedUser) return res.status(404).send("User not found");
  res.send({
    status: "success",
    data: updatedUser,
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.send("User deleted sucessfully");
};

export { getMe, updateUser, deleteUser };
