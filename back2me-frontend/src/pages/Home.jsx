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
            <div className="flex-1 lg:pr-8 lg:pl-18 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl lg:text-8xl text-gray-800 mb-6 lg:mb-8 text-center lg:text-left lg:ml-8">
                Together,<br />We bring it <br />Back.
              </h1>
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

 