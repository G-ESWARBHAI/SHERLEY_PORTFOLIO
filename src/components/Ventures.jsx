import React from "react";
import { motion } from "framer-motion";
import bgVentures from "../assets/bg_ventures.jpg";

const ventures = [
  {
    company: "Shirley Noel Group of Companies",
    role: "Founder & CEO",
    type: "Investment & Mining Group",
    location: "Liberia | Global",
    date: "2024 – Present",
    description:
      "Leading global investments and mining initiatives across emerging markets with a focus on sustainable growth.",
    icon: "🏢",
  },
  {
    company: "SN Enterprises",
    role: "Chairman",
    type: "Imports & Exports",
    location: "India",
    date: "2021 – Present",
    description:
      "Managing international trade operations and strategic import–export partnerships.",
    icon: "💼",
  },
  {
    company: "Esperanza Corporate Events",
    role: "Director",
    type: "Corporate & Global Networking Events",
    location: "India",
    date: "2018 – Present",
    description:
      "Organizing high-level corporate events and global business networking platforms.",
    icon: "🌐",
  },
  {
    company: "KIKI Kreation",
    role: "Partner / Pioneer",
    type: "Cosmetics Supply & Distribution",
    location: "Dubai",
    date: "2021 – Present",
    description:
      "International cosmetics sourcing and cross-border distribution between UAE and India.",
    icon: "💎",
  },
  {
    company: "Supreme Royale",
    role: "Partner",
    type: "Granite & Marble",
    location: "Dubai",
    date: "2021 – Present",
    description:
      "Strategic partnership in natural stone trading and infrastructure materials.",
    icon: "🏛️",
  },
  {
    company: "Varam Exports",
    role: "Investor",
    type: "Gold & Diamonds",
    location: "Tanzania",
    date: "2023 – Present",
    description:
      "Investment in precious metals and gemstone trading across African markets.",
    icon: "💍",
  },
];

const Ventures = () => {
  return (
    <section
      id="ventures"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0F172A] to-[#020617] overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={bgVentures}
        alt="Global Ventures"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Gradient Overlay (keeps background visible) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/60 to-[#020617]/90" />

      {/* Decorative Background Glow Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-[#D4AF37] opacity-8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#D4AF37] opacity-6 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-[#D4AF37] mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ventures
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.p
            className="text-white/70 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            A strategic journey across global enterprises, investments, and
            leadership initiatives
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Animated */}
          <motion.div
            className="absolute left-1/2 top-0 h-full w-[2px] bg-[#D4AF37]/40 -translate-x-1/2 hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {ventures.map((venture, index) => {
            const isEven = index % 2 === 0;
            const cardVariants = {
              hidden: {
                opacity: 0,
                x: isEven ? -100 : 100,
                y: 50,
              },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                },
              },
            };

            const dotVariants = {
              hidden: { scale: 0, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.4,
                  delay: index * 0.15 + 0.3,
                  type: "spring",
                  stiffness: 200,
                },
              },
            };

            return (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row items-center mb-20 ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Card */}
                <motion.div
                  className="w-full md:w-1/2 px-4"
                  variants={cardVariants}
                >
                  <motion.div
                    className="bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group"
                    whileHover={{
                      scale: 1.03,
                      borderColor: "rgba(212, 175, 55, 0.4)",
                      boxShadow: "0 25px 60px rgba(212, 175, 55, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl"
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon & Date */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <motion.span
                        className="text-4xl"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -10, 10, -10, 0],
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {venture.icon}
                      </motion.span>
                      <motion.span
                        className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {venture.date}
                      </motion.span>
                    </div>

                    {/* Company */}
                    <motion.h3
                      className="text-2xl font-bold text-white mb-1 relative z-10"
                      whileHover={{ color: "#D4AF37" }}
                      transition={{ duration: 0.3 }}
                    >
                      {venture.company}
                    </motion.h3>

                    {/* Role */}
                    <p className="text-[#D4AF37] font-semibold text-sm uppercase mb-2 relative z-10">
                      {venture.role}
                    </p>

                    {/* Type */}
                    <p className="text-white/80 text-sm mb-4 relative z-10">
                      {venture.type}
                    </p>

                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed relative z-10">
                      {venture.description}
                    </p>

                    {/* Location */}
                    <motion.p
                      className="mt-4 text-white/50 text-xs relative z-10"
                      whileHover={{ color: "rgba(255, 255, 255, 0.7)" }}
                      transition={{ duration: 0.2 }}
                    >
                      📍 {venture.location}
                    </motion.p>

                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </motion.div>

                {/* Timeline Dot - Animated */}
                <motion.div
                  className="absolute md:left-1/2 md:-translate-x-1/2 w-5 h-5 bg-[#D4AF37] rounded-full shadow-[0_0_25px_#D4AF37] hidden md:block z-20"
                  variants={dotVariants}
                  whileHover={{
                    scale: 1.3,
                    boxShadow: "0 0 40px rgba(212, 175, 55, 0.8)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ventures;
