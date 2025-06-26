import jwt from "jsonwebtoken";

export const SellerAuth = async (req, res, next) => {
  const { sellertoken} = req.cookies;
  if (!sellertoken) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const tokendecoded = jwt.verify(sellertoken, process.env.JWT_KEY);
    console.log("token:", tokendecoded);

    if (tokendecoded) {
      req.userId = tokendecoded;
      console.log(req.userId);
    } else {
      return res.json({ success: false, message: "UnAuthorized" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
