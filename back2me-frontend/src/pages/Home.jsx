import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/navbar';
import HomeCarousel from '../components/HomeCarousel';
import girlImg from '../assets/girl-img.png';


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

      {/* New Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
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
                className="w-full max-w-lg lg:max-w-2xl h-auto object-contain"
              />
            </motion.div>
          </div>

          
        </div>
      </motion.section>
    </>
  )
}

export default Home

 