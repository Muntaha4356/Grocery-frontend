import React from 'react'
import {categories } from '../assets/greencart_assets/assets';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate =useNavigate();
  return (
    <div className="px-4 py-6">
      <h1 className="font-semibold text-2xl md:text-3xl mb-4">Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{ backgroundColor: cat.bgColor }}
            onClick={()=>{
                navigate(`/products/${cat.path.toLowerCase()}`);
                scrollTo(0,0);
            }}
            className={`group cursor-pointer py-5 px-3 gap-2 shadow-md rounded-lg overflow-hidden flex flex-col justify-center items-center`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-32 max-w-28 object-cover group-hover:scale-106 transition "
            />
            <div className="p-3 text-center font-medium">{cat.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
