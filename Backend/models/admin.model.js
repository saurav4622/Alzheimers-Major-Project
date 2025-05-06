import { mongoose } from "mongoose";
const admin = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    phone_number: {
        required: true,
        type: String,
    },
});

const adminModel = mongoose.model('admin', admin);
export { adminModel as admin };
