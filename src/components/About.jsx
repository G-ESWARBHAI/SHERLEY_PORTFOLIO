import React from 'react';
import ceoImage from '../assets/ceo_image.png';

const About = () => {
  return (
    <section id="about" className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1E293B] to-[#0F172A] overflow-hidden pt-5 lg:pt-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div className="order-1 lg:order-1 space-y-6">
            {/* Section Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-4 leading-tight">
                About
              </h2>
              <div className="w-20 h-1 bg-[#D4AF37] mb-6"></div>
            </div>

            {/* Main Content */}
            <div className="space-y-5 text-white/90 leading-relaxed">
              <p className="text-base sm:text-lg lg:text-xl font-light">
                Dr. Shirley Helen is a global investment specialist and entrepreneur with over{' '}
                <span className="text-[#D4AF37] font-semibold">17 years</span> of experience in 
                international business, strategic investments, and corporate expansion across{' '}
                <span className="text-[#D4AF37] font-medium">India, the Middle East, Africa, Europe, and the USA</span>.
              </p>

              <p className="text-base sm:text-lg lg:text-xl font-light">
                She is the <span className="text-[#D4AF37] font-semibold">Founder & CEO</span> of the 
                Shirley Noel Group of Companies, leading cross-border initiatives in investments, mining, 
                international trade, and corporate networking. Her expertise lies in connecting global 
                investors, institutions, and entrepreneurs with high-potential emerging markets, driving 
                sustainable and long-term value.
              </p>

              <p className="text-base sm:text-lg lg:text-xl font-light">
                Known for her strategic vision and leadership, Dr. Shirley is also actively involved in 
                mentorship and social impact, supporting women entrepreneurs and building strong business 
                ecosystems worldwide.
              </p>
            </div>

            {/* Highlight Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 rounded-lg p-4 hover:bg-white/10 hover:border-[#D4AF37]/40 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-2">17+</div>
                <div className="text-white/80 text-sm uppercase tracking-wide font-medium">Years Experience</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 rounded-lg p-4 hover:bg-white/10 hover:border-[#D4AF37]/40 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-2">Global</div>
                <div className="text-white/80 text-sm uppercase tracking-wide font-medium">Operations</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 rounded-lg p-4 hover:bg-white/10 hover:border-[#D4AF37]/40 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-2">Founder</div>
                <div className="text-white/80 text-sm uppercase tracking-wide font-medium">& CEO</div>
              </div>
            </div>
          </div>

          {/* Right Side - Image/Visual */}
          <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-2 rounded-xl">
                <img 
                  src={ceoImage} 
                  alt="Dr. Shirley Helen - Global Investment Specialist" 
                  className="w-full h-auto rounded-lg shadow-2xl object-cover"
                />
              </div>
              {/* Decorative Corner Elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] rounded-br-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

