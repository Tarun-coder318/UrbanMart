import jwt from "jsonwebtoken";




 export const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const toeknDecode = jwt.verify(token, process.env.JWT_KEY);
     console.log("✅ Token Decoded:", toeknDecode);

    if (toeknDecode.id) {
      req.userId = toeknDecode.id;
      console.log("✅ Set req.userId:", req.userId);
      ;
    }else{
         return res.json({ success: false, message: "UnAuthorized" });
    }
    next();
  
  } catch (error) {
    res.json({success:false,message:error.message})
  }
};


