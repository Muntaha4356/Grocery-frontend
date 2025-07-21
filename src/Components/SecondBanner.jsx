import React from 'react'
import { assets, features } from '../assets/greencart_assets/assets'

const SecondBanner = () => {
  return (
    <div className="relative mt-24">
  {/* Banner Images */}
  <img
    src={assets.bottom_banner_image}
    alt="banner"
    className="w-full hidden md:block object-cover"
  />
  <img
    src={assets.bottom_banner_image_sm}
    alt="banner"
    className="w-full block md:hidden object-cover"
  />

  {/* Text Content Overlay */}
  <div
    className="absolute inset-0 flex flex-col justify-start items-center md:justify-end md:items-end px-6 md:px-24 py-8"
  >
    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-6 max-w-xl w-full md:w-[460px]">
      <h1
        style={{ color: 'var(--color-primary)' }}
        className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center md:text-left"
      >
        Why we are the best?
      </h1>
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:items-start items-center gap-3 sm:gap-4 mt-2 text-center sm:text-left"
        >
          <img
            src={feature.icon}
            alt={feature.title}
            className="w-9 sm:w-10 md:w-11"
          />
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-medium">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default SecondBanner
