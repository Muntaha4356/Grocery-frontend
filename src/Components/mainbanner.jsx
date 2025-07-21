import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../assets/greencart_assets/assets'
import { useAppContext } from '../Context/AppContext'
const Mainbanner = () => {
    const navigate = useNavigate();
    const {user, setUser,setShowUserLogin} = useAppContext();
  return (

    <div className='relative '>
      
      <img src="https://res.cloudinary.com/dflbje6qn/image/upload/c_crop,ar_16:9/v1752864353/The_Grocery_Store_and_Don_t_Tell_The_Grocer_Cafe_ksl4me.jpg" alt="banner" className='w-full h-100 hidden md:block quality-hd' />
      <img src="https://res.cloudinary.com/dflbje6qn/image/upload/v1752865738/A_bag_of_vegetables_on_the_background_of_a_supermarket__Generative_AI_royalty_free_stoc_rekpzk.jpg" alt="banner" className='w-full h-100 md:hidden block quality-hd' />
      <div className='pt-4 absolute flex flex-col items-center text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold '>Buy and Enjoy.Lol</h1>
      </div>
      <div className=" flex flex-col items-start mt-8 font-medium m-0 pt-9 space-y-3  ">
        <Link onClick={() => {
    if (user) {
      navigate("/products");
    } else {
      setShowUserLogin(false);
    }
  }} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition  rounded text-white cursor-pointer mt-3'>
        Shop Now 
        <img className='md:hidden ' src={assets.white_arrow_icon} alt="" />
        </Link>


        <Link onClick={() => {
    if (user) {
      navigate("/deals");
    } else {
      setShowUserLogin(false);
    }
  }} className='group hidden md:flex items-center gap-2 p-1 cursor-pointer'>
        Explore Deals
        <img className='md:hidden transition group-hover:translate-x-1' src={assets.white_arrow_icon} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default Mainbanner
