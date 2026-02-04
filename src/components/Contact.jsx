import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-32 bg-[#0F172A] overflow-hidden pt-15 lg:pt-20 pb-15 lg:pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-4 leading-tight">
            Contact
          </h2>
          <motion.div
            className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <p className="text-white/70 text-lg lg:text-xl font-light">
            Let's Build Global Opportunities Together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#1E293B]/70 backdrop-blur-md border border-white/10 rounded-2xl p-5 lg:p-6 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-300">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-white/70 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm bg-[#0F172A]/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-white/70 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm bg-[#0F172A]/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-white/70 mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm bg-[#0F172A]/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-300"
                    placeholder="What is this regarding?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-white/70 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 text-sm bg-[#0F172A]/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-300 resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative px-4 py-2.5 bg-[#D4AF37] text-[#0F172A] font-bold text-xs uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F5A623] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-lg text-[#D4AF37] text-sm text-center"
                  >
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-[#1E293B]/70 backdrop-blur-md border border-white/10 rounded-2xl p-5 lg:p-6 space-y-5 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-300">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Get in Touch</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5 relative z-10">
                For strategic partnerships, investments, or professional collaborations, please feel free to reach out.
              </p>

              <div className="space-y-4 relative z-10">
                {/* Email */}
                <motion.div
                  className="flex items-start gap-3 group/item"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center group-hover/item:bg-[#D4AF37]/30 transition-colors duration-300">
                    <span className="text-lg">✉️</span>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Email</p>
                    <a
                      href="mailto:drshirleyhelen@gmail.com"
                      className="text-white/90 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium break-all"
                    >
                      drshirleyhelen@gmail.com
                    </a>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

                {/* Phone */}
                <motion.div
                  className="flex items-start gap-3 group/item"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center group-hover/item:bg-[#D4AF37]/30 transition-colors duration-300">
                    <span className="text-lg">📞</span>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Phone</p>
                    <a
                      href="tel:+231772772984"
                      className="text-white/90 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium"
                    >
                      +231 772772984
                    </a>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

                {/* Locations */}
                <motion.div
                  className="flex items-start gap-3 group/item"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center group-hover/item:bg-[#D4AF37]/30 transition-colors duration-300">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Locations</p>
                    <p className="text-white/90 text-sm font-medium">
                      India | UAE | Africa
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
