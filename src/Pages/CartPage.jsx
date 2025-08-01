import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import { assets, dummyAddress } from '../assets/greencart_assets/assets';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [showAddress, setShowAddress] = React.useState(false)
  const {product, cartItems,getItemCount,getCartTotalAmount,removeCartItem, updateCartItem } = useAppContext();
  const [productsInCart, setProductsInCart] = useState([]);
  const [addresses, setAddresses] = useState(dummyAddress);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0])
  const [paymentOption, setPaymentOption] = useState("COD");


  const navigate = useNavigate();
   
  
    useEffect(() => {
        const filteredProducts = product.filter((p) => cartItems[p._id]);
        setProductsInCart(filteredProducts);
    }, [product, cartItems]);


    const placeOrder = () => {

    }

   
    return productsInCart.length>0 && cartItems &&  (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span  style={{ color: 'var(--color-primary-dull)' }} className="text-sm ">{productsInCart.length} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {productsInCart.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=>{
                                navigate(`/products/${product.category}/${product._id}`);
                                scrollTo(0,0)
                            }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{getItemCount(product._id)  || "N/A"} kilogram</span></p>

                                    
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.offerPrice * getItemCount(product._id)}</p>
                        <button  className="cursor-pointer mx-auto">
                            <svg onClick={()=>removeCartItem(product._id)} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            
                        </button>
                    </div>)
                )}

                <button onClick={()=>{navigate("/products"),
                                scrollTo(0,0)}
                } style={{ color: 'var(--color-primary-dull)' }} className="group cursor-pointer flex items-center mt-8 gap-2 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#2382AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`: "No address found" } </p>
                        <button onClick={() => setShowAddress(!showAddress)} style={{ color: 'var(--color-primary-dull)' }} className=" hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {addresses.map((address, index)=>(
                                    <p onClick={() => {setSelectedAddress(address); setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                )) }
                                <p onClick={() => navigate("/add-address")}  style={{ color: 'var(--color-primary-dull)' }}
                                className=" text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select value={paymentOption}
                    onChange={(e) => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{getCartTotalAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>${getCartTotalAmount()}</span>
                    </p>
                </div>

                <button onClick={placeOrder} style={{ background: 'var(--color-primary-dull)' }} className="w-full py-3 mt-6 cursor-pointer text-white font-medium transition">
                    {
                        paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"
                    }
                </button>
            </div>
        </div>
    )
}

export default CartPage
