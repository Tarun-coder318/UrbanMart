import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized-no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded.id) {
      // req.userId = toeknDecode.id;
      req.userId = decoded.id;
    } else {
      return res.json({ success: false, message: "UnAuthorized" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
