import User from "../Model/user.js";




export const addToCart= async (req,res) => {
    try {
        const{cardItems} = req.body
        const userId = req.userId;
        
    console.log("🔍 userId:", userId);
    console.log("🛒 cardItems:", cardItems);
    


    if (!userId) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }
        
        await User.findByIdAndUpdate(userId,{cardItems },  { new: true })
        res.json({success:true, message: "cart updated"})
 
    } catch (error) {
        console.log(error.message)
         res.json({success:false, message: error.message})

    }
}