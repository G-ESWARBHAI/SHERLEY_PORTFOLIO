import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import placeholder image - Replace these imports with actual gallery images
import ceoImage from '../assets/ceo_image.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Gallery images - Replace these with actual images from assets
  // To add new images: 1) Import them at the top, 2) Add them to this array
  const galleryImages = [
    {
      id: 1,
      src: ceoImage, // Replace with: import gallery1 from '../assets/gallery1.jpg';
      title: 'Professional Event',
      category: 'Business',
    },
    {
      id: 2,
      src: ceoImage, // Replace with: import gallery2 from '../assets/gallery2.jpg';
      title: 'Global Conference',
      category: 'Networking',
    },
    {
      id: 3,
      src: ceoImage, // Replace with: import gallery3 from '../assets/gallery3.jpg';
      title: 'Award Ceremony',
      category: 'Recognition',
    },
    {
      id: 4,
      src: ceoImage, // Replace with: import gallery4 from '../assets/gallery4.jpg';
      title: 'Corporate Meeting',
      category: 'Business',
    },
    {
      id: 5,
      src: ceoImage, // Replace with: import gallery5 from '../assets/gallery5.jpg';
      title: 'International Summit',
      category: 'Networking',
    },
    {
      id: 6,
      src: ceoImage, // Replace with: import gallery6 from '../assets/gallery6.jpg';
      title: 'Leadership Forum',
      category: 'Business',
    },
    {
      id: 7,
      src: ceoImage, // Replace with: import gallery7 from '../assets/gallery7.jpg';
      title: 'Investment Conference',
      category: 'Business',
    },
    {
      id: 8,
      src: ceoImage, // Replace with: import gallery8 from '../assets/gallery8.jpg';
      title: 'Global Partnership',
      category: 'Networking',
    },
    {
      id: 9,
      src: ceoImage, // Replace with: import gallery9 from '../assets/gallery9.jpg';
      title: 'Entrepreneurship Event',
      category: 'Business',
    },
  ];

  const [filter, setFilter] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

  // Filter images
  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="gallery" className="relative pt-12 pb-20 lg:pt-16 lg:pb-32 bg-gradient-to-b from-[#1E293B] to-[#0F172A] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden ">
        <div className="absolute top-10 right-20 w-64 h-64 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-4 leading-tight">
            Gallery
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-white/70 text-lg lg:text-xl font-light max-w-3xl mx-auto">
            Moments of Excellence, Leadership, and Global Impact
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                filter === category
                  ? 'bg-[#D4AF37] text-[#0A1929] shadow-lg shadow-[#D4AF37]/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${filter}-${image.id}-${index}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0F172A]">
                <img
                  src={typeof image.src === 'string' ? image.src : image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/90 via-[#0A1929]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-[#D4AF37] text-sm uppercase tracking-wide">{image.category}</p>
                </div>

                {/* Gold Border on Hover */}
                <div className="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition-all duration-300 rounded-xl"></div>

                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/70 transition-all duration-300 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/70 transition-all duration-300 rounded-bl-lg"></div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0A1929]/95 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#D4AF37] transition-colors duration-300 z-10"
                aria-label="Close lightbox"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A1929]/95 to-transparent p-6">
                  <h3 className="text-white font-bold text-2xl mb-2">{selectedImage.title}</h3>
                  <p className="text-[#D4AF37] text-sm uppercase tracking-wide">{selectedImage.category}</p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
                  setSelectedImage(filteredImages[prevIndex]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 text-white p-3 rounded-full transition-all duration-300"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                  const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
                  setSelectedImage(filteredImages[nextIndex]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 text-white p-3 rounded-full transition-all duration-300"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

