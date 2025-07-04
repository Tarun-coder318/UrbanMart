import React from "react";
import { assets } from "../assets/greencart_assets/assets";
import { useAppContext } from "../context/useAppContext";
const ProductCard = ({products}) => {
    

  const {currency,addToCart, removeFromCart,updateCart,navigate,CardItems}=useAppContext(); 
 


 

  return products && (
    <div  onClick={()=>{navigate(`/products/${products.category.toLowerCase()}/${products._id}`);scrollTo(0,0)}}className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={products.image[0]}
          alt={products.name}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>{products.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {products.name}
        </p>
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) =>
             
                <img key={i} className="md:w-3.5 w3" src={i<4 ? assets.star_icon : assets.star_dull_icon } alt=''/>
              
            )}
          <p>(4)</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
           {currency}{products.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
             {currency}{products.price}
            </span>
          </p>
          <div onClick={(e)=>{e.stopPropagation();

          }} className="text-indigo-500">
            {!CardItems[products._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium cursor-pointer"
                onClick={() => addToCart(products._id)}
              >
               <img src={assets.cart_icon} alt='cart_icon'/>
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                <button
                  onClick={() =>{removeFromCart(products._id)}}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{CardItems[products._id]}</span>
                <button
                  onClick={() => {addToCart(products._id)}}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
