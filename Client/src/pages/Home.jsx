import React from 'react'
import MainBanner from '../components/MainBanner.jsx'
import Categories from '../components/Categories.jsx'
import BestSeller from '../components/BestSeller.jsx'
import BottemBanner from '../components/BottemBanner.jsx'
import NewsLetter from '../components/NewsLetter.jsx'

const Home = () => {
  return (
    <div>
     <MainBanner />
     <Categories />
     <BestSeller />
     <BottemBanner/>
     <NewsLetter/>
    </div>
  )
}

export default Home
