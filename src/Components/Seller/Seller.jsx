import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Seller = () => {
    const {isSeller, setIsSeller, axios} = useAppContext();

    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");
    const navigate = useNavigate();

    const onSubmitHandler =async(e)=>{
        e.preventDefault();
        console.log("meow")
        try {
          console.log("meow")
          const {data} = await axios.post("/api/seller/login", {
            email, password
          })
          console.log(data.success)
          
          if(data.success){
            setIsSeller(true);

            navigate("/seller");
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
          console.log("hhhh")
        }

    }
    useEffect(()=>{
        if(isSeller){
            navigate("/seller")
        }
    },[isSeller])
  return (
    <div>
      <form onSubmit={onSubmitHandler} className=''>
        <div className="z-30 flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white mt-32">
            <p className='text-2xl font-medium m-auto'><span style={{ color: 'var(--color-primary-dull)' }}  >Seller</span>Login </p>
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" 
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" 
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
            <button type='submit' style={{ background: 'var(--color-primary-dull)' }} className=" transition-all text-white w-full py-2 rounded-md cursor-pointer">
                Login
            </button>
        </div>

        

      </form>
    </div>
  )
}

export default Seller
