import express from "express";
import isAuthenticated from "../middlewares/isauthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import {postfood,getAllfoods,getAdminfoods,getfoodById,updateAdminStatus,deleteFood,getFoodByCounterId,getFoodByName} from "../controllers/food.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, singleUpload, postfood); 
router.route("/get").get(getAllfoods); 
router.route("/getAdminfoods").get( getAdminfoods); 
router.route("/get/:id").get(getfoodById); 
router.route("/updateStatus/:id").put(isAuthenticated, updateAdminStatus);
router.route("/delete/:id").delete(isAuthenticated, deleteFood);
router.route("/counter/:counterId").get(getFoodByCounterId);
router.route("/search").get(getFoodByName);

export default router;
