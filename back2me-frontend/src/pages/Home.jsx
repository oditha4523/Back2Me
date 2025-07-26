import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/navbar';
import HomeCarousel from '../components/HomeCarousel';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-center gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left side - Text content */}
            <motion.div 
              className="flex-1 lg:pr-8 lg:pl-18 max-w-2xl"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-8xl text-gray-800 mb-6 lg:mb-8 text-center lg:text-left lg:ml-8"
                variants={textVariants}
              >
                Together,<br />We bring it <br />Back.
              </motion.h1>
            </motion.div>
            
            {/* Right side - Carousel */}
            <motion.div 
              className="flex-1 lg:pl-8 w-full max-w-3xl flex justify-center"
              variants={itemVariants}
            >
              <HomeCarousel />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Home

 