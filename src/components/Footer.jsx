import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-8 z-50 p-3 bg-[#D4AF37] text-[#0A1929] rounded-full shadow-lg hover:bg-[#F5A623] hover:scale-110 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <footer className="relative bg-[#0A1929] border-t border-[#D4AF37]/10 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
            {/* Logo */}
            <div className="flex justify-center">
              <img 
                src={logo} 
                alt="Dr. Shirley Helen Logo" 
                className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain"
              />
            </div>

            {/* Name and Title */}
            <div className="text-center">
              <h3 className="text-white/90 text-base sm:text-lg lg:text-xl font-semibold mb-2">
                Dr. Shirley Helen
              </h3>
              <p className="text-[#D4AF37]/70 text-xs sm:text-sm lg:text-base font-light">
                Global Investment Specialist & Entrepreneur
              </p>
            </div>

            {/* Copyright */}
            <div className="text-center pt-2 border-t border-white/10 w-full max-w-md">
              <p className="text-white/60 text-xs sm:text-sm font-light">
                © 2026 Dr. Shirley Helen
              </p>
              <p className="text-white/40 text-xs font-light mt-1">
                All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
