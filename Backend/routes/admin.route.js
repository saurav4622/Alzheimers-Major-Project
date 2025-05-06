import express from "express";
import { createAdmin, getAdmins, updateAdmin, deleteAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/createAdmin").post(createAdmin); // Create a new admin
router.route("/get/:id?").get(getAdmins); // Get all admins or a specific admin by ID (optional parameter)
router.route("/update/:id").put(updateAdmin); // Update admin details
router.route("/delete/:id").delete(deleteAdmin); // Delete admin (use DELETE method)

export default router;
