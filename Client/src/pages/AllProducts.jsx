import React from 'react'
import { useEffect, useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import ProductCard from '../components/ProductCard';
const AllProducts = () => {
    const { products ,searchQuery,setSearchQuery} = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
    if (searchQuery.length > 0) {
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }
    else {
        setFilteredProducts(products);
      
    }

    },[products, searchQuery]);
  return (
    <div className=' mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-green-300 rounded-full'></div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5  gap-3 mt-6'>
        {filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index} products={product} />
        ))}
      </div>
    </div>
  ) 
}

export default AllProducts
