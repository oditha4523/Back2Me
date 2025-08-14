import React from 'react'
import Navbar from '../components/navbar';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
    </div>
  )
}

export default Home

