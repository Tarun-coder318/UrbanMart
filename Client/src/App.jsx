import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import LoginSingupForm from './components/LoginSingupForm.jsx'
// import { ShowUserLogin } from './context/AppContextProvider.jsx'
import { useAppContext } from './context/useAppContext.jsx'
import AllProducts from './pages/AllProducts.jsx'
// import ProductsCategory from './pages/ProductsCategory.jsx'
import ProductsCategory from './pages/ProductsCategory.jsx'
import ProductsDetails from './pages/ProductsDetails.jsx'

import CartItems from './pages/CartItems.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLogin from './components/Seller/SellerLogin.jsx'
import SellerLayout from './pages/Seller/SellerLayout.jsx'
import AddProducts from './pages/Seller/AddProducts.jsx'
import Order from './pages/Seller/Order.jsx'
import ProductList from './pages/Seller/ProductList.jsx'
import Loader from './components/Loader.jsx'


const App = () => {

  const isSellerPath = useLocation().pathname.includes('seller');
  const{showUserLogin, isSeller }= useAppContext();
    return (
    <div>
    {isSellerPath ? null : <Navbar/>}
    {showUserLogin ? <LoginSingupForm/>:null}
    <Toaster/>
    <div className={`${isSellerPath ? '' :"px-6 py-6  md:px-16   lg:px-24 xl:px-32"}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<AllProducts />} />
       <Route path='/products/:category' element={<ProductsCategory />} />
       <Route path='/products/:category/:id' element={<ProductsDetails />} />
        <Route path='/cart' element={<CartItems />} />
        <Route path ='/Add-address'  element={<AddAddress/>}/>
        <Route path= '/my-orders' element={<MyOrders/>}/>
          <Route path= '/loader' element={<Loader/>}/>
        <Route path="/seller" element = {isSeller ? <SellerLayout/>: <SellerLogin/>}>
        <Route index element={isSeller ? <AddProducts/>:null}/>
         <Route path="product-list" element={ <ProductList/>}/>
          <Route path='order' element={<Order/>}/>
          </Route>
        </Routes>
    </div>
   {!isSellerPath && <Footer/>}
    
    </div>
  )
}

export default App
