import React from 'react';
import { motion } from 'framer-motion';
import bgAwards from '../assets/bd_awards.png';

const Recognition = () => {
  const awards = [
    {
      year: '1995',
      title: 'Miss St. Pious Girls',
      category: 'Beauty & Excellence',
      icon: '👑',
    },
    {
      year: '1996',
      title: 'Miss Beautiful Smile',
      category: 'Beauty & Excellence',
      icon: '✨',
    },
    {
      year: '1997',
      title: 'Miss All Rounder',
      category: 'Excellence',
      icon: '🌟',
    },
    {
      year: '1998',
      title: 'Miss St. Pious Women\'s',
      category: 'Women\'s Excellence',
      icon: '💫',
    },
    {
      year: '2000',
      title: 'Best Employee Award',
      category: 'Professional Excellence',
      icon: '🏆',
    },
    {
      year: '2007',
      title: 'Best Mentor',
      organization: 'Andhra Mahila Saba',
      category: 'Mentorship',
      icon: '🎓',
    },
    {
      year: '2018',
      title: 'Best Contribution for the Society',
      organization: 'Kerala Floods',
      category: 'Social Impact',
      icon: '🤝',
    },
    {
      year: '2023',
      title: 'Best Creative Entrepreneur of the Year',
      location: 'Dubai',
      category: 'Entrepreneurship',
      icon: '💼',
    },
    {
      year: '2023',
      title: 'Best Women Business Tycoon Award',
      location: 'Dubai',
      category: 'Business Leadership',
      icon: '👑',
    },
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Card animation - optimized for mobile
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  // Mobile-optimized hover variants
  const hoverVariants = {
    rest: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.03 },
    tap: { scale: 0.98 } // Mobile tap feedback
  };

  return (
    <section id="recognition" className="relative py-20 lg:py-32 bg-[#1E293B] overflow-hidden -mt-5 pt-15 lg:pt-20">
      {/* Background Image with Low Opacity */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={bgAwards} 
          alt="Awards background" 
          className="absolute inset-0 w-full h-full object-cover opacity-[0.25]"
        />
        {/* Overlay to maintain theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/75 via-[#1E293B]/65 to-[#1E293B]/75"></div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-4 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Recognition
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>
          <motion.p 
            className="text-white/70 text-lg lg:text-xl max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Awards and Accolades Celebrating Excellence
          </motion.p>
        </motion.div>

        {/* Awards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              whileHover="hover"
              whileTap="tap"
              className="group relative touch-manipulation"
            >
              <motion.div 
                className="relative bg-[#0F172A] border border-white/12 rounded-xl sm:rounded-2xl p-4 sm:p-6 pt-6 sm:pt-8 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 h-full overflow-hidden"
                variants={hoverVariants}
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Year Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
                  <motion.div
                    className="bg-[#D4AF37] text-[#0F172A] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {award.year}
                  </motion.div>
                </div>

                {/* Icon */}
                <motion.div
                  className="mt-2 mb-3 sm:mb-4 text-4xl sm:text-5xl lg:text-6xl relative z-10"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {award.icon}
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#D4AF37] transition-colors duration-300 relative z-10"
                  whileHover={{ x: 2 }}
                >
                  {award.title}
                </motion.h3>

                {/* Organization/Location */}
                {(award.organization || award.location) && (
                  <motion.p 
                    className="text-[#D4AF37] font-semibold text-xs sm:text-sm mb-2 sm:mb-3 relative z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {award.organization || award.location}
                  </motion.p>
                )}

                {/* Category */}
                <motion.p 
                  className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider font-medium relative z-10"
                  whileHover={{ opacity: 0.8 }}
                >
                  {award.category}
                </motion.p>

                {/* Decorative Corner Accents */}
                <div className="absolute top-4 left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#D4AF37]/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Recognition;
