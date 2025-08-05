import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/navbar';
import girlImg from '../assets/mobile.jpg';
import heroImage from '../assets/hero-image.jpg';

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

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 relative">
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
                className="text-2xl sm:text-6xl md:text-6xl lg:text-8xl text-white mb-6 lg:mb-8 pb-20 drop-shadow-2xl"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
                variants={textVariants}
              >
                Together,<br />We bring it <br />Back.
              </motion.h1>
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

      {/* New Section */}
      <motion.section 
        className="py-16 bg-black"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Simple steps to reunite you with your lost belongings or help others find theirs
            </motion.p>
          </div>

          {/* Content with Girl Image */}
          <div className="flex justify-center">
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src={girlImg} 
                alt="Girl using the app" 
                className="w-full max-w-[400px] lg:max-w-[520px] h-auto object-contain"
              />
            </motion.div>
          </div>      
        </div>
      </motion.section>
    </>
  )
}

export default Home

