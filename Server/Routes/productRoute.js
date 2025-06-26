import express from "express"
import { upload } from "../Utils/multer.js";
import { addproduct, changeProductStock, getProductById, productList ,productListPublic } from "../Controllers/productController.js";
import { SellerAuth } from "../Middelware/authSeller.js";




const ProductRouter = express.Router();
ProductRouter.post('/add', upload.array(["images"]),SellerAuth , addproduct);
ProductRouter.get('/list', SellerAuth , productList);
ProductRouter.get('/id', SellerAuth , getProductById);
ProductRouter.post('/stock', SellerAuth , changeProductStock);
ProductRouter.get('/public', productListPublic);






export default ProductRouter;