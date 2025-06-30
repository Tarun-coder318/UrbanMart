import Order from "../Model/order.js";
import Product from "../Model/product.js";
import Stripe from "stripe";
import User from "../Model/user.js";



export const placeOrderCOD = async (req,res) => {
    try {
        const userId = req.userId
        const{ items , address}= req.body;
        console.log("📥 items received:", items);
console.log("📬 address received:", address);

if(!address || items.length===0){
    return res.json({success:false, message:'Invalid Data'})
}
let amount = 0;

for (const item of items) {
  const product = await Product.findById(item.product);
  if (!product) {
    return res.json({ success: false, message: `Product not found: ${item.product}` });
  }
  amount += product.offerPrice * item.quantity;
}

amount +=Math.floor(amount*0.02);

await Order.create({
    userId,  items: items.map(i => ({
    ...i, // ✅ this preserves quantity
    status: "Order Placed"
  })),amount,address,paymentType:"COD"
})

    return res.json({success:true, message:'Order Placed '})
    } catch (error) {
         console.log(error.message)
         res.json({success:false, message: error.message})

    }
}

//palce order stripe

export const placeOrderStripe = async (req,res) => {
    try {
        const userId = req.userId
        const{ items , address}= req.body;
        const {origin}=req.headers;
        console.log("📥 items received:", items);
console.log("📬 address received:", address);

if(!address || items.length===0){
    return res.json({success:false, message:'Invalid Data'})
}
let productData=[];
let amount = 0;

for (const item of items) {
  const product = await Product.findById(item.product);
  if (!product) {
    return res.json({ success: false, message: `Product not found: ${item.product}` });
  }
  productData.push({name:product.name,
    price:product.offerPrice,
    quantity:item.quantity,
  })
  amount += product.offerPrice * item.quantity;
}

amount +=Math.floor(amount*0.02);

const order = await Order.create({
    userId,  items: items.map(i => ({
    ...i, // ✅ this preserves quantity
    status: "Order Placed"
  })),amount,address,paymentType:"Online"
})
//stripe gateway initialize
 const stripeInstance= new Stripe(process.env.STRIPE_SECRET_KEY);
 console.log("🔑 Stripe Key:", process.env.STRIPE_SECRET_KEY);


 //create line items for stripe
 const line_items = productData.map((item)=>{
  return{
    price_data:{
      currency :"EUR",
      product_data:{
        name:item.name,
      },
      unit_amount:Math.floor(item.price+item.price*0.02)*100
    },
    quantity:item.quantity,
  }
 })
 //create session
 const session = await stripeInstance.checkout.sessions.create({
  line_items,
  mode:'payment',
  success_url: `${origin}/loader?next=my-orders`,
  cancel_url:`${origin}/cart`,
  metadata:{
    orderId: order._id.toString(),
    userId,
  }
 })

    return res.json({success:true, url: session.url});
    } catch (error) {
         console.log(error.message)
         res.json({success:false, message: error.message})

    }
}

//stripe webhooks to verofy payment
export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  let event ;
  try {
    event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

  } catch (error) {
    console.log("❌ Webhook signature error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":{
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      //getting seesion metadata
      const sessions = await stripeInstance.checkout.sessions.list({
  payment_intent: paymentIntentId,
  limit: 1,
});

const session = sessions.data[0];
if (!session) {
  console.log("❌ No session found for payment_intent");
  return res.status(404).json({ message: "Session not found" });
}

const { orderId, userId } = session.metadata;

      //updating order status
     await Order.findByIdAndUpdate(orderId, {isPaid:true});
     //clearing cart
    await User.findByIdAndUpdate(userId, {cardItems:{}});
      console.log("✅ Payment succeeded, Order updated & cart cleared");
 break;
    }
   case "payment_intent.payment_failed":{
    const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      //getting seesion metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
         limit: 1,

      });
      const { orderId} = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
        console.log("🗑️ Payment failed, Order deleted");
      break;
   }
      default:
      console.log(`Unhandled event type ${event.type}`);
         break;
  }
  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}
// get order by useriD

export const getUserOrder= async (req,res) => {
    try {
        const userId = req.userId
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
