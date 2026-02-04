import React from 'react';
import ceoImage from '../assets/ceo_image.png';
import TypingEffect from './TypingEffect';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen lg:min-h-[90vh] flex items-start overflow-hidden bg-gradient-to-br from-[#0A1929] via-[#1B2B4A] to-[#0A1929] pt-16 sm:pt-20 lg:pt-10 pb-8 lg:pb-0">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:ml-20 lg:px-8 pt-4 lg:pt-20 pb-6 lg:pb-6 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 xl:gap-10 items-center lg:items-start">
          
          {/* Image First on Mobile - Professional Image with Subtle Background Arcs */}
          <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end lg:pt-4 lg:pr-4 xl:pr-8 2xl:pr-12 -mt-4 lg:-mt-20">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[450px] xl:max-w-[500px]">
              {/* Subtle Background Arc Elements - Hidden on mobile for cleaner look */}
              <div className="hidden lg:block absolute -inset-12 opacity-15">
                <div className="absolute top-1/4 right-1/4 w-80 h-80 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-1/4 left-1/4 w-60 h-60 border border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/20 rounded-full"></div>
                <div className="absolute top-0 right-0 w-48 h-48 border border-white/15 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-44 h-44 border border-white/15 rounded-full"></div>
              </div>
              
              {/* Professional Image */}
              <div className="relative z-10">
                <img 
                  src={ceoImage} 
                  alt="Dr. Shirley Helen - Investment Specialist & Entrepreneur" 
                  className="w-full h-auto rounded-xl lg:rounded-lg object-cover shadow-2xl lg:shadow-none"
                />
              </div>
            </div>
          </div>

          {/* Text Content - Second on Mobile */}
          <div className="order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left space-y-3 sm:space-y-4">
            {/* Name - Large Gold Text */}
            <div className="pt-2 lg:pt-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-[#D4AF37] leading-[1.1] tracking-tight">
                DR. SHIRLEY HELEN
              </h1>
            </div>

            {/* Professional Title */}
            <div className="pt-1">
              <p className="text-sm sm:text-base md:text-lg lg:text-lg text-white font-normal tracking-[0.1em] sm:tracking-[0.15em] uppercase leading-relaxed">
                <TypingEffect 
                  text="GLOBAL INVESTMENT SPECIALIST & ENTREPRENEUR" 
                  speed={80}
                />
              </p>
            </div>

            {/* Tagline */}
            <div className="pt-2 sm:pt-3">
              <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white/90 leading-relaxed font-light px-2 sm:px-0">
                Innovating Global Investments for a Sustainable Future.
              </p>
            </div>

            {/* Key Achievement Badge */}
            <div className="pt-3 sm:pt-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/25 backdrop-blur-sm border border-[#D4AF37]/40 rounded-full px-4 sm:px-5 py-2 sm:py-2.5">
                <span className="text-white font-medium text-xs sm:text-sm text-center">
                  Founder & CEO – Shirley Noel Group of Companies
                </span>
              </div>
            </div>

            {/* Contact Me Button */}
            <div className="pt-4 sm:pt-5 flex justify-center lg:justify-start pt-5 lg:pt-0" >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    const offset = 60;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="group relative inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-[#D4AF37] text-[#0A1929] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5A623] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-[#D4AF37]/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

