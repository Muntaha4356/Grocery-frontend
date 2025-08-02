import Navbar from "./Components/navbar"
import Home from "./Pages/Home"
import { Route,Routes, useLocation } from "react-router-dom"
import {Toaster} from 'react-hot-toast'

import Footer from "./Components/Footer";
import Login from "./Components/Login";
import { useAppContext } from "./Context/AppContext";
import AllProducts from "./Pages/AllProducts";
import ProductCategoryPage from "./Pages/ProductCategoryPage";
import ProductPageDesign from "./Pages/ProductPageDesign";
import CartPage from "./Pages/CartPage";
import AddAdress from "./Pages/AddAdress";
import MyOrders from "./Pages/MyOrders";
import Seller from "./Components/Seller/Seller";
import SellerLayout from "./Pages/Seller/SellerLayout";
import Addproduct from "./Pages/Seller/Addproduct";
import ProductList from "./Pages/Seller/ProductList";
import Orders from "./Pages/Seller/Orders";
import { useEffect } from "react";
import Loading from "./Components/Loading";
function App() {
  
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, setShowUserLogin,isSeller,setIsSeller, checkSellerAuth } = useAppContext();
  console.log(showUserLogin)



  
  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
    {/* This line checks if the current URL path contains the word "seller", and stores the result (a boolean) in the variable isSellerPath. */}
    
      {isSellerPath ? null : <Navbar/> }
      {showUserLogin ? <Login/> : null}
      <Toaster/>
       { (
          <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/products" element={<AllProducts /> } />
              <Route path="/products/:category" element={<ProductCategoryPage/>} />
              <Route path="/products/:category/:id" element={<ProductPageDesign />} />
              <Route path="/cart" element={<CartPage/> } />
              <Route path="/add-address" element={<AddAdress/> }/>
              <Route path="/myorders" element={<MyOrders/> }/>
              <Route path="/loader" element={<Loading/> }/>

              <Route path="/seller" element={ isSeller ? <SellerLayout/> : <Seller/>} >
                <Route index element={isSeller? <Addproduct/> : null} />
                <Route path="product-list" element={<ProductList/>} />
                <Route path="orders" element={<Orders/>} />
              </Route>
              {/* Add more routes here */}
            </Routes>
          </div>
        )}
      <Footer/>
    </div>
  )
}

export default App
