import React from 'react'
import { assets, features } from '../assets/greencart_assets/assets'

const BottemBanner = () => {
  return (
    <div className=' relative mt-24'>

        <img src={assets.bottom_banner_image} alt='banner' className='w-full hidden md:block'/>
       <img src={assets.bottom_banner_image_sm} alt='banner' className='w-full  md:hidden'/>

       <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center  pt-16 md:pt-0 md:pr-15 '>
        <div>
            <h1 className='text-2xl md:text-3xl font:semibold text-green-600'>Why We Are The Best?</h1>
            {features.map((feature, index) => (
             <div key={index} className='flex items-center gap-4 mt-2 '>
                <img src={feature.icon} alt={feature.title} className='md:w-10w-9'/>
               <div>
                 <h3 className='text-sm md:text-lg font-medium'>{feature.title}</h3>
                <p className='text-xs md:text-sm text-gray-500/70'>{feature.description}</p>
               </div>
             </div>
           ))}
        </div>
       </div>
      
    </div>
  )
}

export default BottemBanner
