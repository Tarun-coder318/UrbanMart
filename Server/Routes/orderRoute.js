import express from "express"
import { authUser } from "../Middelware/authUser.js";
import { getSellerOrders, getUserOrder, placeOrderCOD, placeOrderStripe } from "../Controllers/orderController.js";
import { SellerAuth } from "../Middelware/authSeller.js";



const OrderRouter =express.Router();

OrderRouter.post('/cod', authUser, placeOrderCOD)
OrderRouter.post('/online', authUser, placeOrderStripe)

OrderRouter.get('/getUserOrder', authUser, getUserOrder)
OrderRouter.get('/getSellerOrder', SellerAuth, getSellerOrders)

export default OrderRouter;