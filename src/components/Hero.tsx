import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HeroSlide } from '../types';

interface HeroProps {
  slides: HeroSlide[];
  onShopClick: (targetTab: string) => void;
}

export default function Hero({ slides, onShopClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getTargetTab = (link: string) => {
    if (link === 'new-arrivals') return 'new-arrivals';
    if (link === 'collections') return 'collections';
    return 'shop';
  };

  return (
    <div className="relative h-[85vh] min-h-[550px] max-h-[850px] w-full overflow-hidden bg-[#171717]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with subtle zoom */}
          <motion.img
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 6, ease: 'easeOut' }}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].headline}
            className="w-full h-full object-cover object-center"
          />
          {/* Dark luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <div className="max-w-xl text-white">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-3"
                >
                  Yeeks Clothing Enterprise
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4 leading-[1.15]"
                >
                  {slides[currentSlide].headline}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-sm sm:text-base lg:text-lg text-[#FAF7F2]/90 mb-8 font-light leading-relaxed"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <button
                    onClick={() => onShopClick(getTargetTab(slides[currentSlide].buttonLink))}
                    className="group inline-flex items-center gap-3 bg-[#FAF7F2] text-[#171717] px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A36A] hover:text-white transition-all duration-300"
                  >
                    {slides[currentSlide].buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="p-3 bg-white/10 backdrop-blur-md text-white hover:bg-[#C5A36A] transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-white/10 backdrop-blur-md text-white hover:bg-[#C5A36A] transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-6 sm:left-12 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-300 ${
              currentSlide === index ? 'w-10 bg-[#C5A36A]' : 'w-4 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
