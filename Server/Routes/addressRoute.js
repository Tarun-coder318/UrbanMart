import express from "express"
import { authUser } from "../Middelware/authUser.js"
import { addAddress, getAddress } from "../Controllers/addressController.js"



const AddressRouter = express.Router();

AddressRouter.post('/addAddress' , authUser , addAddress);
AddressRouter.get('/getAddress', authUser, getAddress)


export default AddressRouter