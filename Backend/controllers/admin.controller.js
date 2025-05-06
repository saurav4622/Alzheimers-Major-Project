import { admin } from '../models/admin.model.js'; // Import your Admin model

// Create a new admin
export const createAdmin = async (req, res) => {
    try {
        const newAdmin = new admin(req.body);
        const savedAdmin = await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully", data: savedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error creating admin", error: error.message });
    }
};

// Get all admins or a specific admin by ID
export const getAdmins = async (req, res) => {
    try {
        if (req.params.id) {
            const singleAdmin = await admin.findById(req.params.id);
            if (!singleAdmin) {
                return res.status(404).json({ message: "Admin not found" });
            }
            res.status(200).json(singleAdmin);
        } else {
            const allAdmins = await admin.find();
            res.status(200).json(allAdmins);
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching admins", error: error.message });
    }
};

// Update admin details
export const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are enforced
        });
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin updated successfully", data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error updating admin", error: error.message });
    }
};

// Delete admin
export const deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting admin", error: error.message });
    }
};

