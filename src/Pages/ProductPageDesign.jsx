import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'
import Product from '../Components/Product';
import { assets } from '../assets/greencart_assets/assets';

const ProductPageDesign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { product } = useAppContext();
    const currentProduct = product.find((item) => item._id === id);

    const [thumbnail, setThumbnail] = useState(null);
    const [relatedProduct, setRelatedProduct] = useState([])

    const {AddtoCart} = useAppContext();

    useEffect(() => {
        if (currentProduct?.image?.length > 0) {
          setThumbnail(currentProduct.image[0]);
        }

        if (currentProduct?.category) {
          const related = product.filter(
            (item) => item.category === currentProduct.category && item._id !== currentProduct._id
          );
          setRelatedProduct(related);
        }
    }, [currentProduct, product]);


    if (!currentProduct) {
      return <p className="mt-16 text-center text-gray-500">Product not found</p>;
    }



    


  return  currentProduct && (
    <>
        <div className="max-w-6xl w-full px-6">
            <p>
                <span>Home</span> /
                <span> Products</span> /
                <span> {currentProduct.category}</span> /
                <span style={{ color: 'var(--color-primary-dull)' }}> {currentProduct.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {currentProduct.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{currentProduct.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                                                
                            <img key={i} className="md:w-3.5 w-3" src={i<product.rating ? assets.star_icon :  assets.star_dull_icon} />
                                                
                        ))}
                        <p className="text-base ml-2">({currentProduct.rating})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ${currentProduct.price}</p>
                        <p className="text-2xl font-medium">MRP: ${currentProduct.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {currentProduct.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>AddtoCart(currentProduct._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>{AddtoCart(currentProduct._id) ; navigate("/cart")}} className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {/* Now related products section */}
        <div className="">
          <h1 className='text-center mt-9 text-3xl font-semibold mb-5'>Rela<span className="underline decoration-[--color-primary-dull] underline-offset-2 decoration-2 font-semibold">ted Pro</span>ducts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {relatedProduct.filter((productsFilter)=>productsFilter.inStock).map((item, i) => (
            <Product key={item._id || i} product={item} />
        ))}
      </div>
        </div>
    </>
    );
}

export default ProductPageDesign
