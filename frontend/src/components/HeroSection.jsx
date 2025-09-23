import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-image.png';

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
      
      <div className="container mx-auto px-6 md:px-4 pt-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[80vh] items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text and Buttons */}
          <motion.div 
            className="flex flex-col justify-center items-center md:items-start w-full"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-white mb-8 ml-16 text-center md:text-left drop-shadow-2xl w-full"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
              variants={textVariants}
            >
              Together,<br />We bring it <br />Back.
            </motion.h1>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-row gap-3 h-14 ml-16 justify-center md:justify-start"
              variants={buttonVariants}
            >
              <Link 
                to="/find"
                className="bg-[#3CB371]  hover:bg-[#36a163] text-white px-6 py-3 md:px-8 md:py-3 rounded-4xl text-sm md:text-lg font-small transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-center w-32 md:w-40"
              >
                Find Item
              </Link>
              <Link 
                to="/report"
                className="bg-[#3CB371]  hover:bg-[#36a163] text-white px-6 py-3 md:px-8 md:py-3 rounded-4xl text-sm md:text-lg font-small transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-center w-32 md:w-40"
              >
                Report Item
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div 
            className="flex justify-center pl-16 items-center"
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