import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import expertiseBg from "../assets/expertige_bg.png";

const expertiseItems = [
  {
    title: "Investment Strategy & Advisory",
    description:
      "Strategic investment planning, capital structuring, and long-term value creation across global markets.",
    icon: "📊",
  },
  {
    title: "Global Business Expansion",
    description:
      "Supporting businesses in scaling operations across international and emerging markets.",
    icon: "🌍",
  },
  {
    title: "Mining, Gold & Diamond Trade",
    description:
      "Experience in mining partnerships, precious commodities, and cross-border trade.",
    icon: "💎",
  },
  {
    title: "International Trade & Exports",
    description:
      "Managing global imports, exports, and international supply chains.",
    icon: "🚢",
  },
  {
    title: "Corporate Networking & Events",
    description:
      "Connecting entrepreneurs, investors, and institutions through high-level global platforms.",
    icon: "🤝",
  },
  {
    title: "Leadership & Business Mentorship",
    description:
      "Mentoring entrepreneurs and professionals, with a focus on women-led initiatives.",
    icon: "👥",
  },
];

const Expertise = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="expertise" className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#0F172A] to-[#020617] overflow-hidden pt-10 lg:pt-12">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={expertiseBg} 
          alt="Expertise Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
        />
        {/* Gradient Overlay to maintain theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/70 to-[#020617]/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start lg:items-center">

        {/* LEFT – Vertical Selector */}
        <div className="space-y-4 sm:space-y-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left mb-6 sm:mb-8"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#D4AF37] mb-3 sm:mb-4 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Expertise
            </motion.h2>
            <motion.div 
              className="w-16 sm:w-20 h-0.5 sm:h-1 bg-[#D4AF37] mx-auto lg:mx-0 mb-4 sm:mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.p 
              className="text-white/70 text-xs sm:text-sm lg:text-base uppercase tracking-widest font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Areas of Professional Focus
            </motion.p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {expertiseItems.map((item, index) => {
              // Mobile variants - slide up from bottom
              const mobileButtonVariants = {
                hidden: {
                  opacity: 0,
                  y: 30,
                  x: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              };

              // Desktop variants - slide from left
              const desktopButtonVariants = {
                hidden: {
                  opacity: 0,
                  x: -30,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                },
              };

              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  variants={mobileButtonVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 5,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border transition-all duration-300 text-left touch-manipulation
                  ${
                    activeIndex === index
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/20"
                      : "border-white/10 hover:border-[#D4AF37]/40 active:border-[#D4AF37]/40"
                  }`}
                >
                  <motion.span 
                    className="text-2xl sm:text-3xl flex-shrink-0"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-white leading-tight">
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* RIGHT – Spotlight Card */}
        <div className="relative w-full mt-8 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ 
                opacity: 0, 
                y: 50,
                scale: 0.95,
                x: 30,
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                x: 0,
              }}
              exit={{ 
                opacity: 0, 
                y: -30,
                scale: 0.95,
                x: -30,
              }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative bg-[#020617] border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-[#D4AF37]/20"
            >
              <motion.div 
                className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {expertiseItems[activeIndex].icon}
              </motion.div>

              <motion.h3 
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {expertiseItems[activeIndex].title}
              </motion.h3>

              <motion.p 
                className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {expertiseItems[activeIndex].description}
              </motion.p>

              {/* Gold Glow */}
              <motion.div 
                className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-40 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Expertise;
