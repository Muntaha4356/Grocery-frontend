import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../assets/greencart_assets/assets";
const Product = ({product}) => {
    const [count, setCount] = React.useState(0);
    const {AddtoCart, cartItems ,updateCartItem, removeCartItem} = useAppContext();
  
    
    return product && (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" 
                src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        
                        <img key={i} className="md:w-3.5 w-3" src={i<product.rating ? assets.star_icon :  assets.star_dull_icon} />
                        
                    ))}
                    <p>({product.rating})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text--color-primary-dull">
                        ${product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${product.price}</span>
                    </p>
                    <div style={{ color: 'var(--color-primary)' }}  >
                        {!cartItems[product._id] ? (
                            <button style={{ color: 'var(--color-primary)' }} className="flex items-center justify-center gap-1 bg-indigo-100 border style={{ color: 'var(--color-primary)' }} md:w-[80px] w-[64px] h-[34px] rounded font-medium" 
                            onClick={() => {
                                AddtoCart(product._id);
                                setCount(1); // optional if you want to keep this local count
                            }} >
                                <img src={assets.cart_icon}  />
                                Add
                            </button>
                        ) : (
                            <div style={{ color: 'var(--color-primary)' }} className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px]  rounded select-none">
                                <button 
                                onClick={() =>
                                    cartItems[product._id] === 1
                                    ? removeCartItem(product._id)
                                    : updateCartItem(product._id, cartItems[product._id] - 1)
                                }
                                className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button 
                                onClick={() => updateCartItem(product._id, cartItems[product._id] + 1)}
                                className="cursor-pointer text-md px-2 h-full" >
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
export default Product
