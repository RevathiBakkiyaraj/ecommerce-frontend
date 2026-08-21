import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import Navbar from './customer/components/Navbar/Navbar';
import customeTheme from './Theme/customeTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/Page Details/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BecomeSeller from './customer/pages/Become Seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './component/Pages/Dashboard/Dashboard';
import { useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import Auth from './customer/pages/Auth/Auth';
import { fetchUserProfile } from './State/AuthSlice';
import PaymentSuccess from './customer/pages/PaymentSuccess';
import Wishlist from './customer/Wishlist/Wishlist';
import { createHomeCategories } from './State/customer/customerSlice';
import { homeCategories } from './data/HomeCategory';

function App() {
  const dispatch=useAppDispatch();
  const {seller,auth}=useAppSelector(store=>store)
  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""))
    dispatch(createHomeCategories(homeCategories))
    
  },[])

  useEffect(()=>{
    if(seller.profile){
      navigate("/seller")
    }
  },[seller.profile])

  useEffect(()=>{
    dispatch(fetchUserProfile({jwt: auth.jwt || localStorage.getItem("jwt")}))
  },[auth.jwt])

  return (
      <ThemeProvider theme={customeTheme}>

      <div>    
       <Navbar/>  
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Auth/>} />
         <Route path="/products/:category" element={<Product/>} />
         <Route path="/reviews/:category" element={<Review/>} />
         <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails/>} />
         <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/payemnt-success/:orderId" element={<PaymentSuccess/>} />
        <Route path="/become-seller" element={<BecomeSeller/>} />
        <Route path="/account/*" element={<Account/>} />
        <Route path="/seller/*" element={<SellerDashboard/>} />
        <Route path="/admin/*" element={<AdminDashboard/>} />
       </Routes>
       </div>
      </ThemeProvider>
  );
}
export default App;
