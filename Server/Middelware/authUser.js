import jwt from "jsonwebtoken";




 export const authUser = async (req, res, next) => {
  const token  = req.cookies?.token;
    console.log("🍪 Incoming cookies:", req.cookies);
  console.log("🛂 Extracted token:", token);

  if (!token) {
     console.warn("⛔ No token in cookies");
    return res.json({ success: false, message: "Not Authorized-no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
     console.log("✅ Token Decoded:", decoded);

    if (decoded.id) {
      // req.userId = toeknDecode.id;
        req.userId = decoded.id; 
     
      console.log("✅ Set req.userId:", req.userId);
      ;
    }else{
      console.warn("⛔ Decoded token has no ID");
         return res.json({ success: false, message: "UnAuthorized" });
    }
    next();
  
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    res.json({success:false,message:error.message})
  }
};


