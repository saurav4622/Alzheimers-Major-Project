import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Otp } from "../models/otpSchema.model.js"; // Import the OTP model (assumed to be created)
import bcrypt from "bcryptjs"; // Use bcrypt if you store hashed OTPs
// import streamifier from 'streamifier';

export const welcome = async (req, res) => {
    return res.status(400).json({
        message: 'User Page',
        success: false,
    })
}

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // console.log(fullname)
         
        if (!fullname || !email || !phoneNumber || !password || !role ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        // const file = req.file;
        // if (!file) {
        //     return res.status(400).json({
        //         message: "Please provide Profile Photo",
        //         success: false
        //     })
        // }
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role: role
        });
        
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
//update profile backend
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio } = req.body;

        // Handle uploaded file (photo)
        const file = req.file;

        let cloudResponse;
        if (file) {
            // If a file is provided, upload it to Cloudinary
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            });

            // streamifier.createReadStream().pipe();
        }
        

        
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Update profile data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;

        // Update photos only if a file was uploaded
        if (cloudResponse) {
            user.profile.profilePhoto = cloudResponse.secure_url; // save the Cloudinary URL
            user.profile.profilePhotoOriginalName = file.originalname; // Save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        // Search by keyword in search bar
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { fullname: { $regex: keyword, $options: "i" } }, // Case-insensitive search for fullname
                { email: { $regex: keyword, $options: "i" } },
                { phoneNumber: { $regex: keyword, $options: "i" } },
            ]
        };
        const users = await User.find(query, "-password").sort({ createdAt: -1 }); // Exclude passwords from results
        if (!users.length) {
            return res.status(404).json({
                message: "Users not found.",
                success: false
            });
        }
        return res.status(200).json({
            users,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving users.",
            success: false
        });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get user by name
export const getUserByName = async (req, res) => {
    try {
        const nameQuery = req.params.name;
        const users = await User.find({ fullname: { $regex: nameQuery, $options: "i" } }); // Case-insensitive search
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found with the provided name.",
                success: false
            });
        }
        return res.status(200).json({
            users,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};



// Utility function to generate OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
};

// Send OTP using Nodemailer
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required to send OTP.",
                success: false,
            });
        }

        // Generate OTP
        const otp = generateOtp();

        // Store OTP in your database (e.g., associated with the user or email)
        // Assuming you have a model like Otp to store OTPs temporarily
        // await Otp.create({ email, otp, createdAt: Date.now() });

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail address
                pass: process.env.GMAIL_PASS, // Your Gmail app password
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Your OTP for Verification",
            html: `<p>Your OTP is <b>${otp}</b>. It is valid for 10 minutes.</p>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: "OTP sent successfully.",
            otp, // Remove this in production; for debugging/testing purposes only
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to send OTP. Try again later.",
            success: false,
        });
    }
};

export const storeOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required to store OTP.",
                success: false,
            });
        }

        // Check if an OTP already exists for the email
        const existingOtp = await Otp.findOne({ email });

        if (existingOtp) {
            // Update the existing OTP
            existingOtp.otp = otp;
            existingOtp.createdAt = Date.now(); // Update timestamp
            await existingOtp.save();
        } else {
            // Create a new OTP record
            await Otp.create({ email, otp, createdAt: Date.now() });
        }

        return res.status(200).json({
            message: "OTP stored successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to store OTP. Try again later.",
            success: false,
        });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required for verification.",
                success: false,
            });
        }

        // Find OTP record for the given email
        const otpRecord = await Otp.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({
                message: "No OTP found for the provided email.",
                success: false,
            });
        }

        // Check if the OTP matches (use bcrypt.compare if OTPs are hashed)
        const isOtpValid = otpRecord.otp === otp;

        if (!isOtpValid) {
            return res.status(400).json({
                message: "Invalid or expired OTP.",
                success: false,
            });
        }

        // OTP verified successfully
        // Clean up: Delete the OTP record after successful verification
        await Otp.deleteOne({ email });

        return res.status(200).json({
            message: "OTP verified successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};


