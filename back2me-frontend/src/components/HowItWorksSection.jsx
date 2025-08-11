import React from 'react'
import girlImg from '../assets/mobile.png';

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Simple steps to reunite you with your lost belongings or help others find theirs
          </p>
        </div>

        {/* Content with Girl Image */}
        <div className="flex justify-center relative">
          {/* Soft light green color circle behind image */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-296 h-296 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 94, 0.2) 0%, rgba(0, 255, 94, 0.1) 40%, transparent 70%)',
              filter: 'blur(30px)'
            }}
          ></div>
          
          <div className="flex justify-center relative z-10">
            <img 
              src={girlImg} 
              alt="Girl using the app" 
              className="w-full max-w-[400px] lg:max-w-[520px] h-auto object-contain"
            />
          </div>
        </div>      
      </div>
    </section>
  );
};

export default HowItWorksSection;