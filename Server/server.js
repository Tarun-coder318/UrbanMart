import express from "express";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import cors from "cors"
import ConnectDB from "./DataBase/Db.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoute.js";
import SellerRoute from "./Routes/sellerRoute.js";
import Connectcloudinary from "./Utils/cloudinary.js";
import productRoute from "./Routes/productRoute.js";
import CartRouter from "./Routes/addCartRoute.js";
import AddressRouter from "./Routes/addressRoute.js";
import OrderRouter from "./Routes/orderRoute.js";
import { stripeWebhooks } from "./Controllers/orderController.js";



dotenv.config();

const app = express();
//DataBase
ConnectDB();
await Connectcloudinary();
const PORT = process.env.PORT ||5000



app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

// Allow multiple Origins 
const allowedOrigins=['http://localhost:5173']
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or from allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));



//MiddelWare
app.use(cookieParser());
// app.use(cors({origin : allowedOrigins , credentials:true}));
app.use(express.json());



//Routes
  app.get("/", (req, res)=> {
   res.send("server is working")
  })
  app.use('/api/user',userRouter)
  //seller routes
  app.use('/api/seller' , SellerRoute)
  //product routes
  app.use('/api/product',productRoute)
  //cartUpdate
  app.use('/api/cart' , CartRouter)
  //Address
  app.use('/api/address', AddressRouter)

  //order
  app.use('/api/order' , OrderRouter)
 
  



export default app;