import React from 'react'

const NewsLetter = () => {
  return (
      <div className=" mt-15 flex flex-col items-center">
        <h1 className='text-2xl font-semibold'>Never Miss a Deal!</h1>
        <p className='text-gray-500'>Subscribe for free and get latest recommendations</p>

        <div className="mt-5 flex gap-2 ">
            <input className='px-3 sm:w-100 md:w-120 ' type="text" placeholder='Enter your email' />
            <button style={{ background: 'var(--color-primary)'  }} className='rounded px-4 py-1 text-white text-sm'>Subscribe</button>

        </div>
      </div>

  )
}

export default NewsLetter
