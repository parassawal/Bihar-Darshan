import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Utensils, Music, Star, MapPin, LayoutGrid } from 'lucide-react';

type Category = 'All' | 'Food' | 'Festivals' | 'Personalities' | 'Places';

interface Attraction {
  name: string;
  image: string;
  desc: string;
  category?: Category;
}

interface AttractionSliderProps {
  attractions: Attraction[];
  title: string;
}

const FILTERS: { label: Category; icon: React.ReactNode }[] = [
  { label: 'All', icon: <LayoutGrid size={15} /> },
  { label: 'Food', icon: <Utensils size={15} /> },
  { label: 'Festivals', icon: <Music size={15} /> },
  { label: 'Personalities', icon: <Star size={15} /> },
  { label: 'Places', icon: <MapPin size={15} /> },
];

const AttractionSlider: React.FC<AttractionSliderProps> = ({ attractions, title }) => {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = activeFilter === 'All'
    ? attractions
    : attractions.filter((a) => a.category === activeFilter);

  // Reset carousel index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % filtered.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (filtered.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, filtered.length]);

  return (
    <section className="py-24 bg-[#FCEBD3] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-4">
              {title}
            </h2>
            <div className="w-24 h-1 bg-[#F4A261] rounded-full" />
          </div>
          {/* <button className="group flex items-center gap-2 text-[#F4A261] font-bold text-lg hover:text-[#F4A261] transition-colors">
            View All Attractions <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button> */}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-14">
          {FILTERS.map(({ label, icon }) => {
            const isActive = activeFilter === label;
            return (
              <motion.button
                key={label}
                onClick={() => setActiveFilter(label)}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                  tracking-wide border transition-all duration-300 overflow-hidden
                  ${isActive
                    ? 'bg-[#F4A261] border-[#F4A261] text-white shadow-lg shadow-[#F4A261]/30'
                    : 'bg-white border-[#F4A261]/30 text-[#0F3D2E]/60 hover:border-[#F4A261] hover:text-[#F4A261]'}
                `}
              >
                {/* animated bg sweep on hover */}
                {!isActive && (
                  <motion.span
                    className="absolute inset-0 bg-[#F4A261]/8 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {icon}
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Carousel / Empty State */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-64 text-[#0F3D2E]/40 gap-4"
            >
              <MapPin size={48} strokeWidth={1} />
              <p className="text-xl font-serif">No {activeFilter} attractions found</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Carousel Container */}
              <div className="relative h-[600px] flex items-center justify-center">
                {/* Navigation Arrows */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-10 z-30 pointer-events-none">
                  <button
                    onClick={prevSlide}
                    className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#0F3D2E] shadow-xl hover:bg-white hover:scale-110 transition-all pointer-events-auto disabled:opacity-30"
                    disabled={filtered.length <= 1}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#0F3D2E] shadow-xl hover:bg-white hover:scale-110 transition-all pointer-events-auto disabled:opacity-30"
                    disabled={filtered.length <= 1}
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>

                <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {filtered.map((attraction, index) => {
                      const position = (index - activeIndex + filtered.length) % filtered.length;

                      let x = '0%';
                      let scale = 1;
                      let zIndex = 10;
                      let opacity = 0;
                      let rotateY = 0;
                      let blur = '0px';

                      if (position === 0) {
                        x = '0%'; scale = 1; zIndex = 20; opacity = 1;
                      } else if (position === 1) {
                        x = '45%'; scale = 0.85; zIndex = 15; opacity = 0.7; rotateY = -15; blur = '4px';
                      } else if (position === filtered.length - 1) {
                        x = '-45%'; scale = 0.85; zIndex = 15; opacity = 0.7; rotateY = 15; blur = '4px';
                      } else if (position === 2) {
                        x = '70%'; scale = 0.7; zIndex = 10; opacity = 0.4; rotateY = -25; blur = '8px';
                      } else if (position === filtered.length - 2) {
                        x = '-70%'; scale = 0.7; zIndex = 10; opacity = 0.4; rotateY = 25; blur = '8px';
                      }

                      if (opacity === 0) return null;

                      return (
                        <motion.div
                          key={attraction.name}
                          initial={{ opacity: 0, x: position > 0 ? '100%' : '-100%' }}
                          animate={{ x, scale, zIndex, opacity, rotateY, filter: `blur(${blur})` }}
                          exit={{ opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                          className="absolute w-[60%] max-w-[800px] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                        >
                          <div className="relative w-full h-full group">
                            <img
                              src={attraction.image}
                              alt={attraction.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Category Badge */}
                            {position === 0 && attraction.category && (
                              <div className="absolute top-8 left-8 bg-[#F4A261] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg uppercase">
                                {attraction.category}
                              </div>
                            )}

                            {/* Content Area */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                              <div className="flex items-end justify-between gap-6">
                                <div className="max-w-2xl">
                                  {position === 0 && (
                                    <p className="text-[#F4A261] font-signature text-2xl mb-2 italic">
                                      Discovery {String(index + 1).padStart(2, '0')}
                                    </p>
                                  )}
                                  <h3 className={`text-white font-serif font-bold ${position === 0 ? 'text-4xl md:text-5xl mb-4' : 'text-2xl'}`}>
                                    {attraction.name}
                                  </h3>
                                  {position === 0 && (
                                    <p className="text-white/80 text-lg leading-relaxed mb-4 max-w-xl line-clamp-2">
                                      {attraction.desc}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Dot Indicators */}
              {filtered.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {filtered.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`transition-all duration-300 rounded-full ${i === activeIndex
                          ? 'w-8 h-2 bg-[#F4A261]'
                          : 'w-2 h-2 bg-[#F4A261]/30 hover:bg-[#F4A261]/60'
                        }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default AttractionSlider;
