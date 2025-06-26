import Order from "../Model/order.js";
import Product from "../Model/product.js";



export const placeOrderCOD = async (req,res) => {
    try {
        const{userId, items , address}= req.body;
if(!address || items.length===0){
    return res.json({success:false, message:'Invalid Data'})
}
let amount = await items.reduce(async (acc , item) => {
    const product = await Product.findById(items.product);
    return (await acc)+product.offerPrice*item.quantity;
},0)

amount +=Math.floor(amount*0.02);

await Order.create({
    userId, items,amount,address,paymentType:"COD"
})

    return res.json({success:true, message:'Order Placed '})
    } catch (error) {
         console.log(error.message)
         res.json({success:false, message: error.message})

    }
}


// get order by useriD

export const getUserOrder= async (req,res) => {
    try {
        const{userId} = req.body
        const order =  await Order.find({
            userId, $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1});
          return res.json({success:true, order})
    } catch (error) {
         console.log(error.message)
         res.json({success:false, message: error.message})

    }
   
}

// get allorder for admin||seller

export const getSellerOrders= async (req,res) => {
    try {

        const order =  await Order.find({
           $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1});
          return res.json({success:true, order})
    } catch (error) {
         console.log(error.message)
         res.json({success:false, message: error.message})

    }
   
}
