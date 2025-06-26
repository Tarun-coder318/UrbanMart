import {v2 as cloudinary } from "cloudinary"
import Product from "../Model/product.js"

// Add product : /api/product/add
export const addproduct=async (req,res) => {
    try {

        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
              let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
              return result.secure_url

            })
        )
        await Product.create({...productData , image:imagesUrl})
        res.json({success:true, message:"Product Added"})
    } catch (error) {
       console.log(error.message);
       res.json({success:false, message:error.message})
        
    }
}
// getALLproduct : /api/product/list
export const productList = async (req,res) => {
    try {
        const products =await Product.find({})
        res.json({success:true, products})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}
// getSingleproductByID : /api/product/id
export const getProductById =async (req,res) => {
    try {
        const {id}=req.body;
        const product =await Product.findById(id)
          res.json({success:true, product})
    } catch (error) {
         console.log(error.message);
        res.json({success:false, message:error.message})
    }
}
// toChange INstock Status : /api/product/stock
export const changeProductStock=async (req,res) => {
    try {
        const{id,inStock}=req.body
        const product = await Product.findByIdAndUpdate(id,{inStock})
         res.json({success:true, message:"Stock Updated"})
    } catch (error) {
         console.log(error.message);
        res.json({success:false, message:error.message})
    }
    }

    export const productListPublic = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

