import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// for registeration
export const SellerRegister=async (req,res) => {
    
}
//for login
export const SellerLogin= async (req,res) => {
try {
    const {email,password} =req.body;
    if(!email || !password){
       return res.json({
        success:false, message:"email and password are misssing"
       })
    }if(email===process.env.SELLER_EMAIL && password===process.env.SELLER_PASSWORD){
       const sellertoken= jwt.sign({email}, process.env.JWT_KEY , {expiresIn:"7d"});

       res.cookie('sellertoken', sellertoken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite: process.env.NODE_ENV==="production" ? 'none' : 'strict',
        maxAge:7*24*60*1000,
        path:"/",
       })
       return res.json({success:true, message:"logged In"})
    }else{
return res.json({success:false, message:"invalid credentials"})
    }
} catch (error) {
    console.log(error.message);
return res.json({success:false, message:error})
}}
//  for check seller is authenticated 
export const SellerIsAuth = async (req,res) => {
    try {
        return res.json({success:true})
    } catch (error) {
        console.log(error.message);
         return res.json({success:false , message:error.message})
        
    }
}
// for logout
export const SellerLogout = async (req, res) => {
    try {
        res.cookie("sellertoken", " ",  {
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
          sameSite:  process.env.NODE_ENV==="production" ? "none":"strict",
          expires:new Date(0),
          path:"/",
        })
        return res.json({success:true,message:"seller logged out"})
    } catch (error) {
         console.log(error.message);
         return res.json({success:false , message:error.message})
    }
}