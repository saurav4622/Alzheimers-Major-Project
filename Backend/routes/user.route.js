import express from "express";
import { login, logout, register, updateProfile, getAllUsers, getUserById, getUserByName, welcome } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isauthenticated.js";
import { singleUpload } from "../middlewares/multer.js"; // Corrected import path

const router = express.Router();

// Routes for user operations
router.route("/welcome").get(welcome);
router.route("/register").post(register); // Register new user with profile photo
router.route("/login").post(login); // User login
router.route("/logout").get(logout); // User logout
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile); // Update user profile

// Admin-only routes
router.route("/admin/users").get(isAuthenticated, getAllUsers); // Get all users (admin only)
router.route("/user/:id").get( getUserById); // Get user by ID (admin only)
router.route("user/name/:name").get(isAuthenticated, getUserByName); // Get user by name (admin only)

export default router;
