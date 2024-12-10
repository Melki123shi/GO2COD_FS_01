import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import adminOrOwner from "../middleware/adminOrOwner.js";
import userModule from "../models/user.js";
const { User } = userModule;
import { getMe, updateUser, deleteUser } from "../controllers/users.controller.js";

router.get("/me", auth, getMe);

router.put("/:id", auth, updateUser);

router.delete("/:id", [auth, adminOrOwner(User, "User not found")], deleteUser);

export default router;
