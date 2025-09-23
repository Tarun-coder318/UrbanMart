import React from 'react'
import { useAppContext } from '../context/useAppContext';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { assets } from '../assets/greencart_assets/assets';
import ProductCard from '../components/ProductCard';


const ProductsDetails = () => {
const{products,navigate,currency,addToCart}=useAppContext();
const{id}=useParams();
const[relatedProducts, setRelatedProducts] = useState([]);
const [thumbnail, setThumbnail] = useState(null);

const product = products.find((item) => item._id.toString() === id);

useEffect(() => {
if (product&&products.length > 0){
   
    let productscpoy= products.slice();
    productscpoy= productscpoy.filter((item) => item.category?.toLowerCase() === product.category?.toLowerCase()  );
     
    
    setRelatedProducts(productscpoy.slice(0, 5));

    
}
},[products, product]);

useEffect(() => {
    if(product?.image?.length){ setThumbnail(product.image[0]? product.image[0] : null);}
   
},[product]);

if(!product) 
{
    return (
      <div className="mt-24 text-center text-gray-400 text-lg">
        Loading product...
      </div>
    ); 
}    
  
  return  (
   <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-green-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image?.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product"  className="w-full h-full object-cover block" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                          
                               <img key={i} src={i<4 ? assets.star_icon : assets.star_dull_icon} alt='star ' className='md:w-4 w-3.5'/>
                             
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.descriptions.map((des, index) => (
                            <li key={index}>{des}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button  onClick={()=>{addToCart(product._id);navigate("/cart")}}className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center mt-20' >
                <div className='flex flex-col items-center w-max'>
                    <p className="text-2xl font-medium mt-12">Related Products</p>
                    <div className='w-22 h-0.5 bg-green-400 rounded-full mt-2 ml-20'></div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8'>
                    {relatedProducts.filter((product) => product.inStock).map((product, index) => (
                        <ProductCard key={index} products={product} />
                    ))}
                </div>
                <button onClick={()=>{navigate("/products"); scrollTo(0,0)} }className='mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition'>
                    View All Products
                </button>
            </div>
        </div>
  )
}

export default ProductsDetails
