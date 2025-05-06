// const mongoose = require('mongoose');
import { mongoose } from "mongoose";

const food_Counter = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    opening_hours: {
        required: true,
        type: {
            start: {
                required: true,
                type: String
            },
            end: {
                required: true,
                type: String
            }
        }
    },
    logo:{
        type:String // URL to food_counter logo
    },
    status: {
            type: String,
            enum: ["accepted", "rejected", "pending"], // Allows only these values
            default: "pending", // Default to "pending" if not specified
        },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

});

const foodCounterModel = mongoose.model('food_Counter', food_Counter);
export { foodCounterModel as food_Counter };