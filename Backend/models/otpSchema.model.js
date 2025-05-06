import { mongoose, Schema } from "mongoose";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // Expires in 10 minutes
    },
}, { timestamps: true });

const otpModel = mongoose.model('Otp', otpSchema);
export { otpModel as Otp };
