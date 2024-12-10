import _ from "lodash";
import PostModel from "../models/post.js";
const { Post, validatePost } = PostModel;
import UserModel from "../models/user.js";
const { User } = UserModel;

const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username profilePicture");

  const blogs = posts.map((post) => ({
    id: post._id,
    image: post.image,
    userPhoto: post.user?.profilePicture || "",
    userName: post.user?.username || "Unknown",
    date: post.createdAt,
    title: post.title,
    content: post.content,
  }));

  res.send(blogs);
};

const getMyPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("user", "username profilePicture");

  const blogs = posts.map((post) => ({
    id: post._id,
    image: post.image,
    userPhoto: post.user?.profilePicture || "",
    userName: post.user?.username || "Unknown",
    date: post.createdAt,
    title: post.title,
    content: post.content,
  }));

  res.send(blogs);
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("Post not found");

  const user = await User.findById(post.user).select("username profilePicture");
  if (!user) return res.status(404).send("User not found");

  res.send({
    id: post._id,
    image: post.image,
    userPhoto: user.profilePicture,
    userName: user.username,
    date: post.createdAt,
    title: post.title,
    content: post.content,
  });
};

const createPost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = new Post(_.pick(req.body, ["title", "content", "image"]));
  post.user = req.user._id;
  await post.save();
  res.send(post);
};

const updatePost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  );

  if (!post) return res.status(404).send("Post not found");
  res.send({
    status: "success",
    data: post,
  });
};

const deletePost = async (req, res) => {
  console.log(req.params.id);
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).send("Post not found");
  res.send({
    status: "success",
    data: "Post deleted sucessfully",
  });
};

export {
  getAllPosts,
  getMyPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
