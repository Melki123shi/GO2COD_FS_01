import express from "express";
const router = express.Router();

import {
  signup,
  signin,
  googleSignin,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/google", googleSignin);

export default router;
