import React from 'react'
import Product from './Product'
import { useAppContext } from '../Context/AppContext'
const BestSeller = () => {
    const {product} = useAppContext();
    const count =4;
  return (
    <div>
        <h1 className="font-semibold text-2xl md:text-3xl mb-4">Best Sellers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {product.filter((product)=>product.inStock).slice(0, count).map((item, i) => (
        <Product key={item._id || i} product={item} />
      ))}
    </div>
        
      
    </div>
  )
}

export default BestSeller

