"use client";

import React, { useState, useRef, useEffect } from 'react';
import greenSlide from '../assets/green-slide.jpg';
import yellowSlide from '../assets/yellow-slide.jpg';
import blueSlide from '../assets/blue-slide.jpg';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
const persons = [{
  name: 'Lost something?',
  title: 'Explore nearby found items with ease.',
  img: greenSlide
}, {
  name: 'Found something?',
  title: 'Be the reason someone smiles.',
  img: yellowSlide
}, {
  name: 'Use the map',
  title: 'to discover or share lost items.Real-time, location-based listings.',
  img: blueSlide
}];
function ImageCarousel() {
  const [activeItem, setActiveItem] = useState(Math.floor(persons.length / 2));
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    wrapperRef.current.style.setProperty('--transition', '600ms cubic-bezier(0.22, 0.61, 0.36, 1)');
    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty('--transition');
    }, 900);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeItem]);
  return (<div className="w-full font-sans">
      <div className="w-full max-w-7xl p-2 sm:p-4 md:p-6 lg:p-8">
        <ul ref={wrapperRef} className="flex w-full flex-col gap-2 h-[200px] sm:h-[280px] md:h-[360px] lg:h-[500px] md:flex-row md:gap-[6%]">
          {persons.map((person, index) => <li onClick={() => setActiveItem(index)} aria-current={activeItem === index} className={classNames("relative group cursor-pointer transition-all duration-500 ease-in-out", "w-full h-[60px] sm:h-[80px] md:w-[16%] md:h-full", "[&[aria-current='true']]:h-[160px] sm:[&[aria-current='true']]:h-[200px] md:[&[aria-current='true']]:w-[55%] md:[&[aria-current='true']]:h-full", "flex-shrink-0", "md:[transition:width_var(--transition,300ms_ease_in)]")} key={person.name}>
              {}
              <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:z-10 transform-gpu">
                <img className={classNames("absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover transition-all duration-500 ease-in-out", activeItem === index ? 'scale-105' : 'scale-100')} src={person.img} alt={person.name} />
                
                {}
                <div className={classNames("absolute inset-0 transition-opacity duration-500", activeItem === index ? "opacity-100" : "opacity-0", "bg-gradient-to-t from-black/85 via-black/60 to-black/20")} />
                
                {}
                <div className={classNames("absolute bottom-0 left-0 w-full p-2 sm:p-3 md:p-6 lg:p-8 text-white", activeItem === index ? "translate-y-0 opacity-100 transition-all duration-300 ease-out" : "translate-y-2 opacity-0 transition-all duration-150 ease-in")}>
                  <p className={classNames("text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold tracking-tight mb-2", activeItem === index ? "transition-all duration-300 ease-out" : "transition-all duration-150 ease-in")} style={{
                  textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
                }}>
                    {person.name}
                  </p>
                  <p className={classNames("text-xs sm:text-xs md:text-sm font-light lowercase tracking-widest text-gray-200", activeItem === index ? "transition-all duration-300 ease-out" : "transition-all duration-150 ease-in")}>
                    {person.title}
                  </p>
                </div>
              </div>
            </li>)}
        </ul>
      </div>
    </div>
  );
}
export default ImageCarousel;
                