import React from 'react'
import Navbar from '../components/navbar';
import HomeCarousel from '../components/HomeCarousel';

const Home = () => {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Left side - Text content */}
            <div className="flex-1 lg:pr-8 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 lg:mb-8 text-center lg:text-left">
                Welcome to Back2Me
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl text-center lg:text-left mx-auto lg:mx-0 mb-8 lg:mb-0">
                Lost something? Found something? Back2Me helps reunite people with their lost items.
                Report found items or search for your missing belongings.
              </p>
            </div>
            
            {/* Right side - Carousel */}
            <div className="flex-1 lg:pl-8 w-full max-w-3xl flex justify-center">
              <HomeCarousel />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

 