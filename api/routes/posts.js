import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import adminOrOwner from "../middleware/adminOrOwner.js";
import owner from "../middleware/owner.js";
import postModule from "../models/post.js";
const { Post } = postModule;

import {
  getAllPosts,
  getMyPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller.js";

router.get("/", getAllPosts);

router.get("/my-posts", [auth], getMyPosts);

router.get("/:id", getPostById);

router.post("/", auth, createPost);

router.put("/:id", [auth, owner(Post, "Post not found")], updatePost);

router.delete("/:id", [auth, adminOrOwner(Post, "Post not found")], deletePost);

export default router;
