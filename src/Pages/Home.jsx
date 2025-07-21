import React from 'react'
import Mainbanner from '../Components/mainbanner'
import Categories from '../Components/Categories'
import BestSeller from '../Components/BestSeller'
import SecondBanner from '../Components/SecondBanner'
import NewsLetter from '../Components/NewsLetter'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className='mt-10 '>
      <Mainbanner/>
      <Categories/>
      <BestSeller/>
      <SecondBanner/>
      <NewsLetter/>
    </div>
  )
}

export default Home
