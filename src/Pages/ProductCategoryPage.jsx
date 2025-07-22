import React, {useEffect, useState} from 'react'
import { useAppContext } from '../Context/AppContext'
import { useParams } from "react-router-dom";
import Product from '../Components/Product';

const ProductCategoryPage = () => {
    const {product} = useAppContext();
    const { category } = useParams();
    const [productsFilter, setProductsFilter] = useState([])

    useEffect(() => {
      if (product.length > 0 && category) {
        setProductsFilter(
          product.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
          )
        );
      }
    }, [product, category]);

  return productsFilter.length > 0 ? (
    <div>
      <h1 className="text-2xl font-bold capitalize">{category} Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {productsFilter.filter((productsFilter)=>productsFilter.inStock).map((item, i) => (
            <Product key={item._id || i} product={item} />
        ))}
      </div>
    </div>
  ): (
    <div className="flex items-center justify-center flex-col mt-6">
      <div className="text-gray-600 text-2xl font-medium ">No product from {category}</div>
      <img src="https://res.cloudinary.com/dflbje6qn/image/upload/v1753139760/Errors_Clipart_Hd_PNG_Error_File_Icon_Vectors_File_Icons_Error_Icons_Error_PNG_Image_For_Free_Download_ngduts.jpg" alt="" />
    </div>
    
  )
}

export default ProductCategoryPage
