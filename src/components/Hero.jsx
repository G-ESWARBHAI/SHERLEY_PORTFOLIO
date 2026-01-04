import React from 'react';
import ceoImage from '../assets/ceo_image.png';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A1929] via-[#1B2B4A] to-[#0A1929] pt-5 lg:pt-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Main Content Container - Split Layout */}
      <div className="relative z-10  ml-4 lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-10 items-center lg:items-start">
          
          {/* Left Side - Text Content */}
          <div className="order-1 lg:order-1 flex flex-col justify-center text-center lg:text-left space-y-3">
            {/* Name - Large Gold Text */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#D4AF37] leading-[1.1] tracking-tight">
                DR. SHIRLEY HELEN
              </h1>
            </div>

            {/* Professional Title */}
            <div>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-normal tracking-[0.15em] uppercase">
                GLOBAL INVESTMENT SPECIALIST & ENTREPRENEUR
              </p>
            </div>

            {/* Tagline */}
            <div className="pt-2">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-light">
                Innovating Global Investments for a Sustainable Future.
              </p>
            </div>

            {/* Key Achievement Badge */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/25 backdrop-blur-sm border border-[#D4AF37]/40 rounded-full px-5 py-2.5">
                <span className="text-white font-medium text-xs sm:text-sm">
                  Founder & CEO – Shirley Noel Group of Companies
                </span>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <button className="group relative px-6 py-3 bg-[#D4AF37] text-[#0A1929] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/40 hover:scale-[1.02]">
                <span className="relative z-10">LEARN MORE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5A623] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Right Side - Professional Image */}
          <div className="order-2 lg:order-2 flex justify-center lg:justify-end lg:pt-4 lg:pr-10 xl:pr-24">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] xl:max-w-[380px]">
              {/* Image Frame with Gold Accent */}
              <div className="absolute -inset-3 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-xl blur-lg"></div>
              <div className="relative bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-1.5 rounded-xl">
                <img 
                  src={ceoImage} 
                  alt="Dr. Shirley Helen - Investment Specialist & Entrepreneur" 
                  className="w-full h-auto rounded-lg shadow-xl object-cover"
                />
              </div>
              {/* Decorative Corner Elements */}
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-md"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] rounded-br-md"></div>
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

