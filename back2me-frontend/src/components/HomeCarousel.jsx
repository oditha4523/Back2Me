"use client";

import React, { useState, useRef, useEffect } from 'react';
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
const persons = [{
  name: 'Aria Rossi',
  title: 'Lead Architect',
  img: 'https://i.pinimg.com/736x/d6/8a/12/d68a121e960094f99ad8acd37505fb7d.jpg'
}, {
  name: 'Leo Carter',
  title: 'Creative Director',
  img: 'https://i.pinimg.com/736x/21/16/f7/2116f71f9d51d875e44d809f074ff079.jpg'
}, {
  name: 'Mia Chen',
  title: 'Senior Developer',
  img: 'https://i.pinimg.com/1200x/fe/c2/0d/fec20d2958059b8463bffb138d4eaac6.jpg'
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
        <ul ref={wrapperRef} className="flex w-full flex-col gap-2 h-[200px] sm:h-[280px] md:h-[360px] lg:h-[460px] md:flex-row md:gap-[1.5%]">
          {persons.map((person, index) => <li onClick={() => setActiveItem(index)} aria-current={activeItem === index} className={classNames("relative group cursor-pointer transition-all duration-500 ease-in-out", "w-full h-[60px] sm:h-[80px] md:w-[12%] md:h-full", "[&[aria-current='true']]:h-[120px] sm:[&[aria-current='true']]:h-[160px] md:[&[aria-current='true']]:w-[48%] md:[&[aria-current='true']]:h-full", "flex-shrink-0", "md:[transition:width_var(--transition,300ms_ease_in)]")} key={person.name}>
              {}
              <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-black shadow-lg sm:shadow-xl md:shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:z-10 transform-gpu">
                <img className={classNames("absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover transition-all duration-500 ease-in-out", activeItem === index ? 'scale-105 grayscale-0' : 'scale-100 grayscale')} src={person.img} alt={person.name} />
                
                {}
                <div className={classNames("absolute inset-0 transition-opacity duration-500", activeItem === index ? "opacity-100" : "opacity-0", "bg-gradient-to-t from-black/70 via-black/30 to-transparent")} />
                
                {}
                <div className={classNames("absolute bottom-0 left-0 w-full p-2 sm:p-3 md:p-6 lg:p-8 text-white transition-[transform,opacity] duration-700 ease-in-out", activeItem === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")}>
                  <p className="text-xs sm:text-sm md:text-base font-light uppercase tracking-widest text-gray-200">
                    {person.title}
                  </p>
                  <p className="text-sm sm:text-lg md:text-2xl lg:text-5xl font-bold tracking-tight" style={{
                  textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
                }}>
                    {person.name}
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
                