import { food_Counter } from "../models/food_Counter.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerfoodcounter = async (req, res) => {
    console.log(5, req.body)
    try {
        const { foodcounterName, description, opening_hours } = req.body;
        if (!foodcounterName) {
            return res.status(400).json({
                message: "Food Counter name is required.",
                success: false
            });
        }
        let Food_Counter = await food_Counter.findOne({ name: foodcounterName });
        if (Food_Counter) {
            return res.status(400).json({
                message: "You can't register same Food_Counter.",
                success: false
            })
        };
        Food_Counter = await food_Counter.create({
            name: foodcounterName,
            description: description,
            opening_hours: opening_hours,
            userId: req.id
        });

        return res.status(201).json({
            message: "Food Counter registered successfully.",
            food_Counter,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
    
}
export const getFoodcounter = async (req, res) => {
    try {
        const userId = req.body.id; // logged in user id
        const food_counters = await food_Counter.find({ userId });
        if (!food_counters) {
            return res.status(404).json({
                message: "Food counters not found.",
                success: false
            })
        }
        return res.status(200).json({
            food_counters,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getFoodCounterById = async (req, res) => {
    try {
        const foodCounterId = req.params.id;
        const foodCounter = await food_Counter.findById(foodCounterId);
        if (!foodCounter) {
            return res.status(404).json({
                message: "Food Counter not found.",
                success: false
            })
        }
        return res.status(200).json({
            foodCounter,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateFoodCounter = async (req, res) => {
    try {
        const { name, description, opening_hours, logo,status } = req.body;
        if (!name || !description || !opening_hours || !logo ||status) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        var updateData = {}
        if (!file) {
            updateData = { name, description, opening_hours, status };

             const foodCounter = await food_Counter.findByIdAndUpdate(req.params.id, updateData, { new: true });
 
             if (!foodCounter) {
                 return res.status(404).json({
                     message: "Food Counter not found.",
                     success: false
                 })
             }
             return res.status(200).json({
                 message:"Food Counter information updated.",
                 success:true
             })
        }
        else{
          
             //cloudinary 
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            const logo = cloudResponse.secure_url;
            updateData = { name, description, opening_hours, logo, status };
            const foodCounter = await food_Counter.findByIdAndUpdate(req.params.id, updateData, { new: true });

            if (!foodCounter) {
                return res.status(404).json({
                    message: "Food Counter not found.",
                    success: false
                })
            }
            return res.status(200).json({
                message:"Food Counter information updated.",
                success:true
            })
        }
       
       

    } catch (error) {
        console.log(error);
    }
}

// Update admin status
export const updateFoodCounterStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const foodCounterId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the Food_Counter by Food_Counter id
        const Food_Counter = await food_Counter.findOne({_id:foodCounterId});
        if(!Food_Counter){
            return res.status(404).json({
                message:"Food_Counter not found.",
                success:false
            })
        };

        // update the status
        Food_Counter.status = status.toLowerCase();
        await Food_Counter.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}

// Delete food counter
export const deleteFoodCounter = async (req, res) => {
    try {
        const { id: foodCounterId } = req.params;
        const deletedFoodCounter = await food_Counter.findByIdAndDelete(foodCounterId);
        if (!deletedFoodCounter) {
            return res.status(404).json({
                message: "Food Counter not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Food Counter deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting food counter.",
            success: false
        });
    }
};
