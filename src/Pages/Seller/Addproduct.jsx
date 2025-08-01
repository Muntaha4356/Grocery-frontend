import React, { useState } from 'react'
import { assets, categories } from '../../assets/greencart_assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../Context/AppContext';


const Addproduct = () => {

    const [files, setFiles] =useState([]);
    const [name, setName] = useState(``);
    const [description, setDescription] = useState(``);
    const [category, setCategory] = useState(``);
    const [price, setPrice] = useState(``);
    const [offerPrice, setOfferPrice] = useState(``);
    const {axios} = useAppContext()


    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        if (files.length === 0 || files.every(f => !f)) {
            return toast.error("Please upload at least one product image");
        }
        const productData = {
            name,
            description: description.split('\n'),
            category,
            price,
            offerPrice,
        };
        const formData = new FormData();
        files.forEach((file) => {
        if (file) {
            formData.append("images", file);
        }
        });

        formData.append("poductData", JSON.stringify(productData));

        try {
        const res = await axios.post(
        "/api/product/add-product",
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // Important if using cookies/auth
        }
        );
        if (res.data.success) {
            toast.success("Product added successfully!");
            // Reset form
            setFiles([]);
            setName("");
            setDescription("");
            setCategory("");
            setPrice("");
            setOfferPrice("");
            } else {
                console.log(res.data.message)
            toast.error(res.data.message || "Something went wrong");
        }
        } catch (err) {
            console.error(err);
            toast.error("Upload failed. Try again.");
        }
    }



  return (
        <div className="py-10 no-scrollbar flex h-[95vh] overflow-y-scroll flex-col justify-between ">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e)=>{
                                    const updatedFile = [...files]
                                    updatedFile[index] = e.target.files[0]
                                    setFiles(updatedFile)
                                }
                                    

                                } accept="image/*" type="file" id={`image${index}`} hidden />
                                <img className="max-w-24 cursor-pointer" src={files[index] ?
                                    URL.createObjectURL(files[index]) : assets.upload_area
                                } alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e)=>setName(e.target.value)} value={name} 
                    id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e)=>setDescription(e.target.value)} value={description}
                    id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e)=>setCategory(e.target.value)} value={category}
                    id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {
                            categories.map((item,index)=>{
                                return <option key={index} value={item.path}>{item.path}</option>
                            })
                        }
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e)=>setPrice(Number(e.target.value))} value={price}
                        id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e)=>setOfferPrice(Number(e.target.value))} value={offerPrice}
                        id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button style={{ backgroundColor:  'var(--color-primary-dull)' }} className="px-8 py-2.5  text-white cursor-pointer font-medium rounded">ADD</button>
            </form>
        </div>
    );
}

export default Addproduct
