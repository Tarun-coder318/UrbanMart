import React from 'react'
import { useAppContext } from '../context/useAppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/greencart_assets/assets'
import ProductCard from '../components/ProductCard';


const ProductsCategory = () => {
 const { products}= useAppContext();
//  const categories = [...new Set(products.map(product => product.category))];
const{ category } = useParams();

const searchCategory = categories.find((item) => item.path.toLowerCase() === category);

const filteredProducts = products.filter((product) => product.category.toLowerCase() === category);

  return (
    <div className='=mt-16'>
      {searchCategory&&(
        <div className='flex flex-col items-end w-max mb-6'>
            <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
            <div className=' w-16 h-0.5 bg-green-400 roounded-full'></div>

        </div>
      )}
      { filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-16'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} products={product} />
          ))}
        </div>
      ):(
        <div className='flex items-center justify-center h-96'>
          <p className='text-center text-2xl font-semibold'>No products found in this category</p>
        </div>
      )}
     
    </div>
  )
}

export default ProductsCategory
