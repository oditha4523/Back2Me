import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-image.png';
import '../assets/Fonts/Cultural-Literature-Demo-BF684d3d082fa20.otf';

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
    <div 
      className="relative flex items-center justify-center h-full w-full bg-[#F1F7F1] overflow-hidden"
    >
      <style>{`
        @font-face {
          font-family: 'Cultural-Literature-Demo';
          src: url('./src/assets/Fonts/Cultural-Literature-Demo-BF684d3d082fa20.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
          html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
      {/* Optional overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-white bg-opacity-20"></div> */}
      
      <div className="w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-24 xl:px-32">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text and Buttons */}
          <motion.div 
            className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green mb-6 sm:mb-10 text-center md:text-left leading-tight"
              style={{ textShadow: '2px 2px 4px rgba(21, 179, 89, 0.8)' }}
              variants={textVariants}
            >
              <span style={{ fontFamily: 'Cultural-Literature-Demo, serif', color:'#3CB371' }}>
                Together
              </span><br />We bring it <br />Back.
            </motion.h1>

            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-row gap-4 justify-center md:justify-start"
              variants={buttonVariants}
            >
              <Link 
                to="/find"
                className="bg-[#3CB371]  hover:bg-[#36a163] text-white px-6 py-3 md:px-8 md:py-3 rounded-4xl text-xs md:text-base font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-center w-32 md:w-40"
              >
                Find Item
              </Link>
              <Link 
                to="/report"
                className="bg-[#3CB371]  hover:bg-[#36a163] text-white px-6 py-3 md:px-8 md:py-3 rounded-4xl text-xs md:text-base font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-center w-32 md:w-40"
              >
                Report Item
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div 
            className="flex justify-center items-center"
            variants={itemVariants}
          >
            <motion.img 
              src={heroImage}
              alt="Hero illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl h-auto object-contain"
              variants={imageVariants}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;