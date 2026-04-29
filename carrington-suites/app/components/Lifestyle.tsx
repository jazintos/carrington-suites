"use client";

import { motion } from "framer-motion";

export default function Lifestyle() {
  return (
    <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center px-6 md:px-12 py-16 md:py-24">

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >

        <h2 className="text-2xl md:text-4xl font-light mb-6 leading-snug">
          Located on a Diplomatic Street in the Heart of Victoria Island
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
          Positioned within one of Lagos’ most secure and discreet neighbourhoods, 
          The Carrington Suites offers immediate access to key business districts, 
          fine dining, and curated lifestyle destinations, while maintaining a 
          quiet sense of privacy and calm.
        </p>

      </motion.div>

      {/* Image */}
      <motion.img
        src="/balcony-1.png"
        className="w-full h-[300px] sm:h-[360px] md:h-[420px] object-cover rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

    </section>
  );
}