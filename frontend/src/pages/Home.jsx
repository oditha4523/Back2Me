import React from 'react'
import Navbar from '../components/navbar';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar auto height */}
      <Navbar />

      {/* Hero fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <HeroSection />
      </div>
    </div>
  )
}

export default Home
