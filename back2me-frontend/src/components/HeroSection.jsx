import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-image.jpg';

const HeroSection = () => {
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

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="container mx-auto px-4 pt-4 relative z-10">
        <motion.div 
          className="flex justify-between items-center min-h-[50vh]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left-aligned Text content */}
          <motion.div 
            className="max-w-4xl text-left flex-1"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-2xl sm:text-6xl md:text-6xl lg:text-8xl text-white mb-6 lg:mb-8 drop-shadow-2xl"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
              variants={textVariants}
            >
              Together,<br />We bring it <br />Back.
            </motion.h1>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-8"
              variants={buttonVariants}
            >
              <Link 
                to="/find"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-3xl text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-center w-full sm:w-48"
              >
                Find Item
              </Link>
              <Link 
                to="/report"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-3xl text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-center w-full sm:w-48"
              >
                Report Item
              </Link>
            </motion.div>
          </motion.div>

          {/* Right-side Hero Image */}
          <motion.div 
            className="hidden md:flex flex-1 justify-center items-center"
            variants={itemVariants}
          >
            <motion.img 
              src={heroImage}
              alt="Hero illustration"
              className="w-full max-w-xs lg:max-w-md h-auto object-contain"
              variants={imageVariants}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;