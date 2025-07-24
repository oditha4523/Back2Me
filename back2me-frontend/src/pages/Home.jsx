import React from 'react'
import Navbar from '../components/navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Welcome to Back2Me
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
            Lost something? Found something? Back2Me helps reunite people with their lost items.
            Report found items or search for your missing belongings.
          </p>
        </div>
      </div>
    </>
  )
}

export default Home

 