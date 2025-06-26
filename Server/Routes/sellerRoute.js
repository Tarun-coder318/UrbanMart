import express from "express";
import { SellerIsAuth, SellerLogin, SellerLogout } from "../Controllers/sellerController.js";
import { SellerAuth } from "../Middelware/authSeller.js";



const SellerRoute= express();
SellerRoute.post('/login', SellerLogin)
SellerRoute.post('/is-Sellerauth', SellerAuth, SellerIsAuth )
SellerRoute.post('/logout', SellerAuth, SellerLogout)

export  default SellerRoute