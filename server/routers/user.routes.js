import express from "express";

import {
  signup,
  login,
  logout,
  updateUser,
  getUsers
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// User auth routes 
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// User management routes
router.put("/update-user", authenticate, updateUser);
router.get("/users", authenticate, getUsers);

export default router;