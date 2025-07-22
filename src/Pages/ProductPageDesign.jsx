import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'
const ProductPageDesign = () => {
    const {id} = useParams();
    const {product} = useAppContext();

    const currentProduct = product.find((item) => item._id === id);
    if (!currentProduct) {
    return <p className="mt-16 text-center text-gray-500">Product not found</p>;
  }
  console.log(currentProduct)
  return (
    <div className='mt-13'>
      <p><span>Home</span>/ <span>Products</span>/ <span>{currentProduct.category}</span>/ <span style={{ color: 'var(--color-primary-dull)' }}>{currentProduct.name}</span></p>
      <div className="">
        <img src={currentProduct.image[0]} alt="" />
      </div>
    </div>
  )
}

export default ProductPageDesign
