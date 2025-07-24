import React from 'react'
import Navbar from '../components/navbar';

const FindItem = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Find Lost Items
          </h1>
          <p className="text-gray-600">
            Search for your lost items here. This page is under development.
          </p>
        </div>
      </div>
    </>
  )
}

export default FindItem
