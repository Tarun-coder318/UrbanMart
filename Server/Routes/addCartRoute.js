import express from "express"
import { addToCart } from "../Controllers/addToCartController.js";
import { authUser } from "../Middelware/authUser.js";


const CartRouter = express.Router();

CartRouter.post('/cartupdate', authUser ,addToCart)


export default CartRouter;