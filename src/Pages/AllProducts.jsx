import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import Product from '../Components/Product'
const AllProducts = () => {


    const {product, searchQuery} = useAppContext();
    const [productsFilter, setProductsFilter] = useState([])
    useEffect(()=>{
        if(searchQuery.length > 0 ){
            setProductsFilter(product.filter(
                product => product.name.toLowerCase().includes(searchQuery.
                    toLowerCase())
            ))
        }else{
            setProductsFilter(product)
        }
    },[product, searchQuery])

  return (
    <div className='flex flex-col mt-16'>
      <h1 className="text-3xl font-semibold mb-5">
        ALL PROD
        <span
            className="underline decoration-[--color-primary-dull] underline-offset-2 decoration-2 font-semibold"
        >
            UCTS
        </span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {productsFilter.filter((productsFilter)=>productsFilter.inStock).map((item, i) => (
            <Product key={item._id || i} product={item} />
        ))}
      </div>
    </div>
  )
}

export default AllProducts
