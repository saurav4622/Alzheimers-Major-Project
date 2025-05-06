import { food } from "../models/food.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

// admin post 
export const postfood = async (req, res) => {
    try {
        const { description, name, price, category, food_counter_id } = req.body;
        const userId = req.id;

        // Check for missing required fields
        if (!description || !name || !price || !category || !food_counter_id) {
            return res.status(400).json({
                message: "Something is missing. Please provide all required fields.",
                success: false,
            });
        }

        // Ensure a photo is provided
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Please provide a Food Photo. Photo is required.",
                success: false,
            });
        }

        // Convert the file to a data URI and upload it to Cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Save the new food item with the photo URL
        const new_food = await food.create({
            description,
            name,
            price : Number(price),
            category,
            photo: cloudResponse.secure_url, // Save the Cloudinary photo URL
            Food_counter_id: food_counter_id,
            created_by: userId
        });

        return res.status(201).json({
            message: "New food item added successfully.",
            new_food,
            success: true,
        });
    } catch (error) {
        console.error("Error in postfood:", error);
        return res.status(500).json({
            message: "An error occurred while adding the food item.",
            success: false,
            error: error.message,
        });
    }
};


// user 
export const getAllfoods = async (req, res) => {
    try {
        //search by keyword in searchbar
        const keyword = req.query.keyword || "";
        const query = {
            //multiple things so use or
            $or: [
                { name: { $regex: keyword, $options: "i" } },//case sensitive (upper case or lower case)for i 
                { description: { $regex: keyword, $options: "i" } },
                ...(isNaN(Number(keyword)) ? [] : [{ price: Number(keyword) }])
            ]
        };
        const foods = await food.find(query).populate({
            path: "food_counter_id"
        }).sort({ createdAt: -1 });
        if (!foods) {
            return res.status(404).json({
                message: "Foods not found.",
                success: false
            })
        };
        return res.status(200).json({
            foods,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getfoodById = async (req, res) => {
    try {
        const { id: foodId } = req.params;
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({
                message: "Invalid food ID format.",
                success: false
            });
        }

        // Fetch food by ID
        const foodItem = await food.findById(foodId).populate({
            path: "applications"
        });

        if (!foodItem) {
            return res.status(404).json({
                message: "Food not found.",
                success: false
            });
        }

        return res.status(200).json({ food: foodItem, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred.", success: false });
    }
};

// admin how many food is added
export const getAdminfoods = async (req, res) => {
    try {
        const adminId = req.id;
        const foods = await food.find({ created_by: adminId }).populate({
            path:"food_counter_id",
            createdAt:-1 //ascending order 
        });
        if (!foods) {
            return res.status(404).json({
                message: "Foods not found.",
                success: false
            })
        };
        return res.status(200).json({
            foods,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//  admin can update the status 
export const updateAdminStatus = async (req, res) => {
    try {
        const { status } = req.body; // Expect "accepted", "rejected", or other statuses
        const updatedAdmin = await admin.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin status updated successfully", data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};

// Admin - Delete a food item
export const deleteFood = async (req, res) => {
    try {
        const { id: foodId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({ message: "Invalid food ID format.", success: false });
        }
        const deletedFood = await food.findByIdAndDelete(foodId);
        if (!deletedFood) {
            return res.status(404).json({ message: "Food not found.", success: false });
        }
        res.status(200).json({ message: "Food deleted successfully.", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error deleting food.", error: error.message });
    }
};

export const getFoodByCounterId = async (req, res) => {
    try {
        const { food_counter_id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(food_counter_id)) {
            return res.status(400).json({
                message: "Invalid food counter ID format.",
                success: false
            });
        }

        // Fetch foods by food counter ID
        const foods = await food.find({ food_counter_id }).populate({
            path: "food_counter_id"
        });

        if (!foods || foods.length === 0) {
            return res.status(404).json({
                message: "Foods not found.",
                success: false
            });
        }

        return res.status(200).json({
            foods,
            success: true
        });
    } catch (error) {
        console.error("Error in getFoodsByFoodCounterId:", error);
        res.status(500).json({
            message: "An error occurred while fetching foods by food counter ID.",
            success: false,
            error: error.message,
        });
    }
};

// Admin get foods by food name
export const getFoodByName = async (req, res) => {
    try {
        const { name } = req.params;

        // Search by food name (case-insensitive)
        const foods = await food.find({ name: new RegExp(name, "i") }).populate({
            path: "food_counter_id"
        });

        if (!foods || foods.length === 0) {
            return res.status(404).json({
                message: "Foods not found.",
                success: false
            });
        }

        return res.status(200).json({
            foods,
            success: true
        });
    } catch (error) {
        console.error("Error in getFoodsByFoodName:", error);
        res.status(500).json({
            message: "An error occurred while fetching foods by food name.",
            success: false,
            error: error.message,
        });
    }
};

