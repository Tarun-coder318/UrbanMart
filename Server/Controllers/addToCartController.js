import User from "../Model/user.js";




export const addToCart= async (req,res) => {
    try {
        const{userId,CartItems} = req.body
        await User.findByIdAndUpdate(userId,{cardItems: CartItems })
        res.json({success:true, message: "cart updated"})

    } catch (error) {
        console.log(error.message)
         res.json({success:false, message: error.message})

    }
}