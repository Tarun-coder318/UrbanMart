import User from "../Model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



//Register User : /api/user/register



export const register= async ( req ,res)=>{
 try {
    const {name,email,password} = req.body
    if(!name||!email||!password){
        return res.json({sucess:false,message:'All Details are required'})
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.json ({sucess:false , message:"User Already Exit With This Email"})
    }
     const HashPassword = await bcrypt.hash(password, 10)

     const user =  await User.create({name ,email , password:HashPassword})

      const token = jwt.sign({id: user._id},process.env.JWT_KEY, {expiresIn:"7d"} );
      res.cookie('token' , token,{
        httpOnly:true,
        secure:true,
        sameSite:  'none'   ,
        maxAge: 7*24*60*60*1000,
      })
      return res.json({success:true, user:{user }, message:'User Created'})
 } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message});
 }


}

 export const login= async (req,res)=>{
     try {
      const{email,password}=req.body;
       console.log("📥 Login Request:", { email, password });
      if(!email ||!password){
           console.log("⛔ Missing fields");
        return res.json({success:false,message:"All field are Required"})
      }
      const CheckUserPresent = await User.findOne({email});
      if(!CheckUserPresent){
         console.log("⛔ No user with this email");
       return res.json({success:false, message:"There is NO User With This Email"})
      }
      const comparePassword = await bcrypt.compare(password, CheckUserPresent.password)
      if(!comparePassword){ 
          console.log("⛔ Incorrect password");
        return res.json({success:false,message:"Wrong Passwaord"})
      }
      const token = jwt.sign({id:CheckUserPresent._id}, process.env.JWT_KEY,{expiresIn:"7d"});
    console.log("🍪 Setting cookie");
      // Set the cookie with the token
      res.cookie("token" , token, {
           httpOnly:true,
           secure: true , 
           sameSite:"none"  ,
           maxAge:7*24*60*60*1000,
      })
     
      return res.json({success:true, user:{id:CheckUserPresent._id , name: CheckUserPresent.name, email:CheckUserPresent.email}, message:"User Login"})
     } catch (error) {
       console.log(error.message)
    res.json({success:false,message:error.message});
 
     }
 }

 // check AUTH :/api/user/is-auth
 export const isAuth=async (req,res) => {
    try {
      
        console.log("➡️ isAuth called, req.userId =", req.userId);
        const user = await User.findById(req.userId).select("-password")
        return res.json({success:true , user})
    } catch (error) {
          res.json({success:false,message:error.message})
    }
 }

 //logout user : /api/user/logout

 export const logout=async (req,res) => {
    try {
       res.clearCookie('token',{
       httpOnly:true,
       secure:process.env.NODE_ENV ==='production',
       sameSite:process.env.NODE_ENV ==='production' ? "none" : 'strict',
       expires: new Date(0),
       path:'/'
       } );
       return res.json({success:true,message:"logged out"})
    } catch (error) {
       console.log(error.message);
       res.json({success:false,message: error.message}) 
    }
 }
