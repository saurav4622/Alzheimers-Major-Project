import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import foodCounterRoute from "./routes/food_counter.route.js";
import foodRoute from "./routes/food.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/admin.route.js";
import paymentGetway from "./routes/payment.route.js";

dotenv.config({});

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json()); //body-parser
// app.use(express.urlencoded({extended:true})); //body-parser
app.use(cookieParser());

const PORT = process.env.PORT;

//Get all Method
app.get('/', (req, res) => {
    res.send('Welcome in Food Project')
})

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/foodCounter", foodCounterRoute);
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/adminRoute", adminRoute);
app.use("api/v1/paymentGetway",paymentGetway);



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})