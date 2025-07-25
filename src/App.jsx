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
function App() {
  
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, setShowUserLogin } = useAppContext();
  console.log(showUserLogin)
  return (
    <>
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
              {/* Add more routes here */}
            </Routes>
          </div>
        )}
      <Footer/>
    </>
  )
}

export default App
